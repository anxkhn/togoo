import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq, and } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId, generateSecureToken } from "@/lib/tokens";
import { AddParticipantSchema } from "@/lib/validation";
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
    if (!tokenRecord) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const participants = await db
      .select()
      .from(schema.participants)
      .where(eq(schema.participants.event_id, eventId));

    const tokensForEvent = await db
      .select()
      .from(schema.invite_tokens)
      .where(and(eq(schema.invite_tokens.event_id, eventId), eq(schema.invite_tokens.is_active, 1)));

    const participantsWithTokens = participants.map((p) => {
      const t = tokensForEvent.find((t) => t.participant_id === p.id && t.role === "participant");
      return { ...p, invite_token: t?.token ?? null, token_expires_at: t?.expires_at ?? null };
    });

    return NextResponse.json({ participants: participantsWithTokens });
  } catch (err) {
    console.error("List participants error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
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

    const body = await request.json();
    const parsed = AddParticipantSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email, phone, is_required, priority_tier, token_expires_hours } = parsed.data;
    const now = unixNow();
    const participantId = generateId();
    const inviteToken = generateSecureToken();
    const expiresAt = token_expires_hours ? now + token_expires_hours * 3600 : null;

    await db.insert(schema.participants).values({
      id: participantId,
      event_id: eventId,
      name,
      email: email || null,
      phone: phone || null,
      role: "participant",
      is_required: is_required ? 1 : 0,
      priority_tier,
      response_status: "pending",
      created_at: now,
      updated_at: now,
    });

    await db.insert(schema.invite_tokens).values({
      id: generateId(),
      event_id: eventId,
      participant_id: participantId,
      token: inviteToken,
      role: "participant",
      is_active: 1,
      created_at: now,
      expires_at: expiresAt,
    });

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: tokenRecord.participant_id,
      action: "participant_added",
      data: JSON.stringify({ participant_id: participantId, name }),
      created_at: now,
    });

    return NextResponse.json({
      participant: { id: participantId, name, email: email || null, phone: phone || null, is_required, priority_tier },
      invite_token: inviteToken,
      invite_url: `/r/${inviteToken}`,
    });
  } catch (err) {
    console.error("Add participant error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
