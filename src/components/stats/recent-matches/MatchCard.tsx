import type { RecentMatch } from '~/models/recentMatches';
import MatchHeader from './MatchHeader';
import PerformanceStats from './PerformanceStats';
import DetailedStats from './DetailedStats';
import TeamStats from './TeamStats';

interface MatchCardProps {
  match: RecentMatch;
  index: number;
}

export default function MatchCard({ match, index }: MatchCardProps) {
  return (
    <div
      key={`${match.matchId}-${index}`}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
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
    </div>
  );
}
