import * as schema from "./db/schema";
import type { DB } from "./db";
import { generateId } from "./tokens";

const NORMALIZED_SLOT_BATCH_SIZE = 10;

export interface NormalizedSlotRowInput {
  participant_id: string;
  slot_start: number;
  slot_end: number;
}

export async function insertNormalizedSlots(
  db: DB,
  eventId: string,
  slots: NormalizedSlotRowInput[],
  createdAt: number
): Promise<void> {
  for (let index = 0; index < slots.length; index += NORMALIZED_SLOT_BATCH_SIZE) {
    const batch = slots.slice(index, index + NORMALIZED_SLOT_BATCH_SIZE);
    await db.insert(schema.normalized_slots).values(
      batch.map((slot) => ({
        id: generateId(),
        event_id: eventId,
        participant_id: slot.participant_id,
        slot_start: slot.slot_start,
        slot_end: slot.slot_end,
        created_at: createdAt,
      }))
    );
  }
}
