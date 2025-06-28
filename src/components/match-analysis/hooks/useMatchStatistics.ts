import { useQuery } from '@tanstack/react-query';
import { MatchStatistics } from '~/models/matchStatistics';

const fetchMatchStatistics = async (
  platform: string,
  matchId: string
): Promise<MatchStatistics> => {
  const res = await fetch(
    `/api/matches/statistics?platform=${platform}&matchId=${encodeURIComponent(
      matchId
    )}`
  );

  if (!res.ok) {
    throw new Error('매치 통계 정보를 찾을 수 없습니다.');
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
