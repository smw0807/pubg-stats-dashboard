import { useQuery } from '@tanstack/react-query';
import { GroggyLogData } from '~/models/telemetry';

const fetchGroggyLog = async (
  platform: string,
  matchId: string,
  playerName?: string
): Promise<GroggyLogData> => {
  const params = new URLSearchParams({ platform, matchId });
  if (playerName) params.append('playerName', playerName);

  const res = await fetch(`/api/telemetry/groggy?${params.toString()}`);
  if (!res.ok) {
    throw new Error('기절 로그 데이터를 불러올 수 없습니다.');
  }
  return res.json();
};

export const useTelemetryGroggy = (
  platform: string,
  matchId: string,
  playerName?: string
) => {
  return useQuery({
    queryKey: ['telemetry', 'groggy', platform, matchId, playerName],
    queryFn: () => fetchGroggyLog(platform, matchId, playerName),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5,
  });
};
