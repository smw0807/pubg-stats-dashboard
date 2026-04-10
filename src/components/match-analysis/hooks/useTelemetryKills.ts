import { useQuery } from '@tanstack/react-query';
import { KillLogData } from '~/models/telemetry';

const fetchKillLog = async (
  platform: string,
  matchId: string,
  playerName?: string
): Promise<KillLogData> => {
  const params = new URLSearchParams({ platform, matchId });
  if (playerName) params.append('playerName', playerName);

  const res = await fetch(`/api/telemetry/kills?${params.toString()}`);
  if (!res.ok) {
    throw new Error('킬 로그 데이터를 불러올 수 없습니다.');
  }
  return res.json();
};

export const useTelemetryKills = (
  platform: string,
  matchId: string,
  playerName?: string
) => {
  return useQuery({
    queryKey: ['telemetry', 'kills', platform, matchId, playerName],
    queryFn: () => fetchKillLog(platform, matchId, playerName),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5,
  });
};
