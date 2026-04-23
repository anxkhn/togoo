import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId } from "@/lib/tokens";
import { computeCandidateMeetings, isValidFinalizationSlot, normalizeAvailabilityWindows } from "@/lib/scheduling";
import { FinalizeEventSchema } from "@/lib/validation";
import { unixNow } from "@/lib/utils";
import { findOrganizerInviteToken } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const token = request.headers.get("x-organizer-token");
    const db = getDB((env as unknown as { DB: D1Database }).DB);

    const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
    if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const event = await db.query.events.findFirst({ where: eq(schema.events.id, eventId) });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const body = await request.json();
    const parsed = FinalizeEventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const participants = await db
      .select()
      .from(schema.participants)
      .where(eq(schema.participants.event_id, eventId));

    const rawWindows = await db
      .select()
      .from(schema.availability_windows)
      .where(eq(schema.availability_windows.event_id, eventId));

    const slots = normalizeAvailabilityWindows(
      rawWindows.map((window) => ({
        participant_id: window.participant_id,
        start_time: window.start_time,
        end_time: window.end_time,
      })),
      {
        timezone: event.timezone,
        date_range_start: event.date_range_start,
        date_range_end: event.date_range_end,
        meeting_duration_minutes: event.meeting_duration_minutes,
        slot_granularity_minutes: event.slot_granularity_minutes,
        scoring_mode: event.scoring_mode,
        min_attendance_threshold: event.min_attendance_threshold,
      }
    );

    const preferences = await db
      .select()
      .from(schema.participant_preferences)
      .where(eq(schema.participant_preferences.event_id, eventId));

    const overrides = await db
      .select()
      .from(schema.organizer_overrides)
      .where(eq(schema.organizer_overrides.event_id, eventId));

    const validCandidates = computeCandidateMeetings(
      participants.filter((participant) => participant.role !== "organizer").map((participant) => ({
        id: participant.id,
        is_required: participant.is_required,
        response_status: participant.response_status,
        priority_tier: participant.priority_tier,
      })),
      slots,
      preferences.map((preference) => ({
        participant_id: preference.participant_id,
        preferred_day_type: preference.preferred_day_type,
        preferred_time_of_day: preference.preferred_time_of_day,
        food_preference: preference.food_preference,
        budget_preference: preference.budget_preference,
        indoor_outdoor: preference.indoor_outdoor,
      })),
      {
        timezone: event.timezone,
        date_range_start: event.date_range_start,
        date_range_end: event.date_range_end,
        meeting_duration_minutes: event.meeting_duration_minutes,
        slot_granularity_minutes: event.slot_granularity_minutes,
        scoring_mode: event.scoring_mode,
        min_attendance_threshold: event.min_attendance_threshold,
      },
      overrides
    );

    if (!isValidFinalizationSlot(validCandidates, parsed.data.slot_start, parsed.data.slot_end)) {
      return NextResponse.json({ error: "Selected time is no longer a valid recommendation" }, { status: 400 });
    }

    const now = unixNow();

    await db
      .insert(schema.final_selections)
      .values({
        id: generateId(),
        event_id: eventId,
        slot_start: parsed.data.slot_start,
        slot_end: parsed.data.slot_end,
        notes: parsed.data.notes ?? null,
        selected_by: tokenRecord.participant_id,
        finalized_at: now,
      })
      .onConflictDoUpdate({
        target: schema.final_selections.event_id,
        set: {
          slot_start: parsed.data.slot_start,
          slot_end: parsed.data.slot_end,
          notes: parsed.data.notes ?? null,
          selected_by: tokenRecord.participant_id,
          finalized_at: now,
        },
      });

    await db
      .update(schema.events)
      .set({ status: "finalized", updated_at: now })
      .where(eq(schema.events.id, eventId));

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: tokenRecord.participant_id,
      action: "event_finalized",
      data: JSON.stringify({
        slot_start: parsed.data.slot_start,
        slot_end: parsed.data.slot_end,
        notes: parsed.data.notes ?? null,
      }),
      created_at: now,
    });

    return NextResponse.json({ success: true, final_url: `/e/${eventId}/final` });
  } catch (err) {
    console.error("Finalize event error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
