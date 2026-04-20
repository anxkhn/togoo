"use client";

import { cn } from "@/lib/utils";

interface SlotData {
  slot_start: number;
  count: number;
  max: number;
}

interface OverlapHeatmapProps {
  slots: Array<{ slot_start: number; participant_ids: string[] }>;
  timezone: string;
  totalParticipants: number;
}

function getIntensityClass(ratio: number): string {
  if (ratio === 0) return "bg-border";
  if (ratio <= 0.2) return "bg-accent/10";
  if (ratio <= 0.4) return "bg-accent/25";
  if (ratio <= 0.6) return "bg-accent/45";
  if (ratio <= 0.8) return "bg-accent/65";
  return "bg-accent/90";
}

export function OverlapHeatmap({ slots, timezone, totalParticipants }: OverlapHeatmapProps) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-muted text-sm">
        No replies yet. This heatmap fills in as people respond.
      </div>
    );
  }

  const countBySlot = new Map<number, number>();
  for (const slot of slots) {
    countBySlot.set(slot.slot_start, slot.participant_ids.length);
  }

  const allStarts = [...countBySlot.keys()].sort((a, b) => a - b);
  const maxCount = Math.max(...countBySlot.values(), 1);

  const dayGroups = new Map<string, typeof allStarts>();
  for (const start of allStarts) {
    const label = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: timezone,
    }).format(new Date(start * 1000));
    if (!dayGroups.has(label)) dayGroups.set(label, []);
    dayGroups.get(label)!.push(start);
  }

  const days = [...dayGroups.entries()];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px] space-y-1">
        {days.map(([dayLabel, daySlots]) => (
          <div key={dayLabel} className="flex items-center gap-2">
            <div className="w-24 flex-shrink-0 text-xs text-muted font-medium text-right pr-2 leading-tight">
              {dayLabel}
            </div>
            <div className="flex gap-0.5 flex-1">
              {daySlots.map((start) => {
                const count = countBySlot.get(start) ?? 0;
                const ratio = totalParticipants > 0 ? count / totalParticipants : 0;
                const timeLabel = new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  timeZone: timezone,
                }).format(new Date(start * 1000));

                return (
                  <div
                    key={start}
                    title={`${timeLabel}: ${count}/${totalParticipants} available`}
                    className={cn(
                      "h-6 rounded-sm flex-1 min-w-[6px] cursor-default transition-opacity hover:opacity-80",
                      getIntensityClass(ratio)
                    )}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-muted">Less</span>
        <div className="flex gap-1">
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio) => (
            <div key={ratio} className={cn("w-4 h-4 rounded-sm", getIntensityClass(ratio))} />
          ))}
        </div>
        <span className="text-xs text-muted">More</span>
      </div>
    </div>
  );
}
