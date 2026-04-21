import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId, generateSecureToken } from "@/lib/tokens";
import { CreateEventSchema } from "@/lib/validation";
import { unixNow } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = CreateEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    if (data.date_range_end <= data.date_range_start) {
      return NextResponse.json({ error: "End date must be after start date" }, { status: 400 });
    }

    const db = getDB((env as unknown as { DB: D1Database }).DB);
    const eventId = generateId();
    const organizerParticipantId = generateId();
    const organizerTokenId = generateId();
    const organizerToken = generateSecureToken();
    const now = unixNow();

    await db.insert(schema.events).values({
      id: eventId,
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
      min_attendance_threshold: data.min_attendance_threshold,
      suggested_time_start: data.suggested_time_start ?? null,
      suggested_time_end: data.suggested_time_end ?? null,
      participants_required_by_default: data.participants_required_by_default ? 1 : 0,
      allow_participant_edit: data.allow_participant_edit ? 1 : 0,
      show_results_to_participants: data.show_results_to_participants ? 1 : 0,
      preferences_required: data.preferences_required ? 1 : 0,
      enabled_preferences: JSON.stringify(data.enabled_preferences),
      scoring_mode: data.scoring_mode,
      organizer_participant_id: organizerParticipantId,
      status: "active",
      response_deadline: data.response_deadline ?? null,
      created_at: now,
      updated_at: now,
    });

    await db.insert(schema.participants).values({
      id: organizerParticipantId,
      event_id: eventId,
      name: data.organizer_name,
      email: data.organizer_email ?? null,
      role: "organizer",
      is_required: 1,
      response_status: "responded",
      created_at: now,
      updated_at: now,
    });

    await db.insert(schema.invite_tokens).values({
      id: organizerTokenId,
      event_id: eventId,
      participant_id: organizerParticipantId,
      token: organizerToken,
      role: "organizer",
      is_active: 1,
      created_at: now,
    });

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: organizerParticipantId,
      action: "event_created",
      data: JSON.stringify({ title: data.title }),
      created_at: now,
    });

    return NextResponse.json({
      event_id: eventId,
      organizer_token: organizerToken,
      organizer_participant_id: organizerParticipantId,
      dashboard_url: `/e/${eventId}/organizer/${organizerToken}`,
    });
  } catch (err) {
    console.error("Create event error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
