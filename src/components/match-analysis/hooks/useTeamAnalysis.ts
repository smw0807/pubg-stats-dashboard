import { useQuery } from '@tanstack/react-query';
import { TeamAnalysisData } from '~/models/teamAnalysis';

const fetchTeamAnalysis = async (
  platform: string,
  matchId: string
): Promise<TeamAnalysisData> => {
  const res = await fetch(
    `/api/matches/analysis/teams?platform=${platform}&matchId=${encodeURIComponent(
      matchId
    )}`
  );

  if (!res.ok) {
    throw new Error('최다 데미지 플레이어 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const useTeamAnalysis = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['teamAnalysis', platform, matchId],
    queryFn: () => fetchTeamAnalysis(platform, matchId),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
};
