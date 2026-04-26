import type { ErrorResponse, SearchParams } from '~/models';
import type { RankedGameModeStats } from '~/models/playerStats';
import type { RecentMatches } from '~/models/recentMatches';

const buildApiUrl = (path: string, params: Record<string, string>) => {
  const query = new URLSearchParams(params);
  return `${process.env.API_URL}${path}?${query.toString()}`;
};

export const fetchPlayerRankStats = async ({
  platform,
  playerName,
}: SearchParams): Promise<RankedGameModeStats | ErrorResponse> => {
  const res = await fetch(
    buildApiUrl('/stats/rank', {
      platform,
      playerName,
    })
  );

  return res.json();
};

export const fetchPlayerStats = async ({
  platform,
  playerName,
}: SearchParams): Promise<RankedGameModeStats> => {
  const res = await fetch(
    buildApiUrl('/stats/normal', {
      platform,
      playerName,
    })
  );

  if (!res.ok) {
    throw new Error('플레이어 정보를 찾을 수 없습니다.');
  }

  return res.json();
};

export const fetchRecentMatchStats = async ({
  platform,
  playerName,
}: SearchParams): Promise<RecentMatches | ErrorResponse> => {
  const res = await fetch(
    buildApiUrl('/stats/recent', {
      platform,
      playerName,
    })
  );

  return res.json();
};
