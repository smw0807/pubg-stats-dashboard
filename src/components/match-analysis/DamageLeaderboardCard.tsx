import { useEffect } from 'react';
import AnalysisCard from './AnalysisCard';
import { DamageLeaderboardData } from '~/models/damageLeaderboard';
import { getRankColor, getRankIcon } from '~/utils/matchUtils';
import { useDamage } from '~/features/match-analysis/queries';
import PlayerNameClick from './PlayerNameClick';

export default function DamageLeaderboardCard({
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
    data: damageLeaderboard,
    isLoading,
    error,
  } = useDamage(platform ?? '', matchId ?? '');

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const handleCardClick = () => {
    // 데미지 리더보드 데이터가 로드되면 자동으로 표시됨
  };

  const renderSelectedCardContent = (
    damageLeaderboard: DamageLeaderboardData
  ) => {
    if (damageLeaderboard.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            데미지 리더보드 정보가 없습니다.
          </p>
        </div>
      );
    }

    // 데미지 기준 내림차순 정렬
    const sortedLeaderboard = [...damageLeaderboard].sort(
      (a, b) => b.damage - a.damage
    );

    return (
      <div className="space-y-6">
        {/* 상위 3명 데미지 딜러 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">💥</span>
            데미지 마스터
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedLeaderboard.slice(0, 3).map((player, index) => (
              <div
                key={`${player.name}-${index}`}
                className={`border rounded-lg p-4 transition-colors duration-200
                  ${
                    index === 0
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600'
                      : index === 1
                      ? 'border-gray-300 bg-gray-50 dark:bg-gray-600 dark:border-gray-400'
                      : 'border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-600'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg ${getRankColor(
                        index + 1
                      )}`}
                    >
                      {getRankIcon(index + 1)}
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
                        최종 순위: {player.winPlace}위
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">
                      데미지
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                      {Math.round(player.damage)}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">킬</div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {player.kills}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                  헤드샷: {player.headshotKills}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 전체 데미지 리더보드 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            데미지 리더보드 ({damageLeaderboard.length}명)
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sortedLeaderboard.map((player, index) => (
              <div
                key={`${player.name}-${index}`}
                className={`border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                  ${
                    index < 3
                      ? 'border-2'
                      : 'border-gray-200 dark:border-gray-600'
                  }
                  ${
                    player.name === playerName
                      ? 'border-red-600 dark:border-red-500 border-2'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${getRankColor(
                        index + 1
                      )}`}
                    >
                      {index + 1}
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
                        최종 순위: {player.winPlace}위
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {Math.round(player.damage)} 데미지
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      킬: {player.kills}
                    </div>
                  </div>
                </div>

                {/* 상세 정보 */}
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2 text-center">
                    <div className="text-green-600 dark:text-green-400">
                      🎯 헤드샷
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {player.headshotKills}
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2 text-center">
                    <div className="text-purple-600 dark:text-purple-400">
                      🏆 순위
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {player.winPlace}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 통계 요약 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            통계 요약
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(sortedLeaderboard[0]?.damage || 0)}
              </div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                최고 데미지
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                {sortedLeaderboard[0]?.name || 'N/A'}
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {sortedLeaderboard.reduce(
                  (sum, player) => sum + player.kills,
                  0
                )}
              </div>
              <div className="text-sm font-medium text-red-700 dark:text-red-300">
                총 킬
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                전체 플레이어
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {sortedLeaderboard.reduce(
                  (sum, player) => sum + player.headshotKills,
                  0
                )}
              </div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                총 헤드샷
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                전체 플레이어
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(
                  sortedLeaderboard.reduce(
                    (sum, player) => sum + player.damage,
                    0
                  ) / sortedLeaderboard.length
                )}
              </div>
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                평균 데미지
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                전체 플레이어
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnalysisCard
      title="데미지 리더보드"
      icon="💥"
      description="매치에서 가장 많은 데미지를 기록한 플레이어들을 확인하세요"
      onClick={handleCardClick}
      isLoading={isLoading}
      hasData={!!damageLeaderboard && damageLeaderboard.length > 0}
    >
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500 dark:text-red-400">
            데미지 리더보드 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        damageLeaderboard && renderSelectedCardContent(damageLeaderboard)
      )}
    </AnalysisCard>
  );
}
