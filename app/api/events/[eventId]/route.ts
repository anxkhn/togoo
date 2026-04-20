import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
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
