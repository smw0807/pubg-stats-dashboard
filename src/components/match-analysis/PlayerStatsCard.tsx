import { useEffect } from 'react';
import AnalysisCard from './AnalysisCard';
import { PlayerStatsData } from '~/models/playerStats';
import {
  getRankColor,
  getRankIcon,
  formatDistance,
  formatTime,
} from '~/utils/matchUtils';
import { usePlayerStats } from '~/features/match-analysis/queries';
import PlayerNameClick from './PlayerNameClick';

export default function PlayerStatsCard({
  platform,
  matchId,
  playerName,
  setIsLoading,
}: {
  platform: string;
  matchId: string;
  playerName: string;
  setIsLoading: (isLoading: boolean) => void;
}) {
  const {
    data: playerStats,
    isLoading,
    error,
  } = usePlayerStats(platform ?? '', matchId ?? '');

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const handleCardClick = () => {
    // 플레이어 통계 데이터가 로드되면 자동으로 표시됨
  };

  const renderSelectedCardContent = (playerStats: PlayerStatsData) => {
    if (playerStats.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            플레이어 통계 정보가 없습니다.
          </p>
        </div>
      );
    }

    // 순위별로 정렬
    const sortedPlayers = [...playerStats].sort(
      (a, b) => a.winPlace - b.winPlace
    );

    return (
      <div className="space-y-6">
        {/* 상위 3명 플레이어 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            우승 팀
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedPlayers.slice(0, 4).map((player) => (
              <div
                key={player.playerId}
                className={`border rounded-lg p-4 transition-colors duration-200
                  ${
                    player.winPlace === 1
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600'
                      : player.winPlace === 2
                      ? 'border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600'
                      : 'border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-600'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg ${
                        player.winPlace === 1
                          ? 'bg-yellow-500'
                          : player.winPlace === 2
                          ? 'bg-gray-500 dark:bg-gray-600'
                          : 'bg-orange-500'
                      }`}
                    >
                      {getRankIcon(player.winPlace)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        <PlayerNameClick
                          platform={platform}
                          playerName={player.name}
                          isMine={player.name === playerName}
                        />
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {player.kills}킬 {player.assists}어시스트
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">
                      데미지
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {Math.round(player.damage)}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">
                      생존 시간
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {formatTime(player.survivalTime)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 전체 플레이어 목록 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">👥</span>
            전체 플레이어 ({playerStats.length}명)
          </h3>
          <div className="space-y-3 overflow-y-auto">
            {sortedPlayers.map((player) => (
              <div
                key={player.playerId}
                className={`border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                  ${
                    player.name === playerName
                      ? 'border-red-600 dark:border-red-500 border-2'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${getRankColor(
                        player.winPlace
                      )}`}
                    >
                      {player.winPlace}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        <PlayerNameClick
                          platform={platform}
                          playerName={player.name}
                          isMine={player.name === playerName}
                        />
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        킬: {player.kills} | 어시스트: {player.assists} |
                        헤드샷: {player.headshotKills}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <div>데미지: {Math.round(player.damage)}</div>
                      <div>킬 순위: {player.killPlace}</div>
                    </div>
                  </div>
                </div>

                {/* 상세 통계 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">
                      생존 시간
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {formatTime(player.survivalTime)}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">
                      이동 거리
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {formatDistance(player.distance.total)}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">
                      아이템
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      부스트: {player.items.boosts} | 힐: {player.items.heals}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">성과</div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      리바이브: {player.performance.revives} | DBNO:{' '}
                      {player.performance.DBNOs}
                    </div>
                  </div>
                </div>

                {/* 이동 거리 상세 */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2 text-center">
                    <div className="text-blue-600 dark:text-blue-400">
                      🚶 도보
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatDistance(player.distance.walk)}
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2 text-center">
                    <div className="text-green-600 dark:text-green-400">
                      🚗 탈것
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatDistance(player.distance.ride)}
                    </div>
                  </div>
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded p-2 text-center">
                    <div className="text-cyan-600 dark:text-cyan-400">
                      🏊 수영
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatDistance(player.distance.swim)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnalysisCard
      title="플레이어 통계"
      icon="👤"
      description="매치 참가자들의 상세한 통계를 확인하세요"
      onClick={handleCardClick}
      isLoading={isLoading}
      hasData={!!playerStats && playerStats.length > 0}
    >
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500 dark:text-red-400">
            플레이어 통계 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        playerStats && renderSelectedCardContent(playerStats)
      )}
    </AnalysisCard>
  );
}
