import {
  getGameModeDisplayName,
  getMapDisplayName,
  getPlaceColor,
} from '~/utils/matchUtils';

interface MatchHeaderProps {
  gameMode: string;
  mapName: string;
  rank: number;
  won: string;
  matchDate: string;
}

export default function MatchHeader({
  gameMode,
  mapName,
  rank,
  won,
  matchDate,
}: MatchHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
          {getGameModeDisplayName(gameMode)} - {getMapDisplayName(mapName)}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(matchDate).toLocaleString()}
        </p>
      </div>
      <div className="text-right">
        <span className={`text-lg ${getPlaceColor(rank)}`}>{rank}위</span>
        {won === 'true' && (
          <div className="text-yellow-600 dark:text-yellow-400 font-bold text-sm">
            승리!
          </div>
        )}
      </div>
    </div>
  );
}
