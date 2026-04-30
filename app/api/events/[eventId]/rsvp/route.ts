import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId } from "@/lib/tokens";
import { FinalRsvpSchema } from "@/lib/validation";
import { unixNow } from "@/lib/utils";
import { findParticipantInviteToken } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const body = await request.json();
    const parsed = FinalRsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const db = getDB((env as unknown as { DB: D1Database }).DB);
    const tokenRecord = await findParticipantInviteToken(db, eventId, parsed.data.token);

    if (!tokenRecord) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const event = await db.query.events.findFirst({ where: eq(schema.events.id, eventId) });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    if (event.status !== "finalized") {
      return NextResponse.json({ error: "RSVP links are not active until the organizer confirms the final plan" }, { status: 403 });
    }

    const finalSelection = await db.query.final_selections.findFirst({
      where: eq(schema.final_selections.event_id, eventId),
    });

    if (!finalSelection) {
      return NextResponse.json({ error: "RSVP links are not active until the organizer confirms the final plan" }, { status: 403 });
    }

    const now = unixNow();
    await db
      .update(schema.participants)
      .set({
        final_rsvp_status: parsed.data.status,
        final_rsvp_note: parsed.data.note?.trim() || null,
        final_rsvp_updated_at: now,
        updated_at: now,
      })
      .where(eq(schema.participants.id, tokenRecord.participant_id));

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: tokenRecord.participant_id,
      action: "final_rsvp_submitted",
      data: JSON.stringify({ status: parsed.data.status }),
      created_at: now,
    });

    return NextResponse.json({ success: true, status: parsed.data.status });
  } catch (err) {
    console.error("RSVP error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
