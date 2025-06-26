import { useQuery } from '@tanstack/react-query';

const fetchMatchSummary = async ({
  platform,
  matchId,
}: {
  platform: string;
  matchId: string;
}) => {
  const res = await fetch(
    `/api/matches/summary?platform=${platform}&matchId=${matchId}`
  );

  if (!res.ok) {
    throw new Error('매치 요약 정보를 불러올 수 없습니다.');
  }

  return res.json();
};

export const useMatchSummary = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['matchSummary', platform, matchId],
    queryFn: () => fetchMatchSummary({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
};
