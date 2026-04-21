import {
  GET as listParticipants,
  POST as addParticipant,
} from "../../../events/[eventId]/participants/route";

export async function GET(...args: Parameters<typeof listParticipants>) {
  return listParticipants(...args);
}

export async function POST(...args: Parameters<typeof addParticipant>) {
  return addParticipant(...args);
}
