import { useQuery } from '@tanstack/react-query';
import { TeamRankData } from '~/models/teamRank';

const fetchTeamRank = async (
  platform: string,
  matchId: string
): Promise<TeamRankData> => {
  const res = await fetch(
    `/api/matches/teams?platform=${platform}&matchId=${encodeURIComponent(
      matchId
    )}`
  );

  if (!res.ok) {
    throw new Error('팀 순위 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const useTeamRank = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['teamRank', platform, matchId],
    queryFn: () => fetchTeamRank(platform, matchId),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
