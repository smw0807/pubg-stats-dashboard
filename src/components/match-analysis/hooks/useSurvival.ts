import { useQuery } from '@tanstack/react-query';
import { SurvivalLeaderboardData } from '~/models/survivalLeaderboard';

const fetchSurvival = async (
  platform: string,
  matchId: string
): Promise<SurvivalLeaderboardData> => {
  const res = await fetch(
    `/api/matches/leaderboard/survival?platform=${platform}&matchId=${encodeURIComponent(
      matchId
    )}`
  );

  if (!res.ok) {
    throw new Error('최다 생존 플레이어 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const useSurvival = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['survival', platform, matchId],
    queryFn: () => fetchSurvival(platform, matchId),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
