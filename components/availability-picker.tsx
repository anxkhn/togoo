"use client";

import { useState } from "react";
import { fromZonedTime } from "date-fns-tz";
import { cn } from "@/lib/utils";

export interface TimeWindow {
  id: string;
  start_time: number;
  end_time: number;
}

interface AvailabilityPickerProps {
  windows: TimeWindow[];
  onChange: (windows: TimeWindow[]) => void;
  dateRangeStart: number;
  dateRangeEnd: number;
  timezone: string;
  allowedHoursStart?: number;
  allowedHoursEnd?: number;
  meetingDurationMinutes?: number;
}

// ─── timezone helpers ────────────────────────────────────────────────────────

function toUnix(dateStr: string, h: number, m: number, tz: string): number {
  const iso = `${dateStr}T${pad(h)}:${pad(m)}:00`;
  return Math.floor(fromZonedTime(iso, tz).getTime() / 1000);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function fmtTime(unix: number, tz: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: tz,
  }).format(new Date(unix * 1000));
}

function fmtHour(h: number) {
  if (h === 0 || h === 24) return "12 AM";
  if (h < 12) return `${h} AM`;
  if (h === 12) return "12 PM";
  return `${h - 12} PM`;
}

function getDates(startUnix: number, endUnix: number, tz: string): string[] {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const addDay = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const next = new Date(Date.UTC(year, month - 1, day + 1));
    return next.toISOString().slice(0, 10);
  };

  const startDate = fmt.format(new Date(startUnix * 1000));
  const endDate = fmt.format(new Date(endUnix * 1000));
  const dates: string[] = [];

  for (let cursor = startDate; cursor <= endDate; cursor = addDay(cursor)) {
    dates.push(cursor);
    if (dates.length > 60) break;
  }

  return dates;
}

function fmtDayLabel(dateStr: string, tz: string) {
  const noon = fromZonedTime(`${dateStr}T12:00:00`, tz);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: tz,
  }).format(noon);
}

function getDayOfWeek(dateStr: string, tz: string): number {
  const noon = fromZonedTime(`${dateStr}T12:00:00`, tz);
  return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: tz })
    .format(noon)
    .slice(0, 3) === "Sat" || new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: tz }).format(noon).slice(0, 3) === "Sun"
    ? 1
    : 0;
}

// ─── block helpers ───────────────────────────────────────────────────────────

interface Block {
  key: string;
  label: string;
  sh: number;
  eh: number;
}

function getBlocks(aS: number, aE: number): Block[] {
  const b: Block[] = [];
  const mE = Math.min(12, aE);
  if (mE > aS) b.push({ key: "morning", label: "Morning", sh: aS, eh: mE });
  const pS = Math.max(12, aS);
  const pE = Math.min(17, aE);
  if (pE > pS) b.push({ key: "afternoon", label: "Afternoon", sh: pS, eh: pE });
  const eS = Math.max(17, aS);
  if (aE > eS) b.push({ key: "evening", label: "Evening", sh: eS, eh: aE });
  return b;
}

function isExactBlock(w: TimeWindow, blocks: Block[], dateStr: string, tz: string) {
  return blocks.some(
    (b) => w.start_time === toUnix(dateStr, b.sh, 0, tz) && w.end_time === toUnix(dateStr, b.eh, 0, tz)
  );
}

function isBlockSelected(windows: TimeWindow[], s: number, e: number) {
  return windows.some((w) => w.start_time === s && w.end_time === e);
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── custom draft state ──────────────────────────────────────────────────────

interface Draft {
  startH: number;
  startM: number;
  durMins: number | "custom";
  endH: number;
  endM: number;
}

function defaultDraft(aS: number, durMins: number, aE: number): Draft {
  const endTotalMins = Math.min(aS * 60 + durMins, aE * 60);
  return {
    startH: aS,
    startM: 0,
    durMins,
    endH: Math.floor(endTotalMins / 60),
    endM: endTotalMins % 60,
  };
}

// ─── sub-components ──────────────────────────────────────────────────────────

function BlockPill({
  block,
  selected,
  onClick,
}: {
  block: Block;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "pill-toggle",
        selected
          ? "bg-accent text-white shadow-[0_10px_24px_rgba(47,104,68,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
          : "bg-surface text-text hover:border-accent/50 hover:bg-accent-subtle/30"
      )}
    >
      {selected && (
        <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )}
      <span>{block.label}</span>
      <span className={cn("tabular-nums text-[10px]", selected ? "text-white/70" : "text-muted")}>
        {fmtHour(block.sh)}–{fmtHour(block.eh)}
      </span>
    </button>
  );
}

function WindowChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex min-h-10 items-center gap-1 rounded-full bg-accent-subtle pl-3 pr-1.5 text-xs font-medium text-accent shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]">
      <span className="tabular-nums">{label}</span>
        <button
          type="button"
          onClick={onRemove}
          className="-my-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-accent/70 transition-[color,background-color] duration-150 ease hover:bg-white/70 hover:text-danger active:scale-[0.97]"
          aria-label="Remove"
        >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

export function AvailabilityPicker({
  windows,
  onChange,
  dateRangeStart,
  dateRangeEnd,
  timezone: tz,
  allowedHoursStart = 9,
  allowedHoursEnd = 22,
  meetingDurationMinutes = 60,
}: AvailabilityPickerProps) {
  const dates = getDates(dateRangeStart, dateRangeEnd, tz);
  const blocks = getBlocks(allowedHoursStart, allowedHoursEnd);

  const [openDay, setOpenDay] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});

  // ── block toggling ──────────────────────────────────────────────────────

  function toggleBlock(dateStr: string, block: Block) {
    const s = toUnix(dateStr, block.sh, 0, tz);
    const e = toUnix(dateStr, block.eh, 0, tz);
    if (isBlockSelected(windows, s, e)) {
      onChange(windows.filter((w) => !(w.start_time === s && w.end_time === e)));
    } else {
      onChange([...windows, { id: uid(), start_time: s, end_time: e }]);
    }
  }

  function selectAll() {
    const toAdd: TimeWindow[] = [];
    for (const dateStr of dates) {
      for (const block of blocks) {
        const s = toUnix(dateStr, block.sh, 0, tz);
        const e = toUnix(dateStr, block.eh, 0, tz);
        if (!isBlockSelected(windows, s, e) && !toAdd.some((w) => w.start_time === s && w.end_time === e)) {
          toAdd.push({ id: uid(), start_time: s, end_time: e });
        }
      }
    }
    onChange([...windows, ...toAdd]);
  }

  // ── custom draft helpers ────────────────────────────────────────────────

  function openCustom(dateStr: string) {
    if (openDay === dateStr) {
      setOpenDay(null);
      return;
    }
    setOpenDay(dateStr);
    if (!drafts[dateStr]) {
      setDrafts((p) => ({ ...p, [dateStr]: defaultDraft(allowedHoursStart, meetingDurationMinutes, allowedHoursEnd) }));
    }
  }

  function updateDraft(dateStr: string, patch: Partial<Draft>) {
    setDrafts((p) => ({ ...p, [dateStr]: { ...p[dateStr], ...patch } }));
  }

  function getStartOptions(dateStr: string) {
    const opts: { label: string; h: number; m: number }[] = [];
    for (let totalM = allowedHoursStart * 60; totalM < allowedHoursEnd * 60 - 29; totalM += 30) {
      const h = Math.floor(totalM / 60);
      const m = totalM % 60;
      opts.push({ label: fmtTime(toUnix(dateStr, h, m, tz), tz), h, m });
    }
    return opts;
  }

  function getDurationOptions(startH: number, startM: number): number[] {
    const maxMins = allowedHoursEnd * 60 - (startH * 60 + startM);
    return [30, 60, 90, 120, 180, 240, 360].filter((d) => d <= maxMins);
  }

  function getEndOptions(dateStr: string, startH: number, startM: number) {
    const opts: { label: string; h: number; m: number }[] = [];
    for (let totalM = startH * 60 + startM + 30; totalM <= allowedHoursEnd * 60; totalM += 30) {
      const h = Math.floor(totalM / 60);
      const m = totalM % 60;
      opts.push({ label: fmtTime(toUnix(dateStr, h, m, tz), tz), h, m });
    }
    return opts;
  }

  function computeEnd(draft: Draft): { h: number; m: number } | null {
    if (draft.durMins === "custom") return { h: draft.endH, m: draft.endM };
    const totalM = draft.startH * 60 + draft.startM + draft.durMins;
    if (totalM > allowedHoursEnd * 60) return null;
    return { h: Math.floor(totalM / 60), m: totalM % 60 };
  }

  function addCustomWindow(dateStr: string) {
    const draft = drafts[dateStr];
    if (!draft) return;
    const end = computeEnd(draft);
    if (!end) return;
    const s = toUnix(dateStr, draft.startH, draft.startM, tz);
    const e = toUnix(dateStr, end.h, end.m, tz);
    if (e <= s) return;
    onChange([...windows, { id: uid(), start_time: s, end_time: e }]);
    setOpenDay(null);
  }

  const durLabels: Record<number, string> = {
    30: "30 min",
    60: "1 hr",
    90: "1.5 hr",
    120: "2 hr",
    180: "3 hr",
    240: "4 hr",
    360: "6 hr",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted">
          Shown in <span className="font-medium text-text">{tz}</span>
        </p>
        <div className="flex items-center gap-3">
          {windows.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="inline-flex min-h-10 items-center text-xs text-muted transition-[color] duration-150 hover:text-danger"
            >
              Clear selection
            </button>
          )}
          <button
            type="button"
            onClick={selectAll}
            className="inline-flex min-h-10 items-center text-xs font-medium text-accent transition-[color] duration-150 hover:text-accent-hover"
          >
            Select all time blocks
          </button>
        </div>
      </div>

      {/* Date rows */}
      <div className="space-y-0">
        {dates.map((dateStr) => {
          const dateFmt = new Intl.DateTimeFormat("en-CA", {
            timeZone: tz,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          const dayWindows = windows.filter(
            (w) => dateFmt.format(new Date(w.start_time * 1000)) === dateStr
          );
          const customWindows = dayWindows.filter(
            (w) => !isExactBlock(w, blocks, dateStr, tz)
          );
          const isOpen = openDay === dateStr;
          const draft = drafts[dateStr];
          const durOpts = draft ? getDurationOptions(draft.startH, draft.startM) : [];
          const endOpts = draft ? getEndOptions(dateStr, draft.startH, draft.startM) : [];
          const computedEnd = draft ? computeEnd(draft) : null;

          return (
            <div key={dateStr} className="border-b border-border last:border-0 py-3">
              {/* Row: label + blocks + custom button */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="w-24 flex-shrink-0 text-sm font-medium text-text">
                  {fmtDayLabel(dateStr, tz)}
                </span>

                <div className="flex flex-wrap gap-1.5 flex-1">
                  {blocks.map((block) => {
                    const s = toUnix(dateStr, block.sh, 0, tz);
                    const e = toUnix(dateStr, block.eh, 0, tz);
                    return (
                      <BlockPill
                        key={block.key}
                        block={block}
                        selected={isBlockSelected(windows, s, e)}
                        onClick={() => toggleBlock(dateStr, block)}
                      />
                    );
                  })}

                    <button
                      type="button"
                      onClick={() => openCustom(dateStr)}
                      className={cn(
                        "pill-toggle px-3",
                        isOpen
                          ? "bg-surface-alt text-text shadow-[inset_0_0_0_1px_rgba(26,23,20,0.12)]"
                          : "bg-surface text-muted hover:border-border-strong hover:text-text"
                      )}
                    >
                      <svg
                        className={cn("h-3 w-3 transition-transform duration-[160ms] [transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)]", isOpen && "rotate-45")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add a custom time
                  </button>
                </div>
              </div>

              {/* Custom time expander */}
              {isOpen && draft && (
                <div className="mt-2 ml-0 space-y-3 rounded-[18px] bg-surface-alt p-3 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)] sm:ml-[108px]">
                  {/* Start time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted block mb-1">Start time</label>
                      <select
                        className="input text-sm"
                        value={`${draft.startH}:${draft.startM}`}
                        onChange={(e) => {
                          const [h, m] = e.target.value.split(":").map(Number);
                          const newDurOpts = getDurationOptions(h, m);
                          const newDur =
                            draft.durMins !== "custom" && newDurOpts.includes(draft.durMins)
                              ? draft.durMins
                              : newDurOpts[0] ?? meetingDurationMinutes;
                          updateDraft(dateStr, { startH: h, startM: m, durMins: newDur });
                        }}
                      >
                        {getStartOptions(dateStr).map((o) => (
                          <option key={`${o.h}:${o.m}`} value={`${o.h}:${o.m}`}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Duration buttons */}
                    <div>
                      <label className="text-xs font-medium text-muted block mb-1">Length</label>
                      <div className="flex flex-wrap gap-1">
                        {durOpts.map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => updateDraft(dateStr, { durMins: d })}
                            className={cn(
                              "pill-toggle rounded-input px-2.5 py-1",
                              draft.durMins === d
                                ? "bg-accent text-white shadow-[0_8px_20px_rgba(47,104,68,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                                : "bg-surface text-text hover:border-accent/40"
                            )}
                          >
                            {durLabels[d] ?? `${d}m`}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const end = computeEnd(draft);
                            updateDraft(dateStr, {
                              durMins: "custom",
                              endH: end?.h ?? allowedHoursEnd,
                              endM: end?.m ?? 0,
                            });
                          }}
                          className={cn(
                            "pill-toggle rounded-input px-2.5 py-1",
                            draft.durMins === "custom"
                              ? "bg-accent text-white shadow-[0_8px_20px_rgba(47,104,68,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                              : "bg-surface text-text hover:border-accent/40"
                          )}
                        >
                          Choose end time
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Custom end time */}
                  {draft.durMins === "custom" && (
                    <div>
                      <label className="text-xs font-medium text-muted block mb-1">End time</label>
                      <select
                        className="input text-sm"
                        value={`${draft.endH}:${draft.endM}`}
                        onChange={(e) => {
                          const [h, m] = e.target.value.split(":").map(Number);
                          updateDraft(dateStr, { endH: h, endM: m });
                        }}
                      >
                        {endOpts.map((o) => (
                          <option key={`${o.h}:${o.m}`} value={`${o.h}:${o.m}`}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Preview + actions */}
                  <div className="flex items-center justify-between">
                    <span className="tabular-nums text-xs text-muted">
                        {computedEnd
                          ? `${fmtTime(toUnix(dateStr, draft.startH, draft.startM, tz), tz)} – ${fmtTime(toUnix(dateStr, computedEnd.h, computedEnd.m, tz), tz)}`
                          : "Choose a length"}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setOpenDay(null)}
                        className="inline-flex min-h-10 items-center text-xs text-muted transition-[color] duration-150 hover:text-text"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => addCustomWindow(dateStr)}
                        disabled={!computedEnd}
                        className="btn-primary text-xs px-3 py-1 disabled:opacity-40"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom window chips */}
              {customWindows.length > 0 && (
                <div className="mt-2 ml-0 sm:ml-[108px] flex flex-wrap gap-1.5">
                  {customWindows.map((w) => (
                    <WindowChip
                      key={w.id}
                      label={`${fmtTime(w.start_time, tz)} – ${fmtTime(w.end_time, tz)}`}
                      onRemove={() => onChange(windows.filter((x) => x.id !== w.id))}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {windows.length === 0 && (
        <p className="text-center py-6 text-muted text-sm mt-2">
          Choose the times when you could make it.
        </p>
      )}

      {windows.length > 0 && (
        <p className="mt-3 text-center text-xs text-muted tabular-nums">
          {windows.length} window{windows.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
