import AnalysisCard from './AnalysisCard';
import { KillLeaderboardData } from '~/models/killLeaderboard';
import { getRankColor, getRankIcon } from '~/utils/matchUtils';

interface KillLeaderboardCardProps {
  killLeaderboard: KillLeaderboardData;
  isLoading?: boolean;
  error?: string | null;
}

export default function KillLeaderboardCard({
  killLeaderboard,
  isLoading = false,
  error = null,
}: KillLeaderboardCardProps) {
  const handleCardClick = () => {
    // 킬 리더보드 데이터가 로드되면 자동으로 표시됨
  };

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${Math.round(meters)}m`;
  };

  const renderSelectedCardContent = (killLeaderboard: KillLeaderboardData) => {
    if (killLeaderboard.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">킬 리더보드 정보가 없습니다.</p>
        </div>
      );
    }

    // 킬 수로 정렬 (내림차순)
    const sortedLeaderboard = [...killLeaderboard].sort(
      (a, b) => b.kills - a.kills
    );

    return (
      <div className="space-y-6">
        {/* 상위 3명 킬러 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🔫</span>킬 마스터
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedLeaderboard.slice(0, 3).map((player, index) => (
              <div
                key={`${player.name}-${index}`}
                className={`border rounded-lg p-4 ${
                  index === 0
                    ? 'border-yellow-400 bg-yellow-50'
                    : index === 1
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-orange-300 bg-orange-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg ${
                        index === 0
                          ? 'bg-yellow-500'
                          : index === 1
                          ? 'bg-gray-500'
                          : 'bg-orange-500'
                      }`}
                    >
                      {getRankIcon(index + 1)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {player.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        최종 순위: {player.winPlace}위
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white rounded p-2">
                    <div className="text-gray-600">킬</div>
                    <div className="font-semibold text-gray-800 text-lg">
                      {player.kills}
                    </div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-gray-600">데미지</div>
                    <div className="font-semibold text-gray-800">
                      {Math.round(player.damage)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  헤드샷: {player.headshotKills} | 최장킬:{' '}
                  {formatDistance(player.longestKill)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 전체 킬 리더보드 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>킬 리더보드 (
            {killLeaderboard.length}명)
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sortedLeaderboard.map((player, index) => (
              <div
                key={`${player.name}-${index}`}
                className={`border rounded-lg p-3 hover:bg-gray-50 transition-colors ${
                  index < 3 ? 'border-2' : 'border-gray-200'
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
                      <h4 className="font-semibold text-gray-800">
                        {player.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        최종 순위: {player.winPlace}위
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">
                      {player.kills} 킬
                    </div>
                    <div className="text-sm text-gray-600">
                      데미지: {Math.round(player.damage)}
                    </div>
                  </div>
                </div>

                {/* 상세 정보 */}
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-blue-50 rounded p-2 text-center">
                    <div className="text-blue-600">🎯 헤드샷</div>
                    <div className="font-semibold text-gray-800">
                      {player.headshotKills}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded p-2 text-center">
                    <div className="text-green-600">📏 최장킬</div>
                    <div className="font-semibold text-gray-800">
                      {formatDistance(player.longestKill)}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded p-2 text-center">
                    <div className="text-purple-600">🏆 순위</div>
                    <div className="font-semibold text-gray-800">
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            통계 요약
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {sortedLeaderboard[0]?.kills || 0}
              </div>
              <div className="text-sm font-medium text-red-700">최고 킬</div>
              <div className="text-xs text-red-600 mt-1">
                {sortedLeaderboard[0]?.name || 'N/A'}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(
                  sortedLeaderboard.reduce(
                    (sum, player) => sum + player.damage,
                    0
                  ) / sortedLeaderboard.length
                )}
              </div>
              <div className="text-sm font-medium text-blue-700">
                평균 데미지
              </div>
              <div className="text-xs text-blue-600 mt-1">전체 플레이어</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {sortedLeaderboard.reduce(
                  (sum, player) => sum + player.headshotKills,
                  0
                )}
              </div>
              <div className="text-sm font-medium text-green-700">
                총 헤드샷
              </div>
              <div className="text-xs text-green-600 mt-1">전체 플레이어</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {formatDistance(
                  Math.max(
                    ...sortedLeaderboard.map((player) => player.longestKill)
                  )
                )}
              </div>
              <div className="text-sm font-medium text-purple-700">최장 킬</div>
              <div className="text-xs text-purple-600 mt-1">
                {sortedLeaderboard.find(
                  (player) =>
                    player.longestKill ===
                    Math.max(...sortedLeaderboard.map((p) => p.longestKill))
                )?.name || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnalysisCard
      title="킬 리더보드"
      icon="🔫"
      description="매치에서 가장 많은 킬을 기록한 플레이어들을 확인하세요"
      onClick={handleCardClick}
      isLoading={isLoading}
      hasData={!!killLeaderboard && killLeaderboard.length > 0}
    >
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500">
            킬 리더보드 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        killLeaderboard && renderSelectedCardContent(killLeaderboard)
      )}
    </AnalysisCard>
  );
}
