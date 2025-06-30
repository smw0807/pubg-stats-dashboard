import { useQuery } from '@tanstack/react-query';
import { PlayerPerformanceAnalysis } from '~/models/playerPerformance';

const fetchPlayerPerformance = async (
  platform: string,
  matchId: string
): Promise<PlayerPerformanceAnalysis[]> => {
  const res = await fetch(
    `/api/matches/analysis/performance?platform=${platform}&matchId=${encodeURIComponent(
      matchId
    )}`
  );

  if (!res.ok) {
    throw new Error('플레이어 성과 분석 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const usePlayerPerformance = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['playerPerformance', platform, matchId],
    queryFn: () => fetchPlayerPerformance(platform, matchId),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
