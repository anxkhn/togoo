import { POST as createEvent } from "../events/route";

export async function POST(...args: Parameters<typeof createEvent>) {
  return createEvent(...args);
}
