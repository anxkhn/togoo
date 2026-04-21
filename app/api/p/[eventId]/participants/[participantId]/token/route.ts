import { POST as regenerateParticipantToken } from "../../../../../events/[eventId]/participants/[participantId]/token/route";

export async function POST(...args: Parameters<typeof regenerateParticipantToken>) {
  return regenerateParticipantToken(...args);
}
