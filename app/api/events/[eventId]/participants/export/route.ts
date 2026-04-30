import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { formatEventDate, formatTime } from "@/lib/utils";
import { findOrganizerInviteToken } from "@/lib/auth";

function toCsvCell(value: string | number | null | undefined): string {
  const normalized = value == null ? "" : String(value);
  return `"${normalized.replace(/"/g, '""')}"`;
}

function toCsvRow(values: Array<string | number | null | undefined>): string {
  return values.map(toCsvCell).join(",");
}

function formatAvailabilityWindows(
  windows: Array<{ start_time: number; end_time: number }>,
  timezone: string
): string {
  return windows
    .sort((a, b) => a.start_time - b.start_time)
    .map((window) => `${formatEventDate(window.start_time, timezone)} - ${formatTime(window.end_time, timezone)}`)
    .join(" | ");
}

function fileNameFromTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "togoo";
  return `${slug}-participant-responses.csv`;
}

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

    const event = await db.query.events.findFirst({ where: eq(schema.events.id, eventId) });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const participants = await db
      .select()
      .from(schema.participants)
      .where(eq(schema.participants.event_id, eventId));

    const participantPreferences = await db
      .select()
      .from(schema.participant_preferences)
      .where(eq(schema.participant_preferences.event_id, eventId));

    const availabilityWindows = await db
      .select()
      .from(schema.availability_windows)
      .where(eq(schema.availability_windows.event_id, eventId));

    const rows = participants
      .filter((participant) => participant.role === "participant")
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((participant) => {
        const preferences = participantPreferences.find((item) => item.participant_id === participant.id);
        const windows = availabilityWindows.filter((item) => item.participant_id === participant.id);

        return toCsvRow([
          participant.name,
          participant.email,
          participant.phone,
          participant.response_status,
          participant.final_rsvp_status,
          participant.final_rsvp_note,
          participant.final_rsvp_updated_at ? formatEventDate(participant.final_rsvp_updated_at, event.timezone) : "",
          participant.is_required === 1 ? "yes" : "no",
          participant.priority_tier,
          formatEventDate(participant.updated_at, event.timezone),
          windows.length,
          formatAvailabilityWindows(windows, event.timezone),
          preferences?.preferred_area,
          preferences?.food_preference,
          preferences?.food_note,
          preferences?.budget_preference,
          preferences?.preferred_day_type,
          preferences?.preferred_time_of_day,
          preferences?.indoor_outdoor,
          preferences?.notes,
        ]);
      });

    const csv = [
      toCsvRow([
        "name",
        "email",
        "phone",
        "response_status",
        "final_rsvp_status",
        "final_rsvp_note",
        `final_rsvp_updated (${event.timezone})`,
        "required",
        "priority_tier",
        `last_updated (${event.timezone})`,
        "selected_slot_count",
        `selected_slots (${event.timezone})`,
        "preferred_area",
        "food_preference",
        "food_note",
        "budget_preference",
        "preferred_day_type",
        "preferred_time_of_day",
        "indoor_outdoor",
        "notes",
      ]),
      ...rows,
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${fileNameFromTitle(event.title)}"`,
      },
    });
  } catch (err) {
    console.error("Export participants error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
