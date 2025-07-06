import { useRouter } from 'next/navigation';
import type { RecentMatch } from '~/models/recentMatches';
import MatchHeader from './MatchHeader';
import PerformanceStats from './PerformanceStats';
import DetailedStats from './DetailedStats';
import TeamStats from './TeamStats';

interface MatchCardProps {
  match: RecentMatch;
  index: number;
  platform: string;
  playerName: string;
}

export default function MatchCard({
  match,
  index,
  platform,
  playerName,
}: MatchCardProps) {
  const router = useRouter();

  const handleAnalyze = () => {
    router.push(`/match/${platform}/${playerName}/${match.matchId}`);
  };

  return (
    <div
      key={`${match.matchId}-${index}`}
      className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700"
    >
      <MatchHeader
        gameMode={match.gameMode}
        mapName={match.mapName}
        rank={match.team.rank}
        won={match.team.won}
        matchDate={match.matchDate}
      />

      <PerformanceStats
        kills={match.performance.kills}
        assists={match.performance.assists}
        damage={match.performance.damage}
        survivalTime={match.performance.survivalTime}
      />

      <DetailedStats
        headshotKills={match.performance.headshotKills}
        longestKill={match.performance.longestKill}
        killStreaks={match.performance.killStreaks}
        totalDistance={match.movement.totalDistance}
        boosts={match.items.boosts}
        weaponsAcquired={match.items.weaponsAcquired}
      />

      <TeamStats
        teamId={match.team.teamId}
        revives={match.team.revives}
        DBNOs={match.team.DBNOs}
        teamKills={match.team.teamKills}
      />

      {/* 분석 버튼 */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 shadow-sm hover:shadow-md"
        >
          📊 매치 분석
        </button>
      </div>
    </div>
  );
}
