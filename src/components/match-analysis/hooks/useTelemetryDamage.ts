import { useQuery } from '@tanstack/react-query';
import { DamageLogData } from '~/models/telemetry';

const fetchDamageLog = async (
  platform: string,
  matchId: string,
  playerName?: string
): Promise<DamageLogData> => {
  const params = new URLSearchParams({ platform, matchId });
  if (playerName) params.append('playerName', playerName);

  const res = await fetch(`/api/telemetry/damage?${params.toString()}`);
  if (!res.ok) {
    throw new Error('데미지 로그 데이터를 불러올 수 없습니다.');
  }
  return res.json();
};

export const useTelemetryDamage = (
  platform: string,
  matchId: string,
  playerName?: string
) => {
  return useQuery({
    queryKey: ['telemetry', 'damage', platform, matchId, playerName],
    queryFn: () => fetchDamageLog(platform, matchId, playerName),
    enabled: !!platform && !!matchId,
    staleTime: 1000 * 60 * 5,
  });
};
