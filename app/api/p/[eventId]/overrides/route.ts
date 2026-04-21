import {
  GET as listOverrides,
  POST as addOverride,
  DELETE as deleteOverride,
} from "../../../events/[eventId]/overrides/route";

export async function GET(...args: Parameters<typeof listOverrides>) {
  return listOverrides(...args);
}

export async function POST(...args: Parameters<typeof addOverride>) {
  return addOverride(...args);
}

export async function DELETE(...args: Parameters<typeof deleteOverride>) {
  return deleteOverride(...args);
}
