import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq, and } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId } from "@/lib/tokens";
import { UpdateParticipantSchema } from "@/lib/validation";
import { unixNow } from "@/lib/utils";

async function validateOrganizerToken(db: ReturnType<typeof getDB>, eventId: string, token: string | null) {
  if (!token) return null;
  return db.query.invite_tokens.findFirst({
    where: and(
      eq(schema.invite_tokens.token, token),
      eq(schema.invite_tokens.event_id, eventId),
      eq(schema.invite_tokens.role, "organizer"),
      eq(schema.invite_tokens.is_active, 1)
    ),
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string; participantId: string }> }
) {
  try {
    const { eventId, participantId } = await params;
    const token = request.headers.get("x-organizer-token");
    const db = getDB((env as unknown as { DB: D1Database }).DB);

    const tokenRecord = await validateOrganizerToken(db, eventId, token);
    if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const parsed = UpdateParticipantSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updated_at: unixNow() };
    if (parsed.data.name !== undefined) updates.name = parsed.data.name;
    if (parsed.data.email !== undefined) updates.email = parsed.data.email || null;
    if (parsed.data.phone !== undefined) updates.phone = parsed.data.phone || null;
    if (parsed.data.is_required !== undefined) updates.is_required = parsed.data.is_required ? 1 : 0;

    await db
      .update(schema.participants)
      .set(updates)
      .where(and(eq(schema.participants.id, participantId), eq(schema.participants.event_id, eventId)));

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: tokenRecord.participant_id,
      action: "participant_updated",
      data: JSON.stringify({ participant_id: participantId, updates }),
      created_at: unixNow(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update participant error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string; participantId: string }> }
) {
  try {
    const { eventId, participantId } = await params;
    const token = request.headers.get("x-organizer-token");
    const db = getDB((env as unknown as { DB: D1Database }).DB);

    const tokenRecord = await validateOrganizerToken(db, eventId, token);
    if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const participant = await db.query.participants.findFirst({
      where: and(eq(schema.participants.id, participantId), eq(schema.participants.event_id, eventId)),
    });
    if (!participant) return NextResponse.json({ error: "Participant not found" }, { status: 404 });
    if (participant.role === "organizer") return NextResponse.json({ error: "Cannot remove organizer" }, { status: 400 });

    await db
      .delete(schema.participants)
      .where(and(eq(schema.participants.id, participantId), eq(schema.participants.event_id, eventId)));

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: tokenRecord.participant_id,
      action: "participant_removed",
      data: JSON.stringify({ participant_id: participantId, name: participant.name }),
      created_at: unixNow(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete participant error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
