"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
}

function toLocalDatetimeValue(unixTs: number, timezone: string): string {
  const date = new Date(unixTs * 1000);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  });
  const parts = formatter.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

function fromLocalDatetimeValue(value: string, timezone: string): number {
  const [datePart, timePart] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "short",
  });
  const date = new Date(year, month - 1, day, hour, minute);
  const tzOffset = getTimezoneOffsetMinutes(date, timezone);
  return Math.floor(date.getTime() / 1000) - tzOffset * 60;
}

function getTimezoneOffsetMinutes(date: Date, timezone: string): number {
  const utcFormatter = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", hour: "numeric", minute: "numeric", hour12: false });
  const tzFormatter = new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "numeric", minute: "numeric", hour12: false });

  const utcParts = utcFormatter.formatToParts(date);
  const tzParts = tzFormatter.formatToParts(date);

  const utcH = parseInt(utcParts.find((p) => p.type === "hour")?.value ?? "0");
  const utcM = parseInt(utcParts.find((p) => p.type === "minute")?.value ?? "0");
  const tzH = parseInt(tzParts.find((p) => p.type === "hour")?.value ?? "0");
  const tzM = parseInt(tzParts.find((p) => p.type === "minute")?.value ?? "0");

  return (tzH * 60 + tzM) - (utcH * 60 + utcM);
}

function formatWindowDisplay(window: TimeWindow, timezone: string): string {
  const start = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(window.start_time * 1000));

  const end = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(window.end_time * 1000));

  return `${start} – ${end}`;
}

export function AvailabilityPicker({
  windows,
  onChange,
  dateRangeStart,
  dateRangeEnd,
  timezone,
}: AvailabilityPickerProps) {
  const [draft, setDraft] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [error, setError] = useState("");

  const minDatetime = toLocalDatetimeValue(dateRangeStart, timezone).slice(0, 16);
  const maxDatetime = toLocalDatetimeValue(dateRangeEnd, timezone).slice(0, 16);

  function addWindow() {
    if (!draft.start || !draft.end) {
      setError("Please select both start and end times.");
      return;
    }
    const start = fromLocalDatetimeValue(draft.start, timezone);
    const end = fromLocalDatetimeValue(draft.end, timezone);
    if (end <= start) {
      setError("End time must be after start time.");
      return;
    }
    if (end - start < 30 * 60) {
      setError("Window must be at least 30 minutes.");
      return;
    }
    setError("");
    const id = crypto.randomUUID();
    onChange([...windows, { id, start_time: start, end_time: end }]);
    setDraft({ start: "", end: "" });
  }

  function removeWindow(id: string) {
    onChange(windows.filter((w) => w.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="card p-4 space-y-3">
        <p className="text-sm font-medium text-text">Add availability window</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label text-xs">From</label>
            <input
              type="datetime-local"
              className="input text-sm"
              min={minDatetime}
              max={maxDatetime}
              value={draft.start}
              onChange={(e) => setDraft((d) => ({ ...d, start: e.target.value }))}
            />
          </div>
          <div>
            <label className="label text-xs">To</label>
            <input
              type="datetime-local"
              className="input text-sm"
              min={draft.start || minDatetime}
              max={maxDatetime}
              value={draft.end}
              onChange={(e) => setDraft((d) => ({ ...d, end: e.target.value }))}
            />
          </div>
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
        <Button variant="secondary" size="sm" onClick={addWindow} type="button">
          + Add window
        </Button>
      </div>

      {windows.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted uppercase tracking-wide">Added windows</p>
          {windows.map((win) => (
            <div
              key={win.id}
              className="flex items-center justify-between bg-accent-subtle border border-accent-light rounded-input px-4 py-3 animate-fade-in"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="text-sm text-text font-medium">{formatWindowDisplay(win, timezone)}</span>
              </div>
              <button
                type="button"
                onClick={() => removeWindow(win.id)}
                className="text-muted hover:text-danger transition-colors p-1 rounded"
                aria-label="Remove window"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {windows.length === 0 && (
        <div className="text-center py-8 text-muted text-sm">
          No availability windows added yet. Add at least one to continue.
        </div>
      )}

      <p className="text-xs text-muted">
        All times shown in <span className="font-medium text-text">{timezone}</span>
      </p>
    </div>
  );
}
