"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatEventDate, formatDuration } from "@/lib/utils";
import type { RecommendationSet, ScoredMeeting } from "@/lib/scheduling";

interface RecommendationCardProps {
  meeting: ScoredMeeting;
  timezone: string;
  durationMinutes: number;
  highlight?: boolean;
  onSelect?: (meeting: ScoredMeeting) => void;
  selected?: boolean;
}

function ScoreBar({ score, className }: { score: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border shadow-[inset_0_1px_1px_rgba(26,23,20,0.06)]">
        <div
          className="h-full rounded-full bg-accent motion-safe:transition-[width] motion-safe:duration-[220ms] motion-safe:[transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)]"
          style={{ width: `${Math.round(score * 100)}%` }}
        />
      </div>
      <span className="w-9 text-right text-xs font-medium text-muted tabular-nums">{Math.round(score * 100)}%</span>
    </div>
  );
}

function RecommendationCard({ meeting, timezone, durationMinutes, highlight, onSelect, selected }: RecommendationCardProps) {
  const attendancePct = meeting.totalParticipants > 0
    ? Math.round((meeting.attendingCount / meeting.totalParticipants) * 100)
    : 0;

  return (
    <div
      className={cn(
        "card p-5 motion-safe:transition-[box-shadow,border-color,background-color,transform] motion-safe:duration-200 motion-safe:ease",
        "motion-safe:[transition-timing-function:ease]",
        highlight && "border-accent/40 bg-accent-subtle/30 shadow-card-hover",
        selected && "border-accent ring-2 ring-accent/20",
        onSelect && "cursor-pointer hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.96]"
      )}
      onClick={() => onSelect?.(meeting)}
      onKeyDown={(event) => {
        if (!onSelect) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(meeting);
        }
      }}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {highlight && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Best overall pick
              </span>
            )}
            <Badge variant={meeting.isWeekend ? "warning" : "default"}>
              {meeting.isWeekend ? "Weekend" : "Weekday"}
            </Badge>
            <Badge variant="default">{meeting.timeCategory.replace("_", " ")}</Badge>
          </div>
          <p className="font-display text-lg font-semibold text-text">
            {formatEventDate(meeting.start, timezone)}
          </p>
          <p className="mt-0.5 text-sm text-muted tabular-nums">{formatDuration(durationMinutes)}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-display font-bold text-accent tabular-nums">{attendancePct}%</p>
          <p className="text-xs text-muted">can make it</p>
        </div>
      </div>

      <p className="mb-3 text-xs text-muted tabular-nums">
        {meeting.attendingCount} of {meeting.totalParticipants} people can make it
        {meeting.totalRequired > 0 && (
          <> &middot; {meeting.requiredAttending}/{meeting.totalRequired} required</>
        )}
      </p>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Attendance</span>
        </div>
        <ScoreBar score={meeting.attendanceScore} />
        {meeting.totalRequired > 0 && (
          <>
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Required attendees</span>
            </div>
            <ScoreBar score={meeting.requiredScore} />
          </>
        )}
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Preference fit</span>
        </div>
        <ScoreBar score={meeting.timePrefScore} />
      </div>

      {meeting.explanation && (
        <p className="mt-3 border-t border-border pt-3 text-xs text-muted text-pretty">{meeting.explanation}</p>
      )}

      {onSelect && (
        <div className="mt-4 pt-3 border-t border-border">
            <Button
            variant={selected ? "primary" : "secondary"}
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(meeting);
            }}
            >
            {selected ? "Selected time" : "Choose this time"}
          </Button>
        </div>
      )}
    </div>
  );
}

interface RecommendationCardsProps {
  recommendations: RecommendationSet;
  timezone: string;
  durationMinutes: number;
  onSelect?: (meeting: ScoredMeeting) => void;
  selectedStart?: number;
}

export function RecommendationCards({
  recommendations,
  timezone,
  durationMinutes,
  onSelect,
  selectedStart,
}: RecommendationCardsProps) {
  const { best_overall, best_attendance, best_required_match, best_time_fit, top_candidates } = recommendations;

  if (!best_overall && top_candidates.length === 0) {
    return (
        <div className="text-center py-12 text-muted">
          <p className="font-medium text-text">No ranked times yet</p>
          <p className="text-sm mt-1">Once more people reply, Togoo will rank the best times.</p>
        </div>
      );
    }

  const shown = new Set<number>();
  const highlights: Array<{ meeting: ScoredMeeting; isHighlight: boolean }> = [];

  if (best_overall) {
    highlights.push({ meeting: best_overall, isHighlight: true });
    shown.add(best_overall.start);
  }

  for (const candidate of [best_attendance, best_required_match, best_time_fit]) {
    if (candidate && !shown.has(candidate.start)) {
      highlights.push({ meeting: candidate, isHighlight: false });
      shown.add(candidate.start);
    }
  }

  for (const c of top_candidates) {
    if (!shown.has(c.start) && highlights.length < 6) {
      highlights.push({ meeting: c, isHighlight: false });
      shown.add(c.start);
    }
  }

  return (
    <div className="space-y-3">
      {highlights.map(({ meeting, isHighlight }) => (
        <RecommendationCard
          key={meeting.start}
          meeting={meeting}
          timezone={timezone}
          durationMinutes={durationMinutes}
          highlight={isHighlight}
          onSelect={onSelect}
          selected={selectedStart === meeting.start}
        />
      ))}
    </div>
  );
}
