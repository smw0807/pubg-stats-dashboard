import PlayerStats from '~/components/stats/PlayerStats';
import RecentMatchStats from '~/components/stats/RecentMatchStats';

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ platform: string; playerName: string }>;
}) {
  const { platform, playerName } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div>
        <PlayerStats playerName={playerName} platform={platform} />
      </div>

      {/* 최근 매치 통계 */}
      <div className="mx-auto px-4 pb-8">
        <RecentMatchStats platform={platform} playerName={playerName} />
      </div>
    </div>
  );
}
