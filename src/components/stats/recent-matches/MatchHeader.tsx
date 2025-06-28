import {
  getGameModeDisplayName,
  getMapDisplayName,
  getPlaceColor,
} from '~/utils/matchUtils';

interface MatchHeaderProps {
  gameMode: string;
  mapName: string;
  matchId: string;
  rank: number;
  won: string;
}

export default function MatchHeader({
  gameMode,
  mapName,
  matchId,
  rank,
  won,
}: MatchHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-semibold text-gray-800">
          {getGameModeDisplayName(gameMode)} - {getMapDisplayName(mapName)}
        </h3>
        <p className="text-sm text-gray-500">{matchId.slice(0, 8)}...</p>
      </div>
      <div className="text-right">
        <span className={`text-lg ${getPlaceColor(rank)}`}>{rank}위</span>
        {won === 'true' && (
          <div className="text-yellow-600 font-bold text-sm">승리!</div>
        )}
      </div>
    </div>
  );
}
