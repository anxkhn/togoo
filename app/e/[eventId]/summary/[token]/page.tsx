import { env } from "cloudflare:workers";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { computeRecommendations } from "@/lib/scheduling";
import { formatDate } from "@/lib/utils";
import { RecommendationCards } from "@/components/recommendation-cards";

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ eventId: string; token: string }>;
}) {
  const { eventId, token } = await params;
  const db = getDB((env as unknown as { DB: D1Database }).DB);

  const tokenRecord = await db.query.invite_tokens.findFirst({
    where: and(eq(schema.invite_tokens.token, token), eq(schema.invite_tokens.is_active, 1)),
  });
  if (!tokenRecord) notFound();

  const event = await db.query.events.findFirst({ where: eq(schema.events.id, eventId) });
  if (!event) notFound();

  if (event.show_results_to_participants === 0 && tokenRecord.role !== "organizer") {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <h1 className="font-display text-2xl font-semibold text-text mb-2">Results not yet shared</h1>
          <p className="text-muted">The organizer hasn&apos;t shared results with participants yet.</p>
        </div>
      </div>
    );
  }

  const participants = await db.select().from(schema.participants).where(eq(schema.participants.event_id, eventId));
  const slots = await db.select().from(schema.normalized_slots).where(eq(schema.normalized_slots.event_id, eventId));
  const preferences = await db.select().from(schema.participant_preferences).where(eq(schema.participant_preferences.event_id, eventId));
  const overrides = await db.select().from(schema.organizer_overrides).where(eq(schema.organizer_overrides.event_id, eventId));

  const recommendations = computeRecommendations(
    participants.filter((p) => p.role !== "organizer").map((p) => ({
      id: p.id,
      is_required: p.is_required,
      response_status: p.response_status,
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
    },
    overrides
  );

  const totalParticipants = participants.filter((p) => p.role !== "organizer").length;
  const responded = participants.filter((p) => p.role !== "organizer" && p.response_status === "responded").length;

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-text">
            where to go
          </Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 py-8">
        <div className="mb-8 animate-fade-in">
          <p className="text-xs font-medium text-accent uppercase tracking-wide mb-1">{event.event_type}</p>
          <h1 className="font-display text-3xl font-bold text-text">{event.title}</h1>
          <p className="text-sm text-muted mt-2">
            {formatDate(event.date_range_start, event.timezone)} &mdash; {formatDate(event.date_range_end, event.timezone)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card p-4 text-center">
            <p className="font-display text-3xl font-bold text-text">{responded}</p>
            <p className="text-xs text-muted mt-1">Responded</p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-display text-3xl font-bold text-text">{totalParticipants - responded}</p>
            <p className="text-xs text-muted mt-1">Pending</p>
          </div>
        </div>

        {responded < totalParticipants && (
          <div className="bg-warning-light border border-warning/20 rounded-input px-4 py-3 text-sm text-warning mb-6">
            <span className="font-medium">Results are provisional</span> — {totalParticipants - responded} {totalParticipants - responded === 1 ? "person hasn't" : "people haven't"} responded yet.
          </div>
        )}

        <h2 className="section-title mb-4">Best times so far</h2>
        <RecommendationCards
          recommendations={recommendations}
          timezone={event.timezone}
          durationMinutes={event.meeting_duration_minutes}
        />
      </main>
    </div>
  );
}
