import MasteryPageClient from "~/components/mastery/MasteryPageClient";

export default async function MasteryPage({
  params,
}: {
  params: Promise<{ platform: string; playerName: string }>;
}) {
  const { platform, playerName } = await params;

  return <MasteryPageClient platform={platform} playerName={playerName} />;
}
