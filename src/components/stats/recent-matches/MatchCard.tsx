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
}

export default function MatchCard({ match, index, platform }: MatchCardProps) {
  const router = useRouter();

  const handleAnalyze = () => {
    router.push(`/match/${platform}/${match.matchId}`);
  };

  return (
    <div
      key={`${match.matchId}-${index}`}
      className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <MatchHeader
        gameMode={match.gameMode}
        mapName={match.mapName}
        matchId={match.matchId}
        rank={match.team.rank}
        won={match.team.won}
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
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 shadow-sm hover:shadow-md"
        >
          📊 매치 분석
        </button>
      </div>
    </div>
  );
}
