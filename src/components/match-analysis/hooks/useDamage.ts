import { useQuery } from '@tanstack/react-query';
import { DamageLeaderboardData } from '~/models/damageLeaderboard';

const fetchDamage = async (
  platform: string,
  matchId: string
): Promise<DamageLeaderboardData> => {
  const res = await fetch(
    `/api/matches/leaderboard/damage?platform=${platform}&matchId=${encodeURIComponent(
      matchId
    )}`
  );

  if (!res.ok) {
    throw new Error('최다 데미지 플레이어 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const useDamage = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['damage', platform, matchId],
    queryFn: () => fetchDamage(platform, matchId),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
};
