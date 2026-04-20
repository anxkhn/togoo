import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const db = getDB((env as unknown as { DB: D1Database }).DB);

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

    return NextResponse.json({
      event,
      stats: {
        total_invited: total,
        total_responded: responded,
        pending: total - responded,
      },
    });
  } catch (err) {
    console.error("Get event error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
