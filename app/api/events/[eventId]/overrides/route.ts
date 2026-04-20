import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq, and } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { generateId } from "@/lib/tokens";
import { OrganizerOverrideSchema } from "@/lib/validation";
import { unixNow } from "@/lib/utils";

export async function GET(
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

    const overrides = await db
      .select()
      .from(schema.organizer_overrides)
      .where(eq(schema.organizer_overrides.event_id, eventId));

    return NextResponse.json({ overrides });
  } catch (err) {
    console.error("Get overrides error:", err);
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
    const parsed = OrganizerOverrideSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const now = unixNow();
    const overrideId = generateId();

    await db.insert(schema.organizer_overrides).values({
      id: overrideId,
      event_id: eventId,
      organizer_participant_id: tokenRecord.participant_id,
      override_type: parsed.data.override_type,
      data: JSON.stringify(parsed.data.data),
      created_at: now,
    });

    await db.insert(schema.activity_log).values({
      id: generateId(),
      event_id: eventId,
      actor_id: tokenRecord.participant_id,
      action: "override_added",
      data: JSON.stringify({ override_id: overrideId, type: parsed.data.override_type }),
      created_at: now,
    });

    return NextResponse.json({ success: true, override_id: overrideId });
  } catch (err) {
    console.error("Add override error:", err);
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
    const { override_id } = await request.json();
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
      .delete(schema.organizer_overrides)
      .where(
        and(
          eq(schema.organizer_overrides.id, override_id),
          eq(schema.organizer_overrides.event_id, eventId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete override error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
