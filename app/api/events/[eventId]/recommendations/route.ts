import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId } from "@/lib/tokens";
import { computeRecommendations } from "@/lib/scheduling";
import { unixNow } from "@/lib/utils";
import { findOrganizerInviteToken } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const token = request.headers.get("x-organizer-token");
    const db = getDB((env as unknown as { DB: D1Database }).DB);

    const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
    if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const event = await db.query.events.findFirst({
      where: eq(schema.events.id, eventId),
    });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const participants = await db
      .select()
      .from(schema.participants)
      .where(eq(schema.participants.event_id, eventId));

    const slots = await db
      .select()
      .from(schema.normalized_slots)
      .where(eq(schema.normalized_slots.event_id, eventId));

    const preferences = await db
      .select()
      .from(schema.participant_preferences)
      .where(eq(schema.participant_preferences.event_id, eventId));

    const overrides = await db
      .select()
      .from(schema.organizer_overrides)
      .where(eq(schema.organizer_overrides.event_id, eventId));

    const respondedCount = participants.filter(
      (p) => p.role === "participant" && p.response_status === "responded"
    ).length;

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
        date_range_start: event.date_range_start,
        date_range_end: event.date_range_end,
        meeting_duration_minutes: event.meeting_duration_minutes,
        slot_granularity_minutes: event.slot_granularity_minutes,
        allowed_hours_start: event.allowed_hours_start,
        allowed_hours_end: event.allowed_hours_end,
        scoring_mode: event.scoring_mode,
        min_attendance_threshold: event.min_attendance_threshold,
      },
      overrides
    );

    const now = unixNow();
    await db.insert(schema.recommendation_snapshots).values({
      id: generateId(),
      event_id: eventId,
      recommendations: JSON.stringify(recommendations),
      total_responded: respondedCount,
      computed_at: now,
    });

    const totalParticipants = participants.filter((p) => p.role === "participant").length;

    return NextResponse.json({
      recommendations,
      stats: {
        total_participants: totalParticipants,
        responded: respondedCount,
        pending: totalParticipants - respondedCount,
        response_rate: totalParticipants > 0 ? Math.round((respondedCount / totalParticipants) * 100) : 0,
      },
      computed_at: now,
    });
  } catch (err) {
    console.error("Get recommendations error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
