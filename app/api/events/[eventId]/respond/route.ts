import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq, and } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId } from "@/lib/tokens";
import { insertNormalizedSlots } from "@/lib/normalized-slots";
import { SubmitResponseSchema } from "@/lib/validation";
import { normalizeAvailabilityWindows } from "@/lib/scheduling";
import { unixNow } from "@/lib/utils";
import { parseEnabledPreferences, hasMeaningfulPreferences } from "@/lib/event-settings";
import { findParticipantInviteToken } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const body = await request.json();
    const parsed = SubmitResponseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { token, availability_windows, preferences } = parsed.data;
    const db = getDB((env as unknown as { DB: D1Database }).DB);

    const tokenRecord = await findParticipantInviteToken(db, eventId, token);

    if (!tokenRecord) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const event = await db.query.events.findFirst({
      where: eq(schema.events.id, eventId),
    });

    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    const now = unixNow();

    if (event.status === "finalized") {
      return NextResponse.json({ error: "Event is finalized, responses closed" }, { status: 400 });
    }

    if (event.response_deadline && now > event.response_deadline) {
      return NextResponse.json({ error: "The response deadline has passed" }, { status: 403 });
    }

    const participant = await db.query.participants.findFirst({
      where: eq(schema.participants.id, tokenRecord.participant_id),
    });

    if (!participant) return NextResponse.json({ error: "Participant not found" }, { status: 404 });

    const isUpdate = participant.response_status === "responded";
    if (isUpdate && event.allow_participant_edit === 0) {
      return NextResponse.json({ error: "Editing responses is not allowed for this event" }, { status: 403 });
    }

    const enabledPreferences = parseEnabledPreferences(event.enabled_preferences);

    if (event.preferences_required === 1 && !hasMeaningfulPreferences(preferences, enabledPreferences)) {
      return NextResponse.json(
        { error: "Please add at least one preference before submitting" },
        { status: 400 }
      );
    }

    await db
      .delete(schema.availability_windows)
      .where(
        and(
          eq(schema.availability_windows.participant_id, participant.id),
          eq(schema.availability_windows.event_id, eventId)
        )
      );
    await db
      .delete(schema.normalized_slots)
      .where(
        and(
          eq(schema.normalized_slots.participant_id, participant.id),
          eq(schema.normalized_slots.event_id, eventId)
        )
      );

    const windowsToInsert = availability_windows.map((w) => ({
      id: generateId(),
      event_id: eventId,
      participant_id: participant.id,
      start_time: w.start_time,
      end_time: w.end_time,
      created_at: now,
    }));

    if (windowsToInsert.length > 0) {
      await db.insert(schema.availability_windows).values(windowsToInsert);
    }

    const normalizedSlots = normalizeAvailabilityWindows(
      availability_windows.map((w) => ({ participant_id: participant.id, ...w })),
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

    if (normalizedSlots.length > 0) {
      await insertNormalizedSlots(db, eventId, normalizedSlots, now);
    }

    if (preferences) {
      const existingPref = await db.query.participant_preferences.findFirst({
        where: and(
          eq(schema.participant_preferences.participant_id, participant.id),
          eq(schema.participant_preferences.event_id, eventId)
        ),
      });

      if (existingPref) {
        await db
          .update(schema.participant_preferences)
          .set({
            preferred_area: preferences.preferred_area ?? null,
            food_preference: preferences.food_preference,
            food_note: preferences.food_note ?? null,
            budget_preference: preferences.budget_preference,
            preferred_day_type: preferences.preferred_day_type,
            preferred_time_of_day: preferences.preferred_time_of_day,
            indoor_outdoor: preferences.indoor_outdoor,
            notes: preferences.notes ?? null,
            updated_at: now,
          })
          .where(eq(schema.participant_preferences.id, existingPref.id));
      } else {
        await db.insert(schema.participant_preferences).values({
          id: generateId(),
          event_id: eventId,
          participant_id: participant.id,
          preferred_area: preferences.preferred_area ?? null,
          food_preference: preferences.food_preference,
          food_note: preferences.food_note ?? null,
          budget_preference: preferences.budget_preference,
          preferred_day_type: preferences.preferred_day_type,
          preferred_time_of_day: preferences.preferred_time_of_day,
          indoor_outdoor: preferences.indoor_outdoor,
          notes: preferences.notes ?? null,
          created_at: now,
          updated_at: now,
        });
      }
    }

    await db
      .update(schema.participants)
      .set({ response_status: "responded", updated_at: now })
      .where(eq(schema.participants.id, participant.id));

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: participant.id,
      action: isUpdate ? "response_updated" : "response_submitted",
      data: JSON.stringify({ windows_count: availability_windows.length }),
      created_at: now,
    });

    return NextResponse.json({ success: true, is_update: isUpdate });
  } catch (err) {
    console.error("Submit response error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
