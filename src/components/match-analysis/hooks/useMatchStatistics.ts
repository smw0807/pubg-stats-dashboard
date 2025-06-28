import { useQuery } from '@tanstack/react-query';
import { KillLeaderboardData } from '~/models/killLeaderboard';

const fetchMatchStatistics = async (
  platform: string,
  matchId: string
): Promise<KillLeaderboardData> => {
  const res = await fetch(
    `/api/matches/statistics?platform=${platform}&matchId=${encodeURIComponent(
      matchId
    )}`
  );

  if (!res.ok) {
    throw new Error('최다 킬 플레이어 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const useMatchStatistics = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['matchStatistics', platform, matchId],
    queryFn: () => fetchMatchStatistics(platform, matchId),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
};
