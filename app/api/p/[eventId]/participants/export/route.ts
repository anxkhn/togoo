import { GET as exportParticipants } from "../../../../events/[eventId]/participants/export/route";

export async function GET(...args: Parameters<typeof exportParticipants>) {
  return exportParticipants(...args);
}
