import { GET as getRecommendations } from "../../../events/[eventId]/recommendations/route";

export async function GET(...args: Parameters<typeof getRecommendations>) {
  return getRecommendations(...args);
}
