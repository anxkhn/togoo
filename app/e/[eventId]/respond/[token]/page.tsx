import { redirect } from "next/navigation";

export default async function LegacyRespondPage({
  params,
}: {
  params: Promise<{ eventId: string; token: string }>;
}) {
  const { token } = await params;
  redirect(`/r/${token}`);
}
