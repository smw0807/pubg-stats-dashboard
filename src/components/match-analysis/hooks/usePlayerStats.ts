import { useQuery } from '@tanstack/react-query';
import { PlayerStatsData } from '~/models';

const fetchPlayerStats = async (
  platform: string,
  matchId: string
): Promise<PlayerStatsData> => {
  const res = await fetch(
    `/api/matches/players?platform=${platform}&matchId=${encodeURIComponent(
      matchId
    )}`
  );

  if (!res.ok) {
    throw new Error('플레이어 통계 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const usePlayerStats = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['playerStats', platform, matchId],
    queryFn: () => fetchPlayerStats(platform, matchId),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
