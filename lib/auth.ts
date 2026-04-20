import { and, eq } from "drizzle-orm";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { isTokenExpired } from "@/lib/tokens";

type DB = ReturnType<typeof getDB>;
type InviteRole = "organizer" | "participant";

export async function findActiveInviteToken(
  db: DB,
  token: string | null,
  options: { eventId?: string; role?: InviteRole } = {}
) {
  if (!token) return null;

  const clauses = [eq(schema.invite_tokens.token, token), eq(schema.invite_tokens.is_active, 1)];

  if (options.eventId) {
    clauses.push(eq(schema.invite_tokens.event_id, options.eventId));
  }

  if (options.role) {
    clauses.push(eq(schema.invite_tokens.role, options.role));
  }

  const tokenRecord = await db.query.invite_tokens.findFirst({
    where: and(...clauses),
  });

  if (!tokenRecord || isTokenExpired(tokenRecord.expires_at)) {
    return null;
  }

  return tokenRecord;
}

export async function findOrganizerInviteToken(db: DB, eventId: string, token: string | null) {
  return findActiveInviteToken(db, token, { eventId, role: "organizer" });
}

export async function findParticipantInviteToken(db: DB, eventId: string, token: string | null) {
  return findActiveInviteToken(db, token, { eventId, role: "participant" });
}
