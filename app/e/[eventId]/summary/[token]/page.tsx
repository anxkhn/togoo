import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { computeRecommendations } from "@/lib/scheduling";
import { formatDate } from "@/lib/utils";
import { findActiveInviteToken } from "@/lib/auth";

function formatSlotTime(ts: number, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(ts * 1000));
}

function formatSlotEnd(ts: number, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(ts * 1000));
}

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ eventId: string; token: string }>;
}) {
  const { eventId, token } = await params;
  const db = getDB((env as unknown as { DB: D1Database }).DB);

  const event = await db.query.events.findFirst({ where: eq(schema.events.id, eventId) });
  if (!event) return notFound();

  const tokenRecord = await findActiveInviteToken(db, token, { eventId });
  if (!tokenRecord) return notFound();
  if (tokenRecord.role === "participant" && event.show_results_to_participants !== 1) return notFound();

  const participants = await db.select().from(schema.participants).where(eq(schema.participants.event_id, eventId));
  const slots = await db.select().from(schema.normalized_slots).where(eq(schema.normalized_slots.event_id, eventId));
  const preferences = await db.select().from(schema.participant_preferences).where(eq(schema.participant_preferences.event_id, eventId));
  const overrides = await db.select().from(schema.organizer_overrides).where(eq(schema.organizer_overrides.event_id, eventId));

  const recommendations = computeRecommendations(
    participants.filter((p) => p.role !== "organizer").map((p) => ({
      id: p.id,
      is_required: p.is_required,
      response_status: p.response_status,
      priority_tier: p.priority_tier,
    })),
    slots,
    preferences.map((p) => ({
      participant_id: p.participant_id,
      preferred_day_type: p.preferred_day_type,
      preferred_time_of_day: p.preferred_time_of_day,
      food_preference: p.food_preference,
      budget_preference: p.budget_preference,
      indoor_outdoor: p.indoor_outdoor,
    })),
    {
      timezone: event.timezone,
      meeting_duration_minutes: event.meeting_duration_minutes,
      slot_granularity_minutes: event.slot_granularity_minutes,
      allowed_hours_start: event.allowed_hours_start,
      allowed_hours_end: event.allowed_hours_end,
      scoring_mode: event.scoring_mode,
      min_attendance_threshold: event.min_attendance_threshold,
    },
    overrides
  );

  const totalParticipants = participants.filter((p) => p.role !== "organizer").length;
  const responded = participants.filter((p) => p.role !== "organizer" && p.response_status === "responded").length;

  const popularTimings = [...recommendations.top_candidates]
    .sort((a, b) => b.attendingCount - a.attendingCount)
    .slice(0, 3);

  const suggestedTimings = recommendations.top_candidates.slice(0, 3);
  const popularStarts = new Set(popularTimings.map((t) => t.start));
  const uniqueSuggested = suggestedTimings.filter((t) => !popularStarts.has(t.start));

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-text">Togoo</Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 py-8">
        <div className="mb-8 animate-fade-in">
          <p className="text-xs font-medium text-accent uppercase tracking-wide mb-1">{event.event_type}</p>
          <h1 className="font-display text-3xl font-bold text-text">{event.title}</h1>
          {event.description && <p className="text-sm text-muted mt-1">{event.description}</p>}
          <p className="mt-2 text-sm text-muted tabular-nums">
            {formatDate(event.date_range_start, event.timezone)} &mdash; {formatDate(event.date_range_end, event.timezone)}
            <span className="ml-2 text-xs">({event.timezone})</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card p-4 text-center">
            <p className="font-display text-3xl font-bold text-text tabular-nums">{responded}</p>
            <p className="text-xs text-muted mt-1">Replied</p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-display text-3xl font-bold text-text tabular-nums">{totalParticipants - responded}</p>
            <p className="text-xs text-muted mt-1">Still waiting</p>
          </div>
        </div>

        {responded < totalParticipants && (
          <div className="mb-6 rounded-input bg-warning-light px-4 py-3 text-sm text-warning shadow-[inset_0_0_0_1px_rgba(180,83,9,0.12)]">
            <span className="font-medium">More replies are still coming in.</span> {totalParticipants - responded} {totalParticipants - responded === 1 ? "person has not" : "people have not"} replied yet, so these results may change.
          </div>
        )}

        {popularTimings.length > 0 && (
          <div className="mb-8">
            <h2 className="section-title mb-3">Most people can make these</h2>
            <p className="text-xs text-muted mb-4">These are the times with the strongest overlap so far.</p>
            <div className="space-y-3">
              {popularTimings.map((slot, i) => (
                <div key={slot.start} className="card card-interactive flex items-center gap-4 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent-subtle font-display text-sm font-bold text-accent shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)] tabular-nums">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text tabular-nums">
                      {formatSlotTime(slot.start, event.timezone)} &ndash; {formatSlotEnd(slot.end, event.timezone)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted tabular-nums">
                      {slot.attendingCount} of {slot.totalParticipants} people can make it
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-text tabular-nums">
                      {Math.round((slot.attendingCount / slot.totalParticipants) * 100)}%
                    </p>
                    <p className="text-xs text-muted">can make it</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {uniqueSuggested.length > 0 && (
          <div className="mb-8">
            <h2 className="section-title mb-3">Best fit for the group</h2>
            <p className="text-xs text-muted mb-4">These times balance attendance with the group's stated preferences.</p>
            <div className="space-y-3">
              {uniqueSuggested.map((slot, i) => (
                <div key={slot.start} className="card flex items-center gap-4 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-alt font-display text-sm font-bold text-muted shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)] tabular-nums">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text tabular-nums">
                      {formatSlotTime(slot.start, event.timezone)} &ndash; {formatSlotEnd(slot.end, event.timezone)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted tabular-nums">
                      {slot.attendingCount} of {slot.totalParticipants} people can make it
                      {slot.isWeekend ? " · weekend" : " · weekday"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {popularTimings.length === 0 && (
          <div className="card p-8 text-center text-muted text-sm">
            <p className="font-medium text-text mb-1">No replies yet</p>
            <p>Suggestions will appear after people start replying.</p>
          </div>
        )}
      </main>
    </div>
  );
}
