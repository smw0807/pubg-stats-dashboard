import type { RankedGameModeStats } from '~/models/playerStats';
import { ErrorResponse, SearchParams } from '~/models';

export const fetchPlayerRankStats = async ({
  platform,
  playerName,
}: SearchParams): Promise<RankedGameModeStats | ErrorResponse> => {
  const res = await fetch(
    `${
      process.env.API_URL
    }/stats/rank?platform=${platform}&playerName=${encodeURIComponent(
      playerName
    )}`
  );

  return res.json();
};

export const fetchPlayerStats = async ({
  platform,
  playerName,
}: SearchParams): Promise<RankedGameModeStats> => {
  const res = await fetch(
    `${
      process.env.API_URL
    }/stats/normal?platform=${platform}&playerName=${encodeURIComponent(
      playerName
    )}`
  );

  if (!res.ok) {
    throw new Error('플레이어 정보를 찾을 수 없습니다.');
  }

  return res.json();
};
