import { useQuery } from '@tanstack/react-query';
import { MovementLogData } from '~/models/telemetry';

const fetchMovementLog = async (
  platform: string,
  matchId: string,
  playerName?: string
): Promise<MovementLogData> => {
  const params = new URLSearchParams({ platform, matchId });
  if (playerName) params.append('playerName', playerName);

  const res = await fetch(`/api/telemetry/movement?${params.toString()}`);
  if (!res.ok) {
    throw new Error('이동 경로 데이터를 불러올 수 없습니다.');
  }
  return res.json();
};

export const useTelemetryMovement = (
  platform: string,
  matchId: string,
  playerName?: string
) => {
  return useQuery({
    queryKey: ['telemetry', 'movement', platform, matchId, playerName],
    queryFn: () => fetchMovementLog(platform, matchId, playerName),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5,
  });
};
