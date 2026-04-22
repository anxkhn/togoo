"use client";

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
  meetingDurationMinutes?: number;
  slotGranularityMinutes?: number;
  suggestedWindow?: { start_time: number; end_time: number } | null;
}

interface SlotOption {
  id: string;
  start_time: number;
  end_time: number;
}

function toUnix(dateStr: string, h: number, m: number, tz: string): number {
  const iso = `${dateStr}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
  return Math.floor(fromZonedTime(iso, tz).getTime() / 1000);
}

function formatTime(unix: number, tz: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: tz,
  }).format(new Date(unix * 1000));
}

function formatDateKey(unix: number, tz: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(unix * 1000));
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

function formatDayLabel(dateStr: string, tz: string): string {
  const noon = fromZonedTime(`${dateStr}T12:00:00`, tz);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: tz,
  }).format(noon);
}

function buildSlotOptions(
  dateStr: string,
  tz: string,
  dateRangeStart: number,
  dateRangeEnd: number,
  meetingDurationMinutes: number,
  slotGranularityMinutes: number
): SlotOption[] {
  const options: SlotOption[] = [];
  const dayStart = toUnix(dateStr, 0, 0, tz);
  const dayEnd = dayStart + 24 * 60 * 60;
  const earliestStart = Math.max(dayStart, dateRangeStart);
  const latestStart = Math.min(dayEnd, dateRangeEnd + 1) - meetingDurationMinutes * 60;
  const stepSeconds = slotGranularityMinutes * 60;

  let current = Math.ceil(earliestStart / stepSeconds) * stepSeconds;
  while (current <= latestStart) {
    const start_time = current;
    const end_time = current + meetingDurationMinutes * 60;
    if (start_time >= dateRangeStart && end_time <= dateRangeEnd + 1) {
      options.push({
        id: `${start_time}-${end_time}`,
        start_time,
        end_time,
      });
    }
    current += stepSeconds;
  }

  return options;
}

function normalizeWindows(
  windows: TimeWindow[],
  meetingDurationMinutes: number,
  slotGranularityMinutes: number
): TimeWindow[] {
  const normalized = new Map<string, TimeWindow>();
  const meetingDurationSeconds = meetingDurationMinutes * 60;
  const stepSeconds = slotGranularityMinutes * 60;

  for (const window of windows) {
    let start = Math.ceil(window.start_time / stepSeconds) * stepSeconds;
    while (start + meetingDurationSeconds <= window.end_time) {
      const key = `${start}-${start + meetingDurationSeconds}`;
      if (!normalized.has(key)) {
        normalized.set(key, {
          id: key,
          start_time: start,
          end_time: start + meetingDurationSeconds,
        });
      }
      start += stepSeconds;
    }
  }

  return [...normalized.values()].sort((a, b) => a.start_time - b.start_time);
}

function isSelected(windows: TimeWindow[], slot: SlotOption): boolean {
  return windows.some((window) => window.start_time === slot.start_time && window.end_time === slot.end_time);
}

export function AvailabilityPicker({
  windows,
  onChange,
  dateRangeStart,
  dateRangeEnd,
  timezone,
  meetingDurationMinutes = 60,
  slotGranularityMinutes = 30,
  suggestedWindow = null,
}: AvailabilityPickerProps) {
  const dates = getDates(dateRangeStart, dateRangeEnd, timezone);
  const selectedWindows = normalizeWindows(windows, meetingDurationMinutes, slotGranularityMinutes);

  function updateSlots(nextSlots: TimeWindow[]) {
    onChange(nextSlots);
  }

  function toggleSlot(slot: SlotOption) {
    if (isSelected(selectedWindows, slot)) {
      updateSlots(selectedWindows.filter((window) => !(window.start_time === slot.start_time && window.end_time === slot.end_time)));
      return;
    }

    updateSlots([
      ...selectedWindows,
      {
        id: slot.id,
        start_time: slot.start_time,
        end_time: slot.end_time,
      },
    ]);
  }

  function clearDay(dateStr: string) {
    updateSlots(selectedWindows.filter((window) => formatDateKey(window.start_time, timezone) !== dateStr));
  }

  function selectAll() {
    const allSlots = new Map<string, TimeWindow>(selectedWindows.map((window) => [`${window.start_time}-${window.end_time}`, window]));

    for (const dateStr of dates) {
      for (const slot of buildSlotOptions(
        dateStr,
        timezone,
        dateRangeStart,
        dateRangeEnd,
        meetingDurationMinutes,
        slotGranularityMinutes
      )) {
        allSlots.set(slot.id, {
          id: slot.id,
          start_time: slot.start_time,
          end_time: slot.end_time,
        });
      }
    }

    updateSlots([...allSlots.values()].sort((a, b) => a.start_time - b.start_time));
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs text-muted">
          Shown in <span className="font-medium text-text">{timezone}</span>
        </p>
        <div className="flex items-center gap-3">
          {selectedWindows.length > 0 && (
            <button
              type="button"
              onClick={() => updateSlots([])}
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
            Select every slot
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {dates.map((dateStr) => {
          const slotOptions = buildSlotOptions(
            dateStr,
            timezone,
            dateRangeStart,
            dateRangeEnd,
            meetingDurationMinutes,
            slotGranularityMinutes
          );
          const selectedForDay = selectedWindows.filter(
            (window) => formatDateKey(window.start_time, timezone) === dateStr
          );

          return (
            <div key={dateStr} className="rounded-[22px] border border-border bg-surface p-4 shadow-card-soft">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-text">{formatDayLabel(dateStr, timezone)}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {meetingDurationMinutes} min slots, every {slotGranularityMinutes} min
                  </p>
                </div>
                {selectedForDay.length > 0 && (
                  <button
                    type="button"
                    onClick={() => clearDay(dateStr)}
                    className="inline-flex min-h-10 items-center rounded-full px-3 text-xs text-muted shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)] transition-[color,background-color] duration-150 hover:bg-surface-alt hover:text-text"
                  >
                    Clear day
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {slotOptions.map((slot) => {
                  const selected = isSelected(selectedWindows, slot);
                  const isSuggested =
                    suggestedWindow?.start_time === slot.start_time &&
                    suggestedWindow?.end_time === slot.end_time;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => toggleSlot(slot)}
                      className={cn(
                        "inline-flex min-h-10 items-center rounded-full px-3 text-sm tabular-nums transition-[color,background-color,border-color,box-shadow] duration-150 active:scale-[0.96]",
                        selected
                          ? "bg-accent text-white shadow-[0_10px_24px_rgba(47,104,68,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                          : "bg-bg text-text shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)] hover:bg-accent-subtle/30 hover:shadow-[inset_0_0_0_1px_rgba(47,104,68,0.22)]"
                      )}
                      >
                      <span>{formatTime(slot.start_time, timezone)} - {formatTime(slot.end_time, timezone)}</span>
                      {isSuggested && (
                        <span
                          className={cn(
                            "ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                            selected ? "bg-white/18 text-white" : "bg-accent-subtle text-accent"
                          )}
                        >
                          Suggested
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selectedWindows.length === 0 && (
        <p className="mt-4 py-4 text-center text-sm text-muted">Pick the exact meeting slots that could work for you.</p>
      )}

      {selectedWindows.length > 0 && (
        <p className="mt-4 text-center text-xs text-muted tabular-nums">
          {selectedWindows.length} slot{selectedWindows.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
