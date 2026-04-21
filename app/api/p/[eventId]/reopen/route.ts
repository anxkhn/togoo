import { POST as reopenEvent } from "../../../events/[eventId]/reopen/route";

export async function POST(...args: Parameters<typeof reopenEvent>) {
  return reopenEvent(...args);
}
