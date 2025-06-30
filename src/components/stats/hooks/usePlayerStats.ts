import { useQuery } from '@tanstack/react-query';
import type { RankedGameModeStats } from '~/models/playerStats';
import { SearchParams } from '~/models';

const fetchPlayerRankStats = async ({
  platform,
  playerName,
}: SearchParams): Promise<RankedGameModeStats> => {
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

const fetchPlayerStats = async ({
  platform,
  playerName,
}: SearchParams): Promise<RankedGameModeStats> => {
  const res = await fetch(
    `/api/stats/normal?platform=${platform}&playerName=${encodeURIComponent(
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
    queryKey: ['playerRankStats', platform, playerName],
    queryFn: () => fetchPlayerRankStats({ platform, playerName }),
    enabled: !!platform && !!playerName,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const usePlayerStats = (platform: string, playerName: string) => {
  return useQuery({
    queryKey: ['playerStats', platform, playerName],
    queryFn: () => fetchPlayerStats({ platform, playerName }),
    enabled: !!platform && !!playerName,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
