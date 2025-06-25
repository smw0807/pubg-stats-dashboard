import { useQuery } from '@tanstack/react-query';
import type { RankedGameModeStats } from '~/models/playerStats';

interface PlayerStatsParams {
  platform: string;
  playerName: string;
}

const fetchPlayerRankStats = async ({
  platform,
  playerName,
}: PlayerStatsParams): Promise<RankedGameModeStats> => {
  const res = await fetch(
    `/api/stats/rank?platform=${platform}&playerName=${encodeURIComponent(
      playerName
    )}`
  );

  if (!res.ok) {
    throw new Error('플레이어 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const usePlayerRankStats = (platform: string, playerName: string) => {
  return useQuery({
    queryKey: ['playerStats', platform, playerName],
    queryFn: () => fetchPlayerRankStats({ platform, playerName }),
    enabled: !!platform && !!playerName,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
};
