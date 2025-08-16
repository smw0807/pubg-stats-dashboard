import { ErrorResponse, SearchParams } from '~/models';
import { RecentMatches } from '~/models/recentMatches';

export const fetchRecentMatchStats = async ({
  platform,
  playerName,
}: SearchParams): Promise<RecentMatches | ErrorResponse> => {
  const res = await fetch(
    `${
      process.env.API_URL
    }/stats/recent?platform=${platform}&playerName=${encodeURIComponent(
      playerName
    )}`
  );
  return res.json();
};
