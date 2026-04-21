import { GET as getEvent, PUT as updateEvent } from "../../events/[eventId]/route";

export async function GET(...args: Parameters<typeof getEvent>) {
  return getEvent(...args);
}

export async function PUT(...args: Parameters<typeof updateEvent>) {
  return updateEvent(...args);
}
