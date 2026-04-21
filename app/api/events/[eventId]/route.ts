import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { generateId } from "@/lib/tokens";
import { findOrganizerInviteToken } from "@/lib/auth";
import { normalizeAvailabilityWindows } from "@/lib/scheduling";
import { unixNow } from "@/lib/utils";
import { UpdateEventSchema } from "@/lib/validation";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const token = request.headers.get("x-organizer-token");
    const db = getDB((env as unknown as { DB: D1Database }).DB);

    const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
    if (!tokenRecord) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const event = await db.query.events.findFirst({
      where: eq(schema.events.id, eventId),
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const participants = await db
      .select()
      .from(schema.participants)
      .where(eq(schema.participants.event_id, eventId));

    const total = participants.filter((p) => p.role === "participant").length;
    const responded = participants.filter((p) => p.role === "participant" && p.response_status === "responded").length;
    const activity = await db
      .select()
      .from(schema.activity_log)
      .where(eq(schema.activity_log.event_id, eventId))
      .orderBy(desc(schema.activity_log.created_at))
      .limit(25);
    const finalSelection = await db.query.final_selections.findFirst({
      where: eq(schema.final_selections.event_id, eventId),
    });

    return NextResponse.json({
      event,
      stats: {
        total_invited: total,
        total_responded: responded,
        pending: total - responded,
      },
      activity,
      final_selection: finalSelection ?? null,
    });
  } catch (err) {
    console.error("Get event error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const token = request.headers.get("x-organizer-token");
    const body = await request.json();
    const parsed = UpdateEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    if (data.date_range_end <= data.date_range_start) {
      return NextResponse.json({ error: "End date must be after start date" }, { status: 400 });
    }

    const db = getDB((env as unknown as { DB: D1Database }).DB);
    const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
    if (!tokenRecord) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const event = await db.query.events.findFirst({ where: eq(schema.events.id, eventId) });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const now = unixNow();
    const scheduleChanged =
      event.timezone !== data.timezone ||
      event.date_range_start !== data.date_range_start ||
      event.date_range_end !== data.date_range_end ||
      event.allowed_hours_start !== data.allowed_hours_start ||
      event.allowed_hours_end !== data.allowed_hours_end ||
      event.meeting_duration_minutes !== data.meeting_duration_minutes ||
      event.slot_granularity_minutes !== data.slot_granularity_minutes ||
      event.scoring_mode !== data.scoring_mode ||
      (event.suggested_time_start ?? null) !== (data.suggested_time_start ?? null) ||
      (event.suggested_time_end ?? null) !== (data.suggested_time_end ?? null);

    if (event.status === "finalized" && scheduleChanged) {
      await db.delete(schema.final_selections).where(eq(schema.final_selections.event_id, eventId));
    }

    await db
      .update(schema.events)
      .set({
        title: data.title,
        description: data.description ?? null,
        event_type: data.event_type,
        timezone: data.timezone,
        date_range_start: data.date_range_start,
        date_range_end: data.date_range_end,
        allowed_hours_start: data.allowed_hours_start,
        allowed_hours_end: data.allowed_hours_end,
        meeting_duration_minutes: data.meeting_duration_minutes,
        slot_granularity_minutes: data.slot_granularity_minutes,
        scoring_mode: data.scoring_mode,
        suggested_time_start: data.suggested_time_start ?? null,
        suggested_time_end: data.suggested_time_end ?? null,
        status: event.status === "finalized" && scheduleChanged ? "active" : event.status,
        participants_required_by_default: data.participants_required_by_default ? 1 : 0,
        allow_participant_edit: data.allow_participant_edit ? 1 : 0,
        show_results_to_participants: data.show_results_to_participants ? 1 : 0,
        preferences_required: data.preferences_required ? 1 : 0,
        enabled_preferences: JSON.stringify(data.enabled_preferences),
        response_deadline: data.response_deadline ?? null,
        updated_at: now,
      })
      .where(eq(schema.events.id, eventId));

    const rawWindows = await db
      .select()
      .from(schema.availability_windows)
      .where(eq(schema.availability_windows.event_id, eventId));

    await db.delete(schema.normalized_slots).where(eq(schema.normalized_slots.event_id, eventId));

    const normalizedSlots = normalizeAvailabilityWindows(rawWindows, {
      timezone: data.timezone,
      date_range_start: data.date_range_start,
      date_range_end: data.date_range_end,
      meeting_duration_minutes: data.meeting_duration_minutes,
      slot_granularity_minutes: data.slot_granularity_minutes,
      allowed_hours_start: data.allowed_hours_start,
      allowed_hours_end: data.allowed_hours_end,
      scoring_mode: data.scoring_mode,
      min_attendance_threshold: event.min_attendance_threshold,
    });

    if (normalizedSlots.length > 0) {
      await db.insert(schema.normalized_slots).values(
        normalizedSlots.map((slot) => ({
          id: generateId(),
          event_id: eventId,
          participant_id: slot.participant_id,
          slot_start: slot.slot_start,
          slot_end: slot.slot_end,
          created_at: now,
        }))
      );
    }

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: tokenRecord.participant_id,
      action: event.status === "finalized" && scheduleChanged ? "event_updated_and_reopened" : "event_updated",
      data: JSON.stringify({
        title: data.title,
        date_range_start: data.date_range_start,
        date_range_end: data.date_range_end,
      }),
      created_at: now,
    });

    const updated = await db.query.events.findFirst({ where: eq(schema.events.id, eventId) });
    return NextResponse.json({ event: updated });
  } catch (err) {
    console.error("Update event error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const token = request.headers.get("x-organizer-token");
    const db = getDB((env as unknown as { DB: D1Database }).DB);

    const tokenRecord = await findOrganizerInviteToken(db, eventId, token);
    if (!tokenRecord) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const event = await db.query.events.findFirst({ where: eq(schema.events.id, eventId) });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await db.delete(schema.events).where(eq(schema.events.id, eventId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete event error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
