import { useQuery } from '@tanstack/react-query';
import { SearchParams } from '~/models';
import { RecentMatches } from '~/models/recentMatches';

const fetchRecentMatchStats = async ({
  platform,
  playerName,
}: SearchParams): Promise<RecentMatches> => {
  const res = await fetch(
    `/api/stats/recent?platform=${platform}&playerName=${encodeURIComponent(
      playerName
    )}`
  );

  if (!res.ok) {
    throw new Error('최근 게임 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const useRecentMatchStats = (platform: string, playerName: string) => {
  return useQuery({
    queryKey: ['recentMatchStats', platform, playerName],
    queryFn: () => fetchRecentMatchStats({ platform, playerName }),
    enabled: !!platform && !!playerName,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
