import { POST as finalizeEvent } from "../../../events/[eventId]/finalize/route";

export async function POST(...args: Parameters<typeof finalizeEvent>) {
  return finalizeEvent(...args);
}
