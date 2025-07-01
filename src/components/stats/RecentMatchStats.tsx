'use client';

import { useRecentMatchStats } from './hooks/useRecentMatchStats';
import LoadingState from './recent-matches/LoadingState';
import ErrorState from './recent-matches/ErrorState';
import EmptyState from './recent-matches/EmptyState';
import MatchCard from './recent-matches/MatchCard';

interface RecentMatchStatsProps {
  platform: string;
  playerName: string;
}

export default function RecentMatchStats({
  platform,
  playerName,
}: RecentMatchStatsProps) {
  const {
    data: recentMatches,
    isLoading,
    error,
  } = useRecentMatchStats(platform, playerName);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!recentMatches || recentMatches.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">최근 매치</h2>
      <div className="space-y-4">
        {recentMatches.map((match, index) => {
          if (!match) return null;
          return (
            <MatchCard
              key={`${match.matchId}-${index}`}
              match={match}
              index={index}
              platform={platform}
            />
          );
        })}
      </div>
    </div>
  );
}
