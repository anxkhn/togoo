import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq, and } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId } from "@/lib/tokens";
import { FinalizeEventSchema } from "@/lib/validation";
import { unixNow } from "@/lib/utils";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
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

    const body = await request.json();
    const parsed = FinalizeEventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const now = unixNow();

    await db.insert(schema.final_selections).values({
      id: generateId(),
      event_id: eventId,
      slot_start: parsed.data.slot_start,
      slot_end: parsed.data.slot_end,
      notes: parsed.data.notes ?? null,
      selected_by: tokenRecord.participant_id,
      finalized_at: now,
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
      data: JSON.stringify({ slot_start: parsed.data.slot_start, slot_end: parsed.data.slot_end }),
      created_at: now,
    });

    return NextResponse.json({ success: true, final_url: `/e/${eventId}/final` });
  } catch (err) {
    console.error("Finalize event error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
