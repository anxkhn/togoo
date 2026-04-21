import { POST as submitResponse } from "../../../events/[eventId]/respond/route";

export async function POST(...args: Parameters<typeof submitResponse>) {
  return submitResponse(...args);
}
