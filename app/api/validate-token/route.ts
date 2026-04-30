import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { eq, and } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { findActiveInviteToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) return NextResponse.json({ valid: false }, { status: 400 });

    const db = getDB((env as unknown as { DB: D1Database }).DB);

    const tokenRecord = await findActiveInviteToken(db, token);

    if (!tokenRecord) return NextResponse.json({ valid: false }, { status: 401 });

    const event = await db.query.events.findFirst({
      where: eq(schema.events.id, tokenRecord.event_id),
    });

    const participant = await db.query.participants.findFirst({
      where: eq(schema.participants.id, tokenRecord.participant_id),
    });

    const existingPrefs = await db.query.participant_preferences.findFirst({
      where: and(
        eq(schema.participant_preferences.participant_id, tokenRecord.participant_id),
        eq(schema.participant_preferences.event_id, tokenRecord.event_id)
      ),
    });

    const existingWindows = await db
      .select()
      .from(schema.availability_windows)
      .where(
        and(
          eq(schema.availability_windows.participant_id, tokenRecord.participant_id),
          eq(schema.availability_windows.event_id, tokenRecord.event_id)
        )
      );

    const finalSelection = await db.query.final_selections.findFirst({
      where: eq(schema.final_selections.event_id, tokenRecord.event_id),
    });

    return NextResponse.json({
      valid: true,
      role: tokenRecord.role,
      event_id: tokenRecord.event_id,
      participant_id: tokenRecord.participant_id,
      event,
      participant,
      existing_windows: existingWindows,
      existing_preferences: existingPrefs ?? null,
      final_selection: finalSelection ?? null,
    });
  } catch (err) {
    console.error("Validate token error:", err);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
