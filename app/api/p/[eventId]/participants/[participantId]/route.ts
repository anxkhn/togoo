import {
  PUT as updateParticipant,
  DELETE as deleteParticipant,
} from "../../../../events/[eventId]/participants/[participantId]/route";

export async function PUT(...args: Parameters<typeof updateParticipant>) {
  return updateParticipant(...args);
}

export async function DELETE(...args: Parameters<typeof deleteParticipant>) {
  return deleteParticipant(...args);
}
