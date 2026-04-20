import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq, and } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId, generateSecureToken } from "@/lib/tokens";
import { unixNow } from "@/lib/utils";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string; participantId: string }> }
) {
  try {
    const { eventId, participantId } = await params;
    const token = request.headers.get("x-organizer-token");
    const db = getDB((env as unknown as { DB: D1Database }).DB);

    const tokenRecord = await db.query.invite_tokens.findFirst({
      where: and(
        eq(schema.invite_tokens.token, token ?? ""),
        eq(schema.invite_tokens.event_id, eventId),
        eq(schema.invite_tokens.role, "organizer"),
        eq(schema.invite_tokens.is_active, 1)
      ),
    });
    if (!tokenRecord) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await db
      .update(schema.invite_tokens)
      .set({ is_active: 0 })
      .where(
        and(
          eq(schema.invite_tokens.participant_id, participantId),
          eq(schema.invite_tokens.event_id, eventId),
          eq(schema.invite_tokens.role, "participant")
        )
      );

    const newToken = generateSecureToken();
    const now = unixNow();

    await db.insert(schema.invite_tokens).values({
      id: generateId(),
      event_id: eventId,
      participant_id: participantId,
      token: newToken,
      role: "participant",
      is_active: 1,
      created_at: now,
    });

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: tokenRecord.participant_id,
      action: "invite_token_regenerated",
      data: JSON.stringify({ participant_id: participantId }),
      created_at: now,
    });

    return NextResponse.json({
      invite_token: newToken,
      invite_url: `/e/${eventId}/respond/${newToken}`,
    });
  } catch (err) {
    console.error("Regenerate token error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
