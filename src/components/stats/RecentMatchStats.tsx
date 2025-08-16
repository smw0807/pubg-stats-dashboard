import { fetchRecentMatchStats } from './hooks/useRecentMatchStats';
import ErrorState from './recent-matches/ErrorState';
import EmptyState from './recent-matches/EmptyState';
import MatchCard from './recent-matches/MatchCard';
import { SearchParams } from '~/models';

export default async function RecentMatchStats({
  platform,
  playerName,
}: SearchParams) {
  const recentMatches = await fetchRecentMatchStats({ platform, playerName });
  if (recentMatches && 'statusCode' in recentMatches) {
    return <ErrorState error={recentMatches.message} />;
  }

  if (!recentMatches || recentMatches.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        최근 매치
      </h2>
      <div className="space-y-4">
        {recentMatches.map((match, index) => {
          if (!match) return null;
          return (
            <MatchCard
              key={`${match.matchId}-${index}`}
              match={match}
              index={index}
              platform={platform}
              playerName={playerName}
            />
          );
        })}
      </div>
    </div>
  );
}
