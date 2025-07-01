import AnalysisCard from './AnalysisCard';
import { PlayerPerformanceAnalysis } from '~/models/playerPerformance';
import { formatDuration } from '~/utils/dateUtils';

interface PlayerPerformanceCardProps {
  playerPerformance: PlayerPerformanceAnalysis[];
  isLoading?: boolean;
  error?: string | null;
  playerName: string;
}

export default function PlayerPerformanceCard({
  playerPerformance,
  isLoading = false,
  error = null,
  playerName,
}: PlayerPerformanceCardProps) {
  const handleCardClick = () => {
    // 플레이어 성과 데이터가 로드되면 자동으로 표시됨
  };

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${Math.round(meters)}m`;
  };

  const getWinPlaceColor = (place: number) => {
    if (place === 1) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (place === 2) return 'text-gray-600 bg-gray-50 border-gray-200';
    if (place === 3) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-gray-500 bg-white border-gray-200';
  };

  const getWinPlaceIcon = (place: number) => {
    if (place === 1) return '🥇';
    if (place === 2) return '🥈';
    if (place === 3) return '🥉';
    return `#${place}`;
  };

  const renderSelectedCardContent = (players: PlayerPerformanceAnalysis[]) => {
    // 상위 10명 플레이어만 표시
    const topPlayers = players.slice(0, 10);

    return (
      <div className="space-y-6">
        {/* 상위 플레이어 하이라이트 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            상위 플레이어 성과
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPlayers.slice(0, 6).map((player) => (
              <div
                key={player.playerId}
                className={`rounded-lg p-4 border ${getWinPlaceColor(
                  player.winPlace
                )}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">
                    {getWinPlaceIcon(player.winPlace)}
                  </span>
                  <span className="text-sm font-medium opacity-75">
                    {player.winPlace}위
                  </span>
                </div>
                <div className="font-semibold text-lg mb-1">{player.name}</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>킬:</span>
                    <span className="font-medium">
                      {player.performance.kills}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>데미지:</span>
                    <span className="font-medium">
                      {Math.round(player.performance.damage)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>KDA:</span>
                    <span className="font-medium">
                      {player.performance.kda}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>생존시간:</span>
                    <span className="font-medium">
                      {formatDuration(player.efficiency.survivalTime)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 전체 플레이어 목록 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            전체 플레이어 성과 분석 ({players.length}명)
          </h3>
          <div className={`space-y-4 max-h-[600px] overflow-y-auto`}>
            {players.map((player) => (
              <div
                key={player.playerId}
                className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow ${
                  player.name === playerName
                    ? 'border-red-600 border-2'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getWinPlaceColor(
                        player.winPlace
                      )}`}
                    >
                      {getWinPlaceIcon(player.winPlace)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {player.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        #{player.winPlace}위
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {player.performance.kda} KDA
                    </div>
                    <div className="text-sm text-gray-500">
                      {player.performance.kills}킬 {player.performance.assists}
                      어시스트
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {/* 전투 성과 */}
                  <div className="bg-red-50 rounded p-3">
                    <div className="font-medium text-red-700 mb-1">
                      전투 성과
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">데미지:</span>
                        <span className="font-medium text-gray-800">
                          {Math.round(player.performance.damage)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">헤드샷:</span>
                        <span className="font-medium text-gray-800">
                          {player.performance.headshotKills}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">최장킬:</span>
                        <span className="font-medium text-gray-800">
                          {formatDistance(player.performance.longestKill)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 생존 효율 */}
                  <div className="bg-green-50 rounded p-3">
                    <div className="font-medium text-green-700 mb-1">
                      생존 효율
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">생존시간:</span>
                        <span className="font-medium text-gray-800">
                          {formatDuration(player.efficiency.survivalTime)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">효율성:</span>
                        <span className="font-medium text-gray-800">
                          {(player.efficiency.survivalEfficiency * 100).toFixed(
                            0
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">연속킬:</span>
                        <span className="font-medium text-gray-800">
                          {player.efficiency.killStreaks}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 이동 통계 */}
                  <div className="bg-blue-50 rounded p-3">
                    <div className="font-medium text-blue-700 mb-1">
                      이동 통계
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">총 거리:</span>
                        <span className="font-medium text-gray-800">
                          {formatDistance(player.movement.totalDistance)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">도보:</span>
                        <span className="font-medium text-gray-800">
                          {formatDistance(player.movement.walkDistance)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">차량:</span>
                        <span className="font-medium text-gray-800">
                          {formatDistance(player.movement.rideDistance)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 아이템 사용 */}
                  <div className="bg-purple-50 rounded p-3">
                    <div className="font-medium text-purple-700 mb-1">
                      아이템 사용
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">부스트:</span>
                        <span className="font-medium text-gray-800">
                          {player.items.boosts}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">치료:</span>
                        <span className="font-medium text-gray-800">
                          {player.items.heals}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">무기:</span>
                        <span className="font-medium text-gray-800">
                          {player.items.weaponsAcquired}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 추가 통계 */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-600">부활:</span>
                      <span className="font-medium text-gray-800">
                        {player.efficiency.revives}회
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">다운:</span>
                      <span className="font-medium text-gray-800">
                        {player.efficiency.DBNOs}회
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">헤드샷률:</span>
                      <span className="font-medium text-gray-800">
                        {(player.performance.headshotAccuracy * 100).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">차량파괴:</span>
                      <span className="font-medium text-gray-800">
                        {player.items.vehicleDestroys}대
                      </span>
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
            성과 통계 요약
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">전투 통계</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 KDA:</span>
                  <span className="font-semibold text-gray-800">
                    {(
                      players.reduce((sum, p) => sum + p.performance.kda, 0) /
                      players.length
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 데미지:</span>
                  <span className="font-semibold text-gray-800">
                    {Math.round(
                      players.reduce(
                        (sum, p) => sum + p.performance.damage,
                        0
                      ) / players.length
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 킬:</span>
                  <span className="font-semibold text-gray-800">
                    {(
                      players.reduce((sum, p) => sum + p.performance.kills, 0) /
                      players.length
                    ).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">생존 통계</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 생존시간:</span>
                  <span className="font-semibold text-gray-800">
                    {formatDuration(
                      Math.round(
                        players.reduce(
                          (sum, p) => sum + p.efficiency.survivalTime,
                          0
                        ) / players.length
                      )
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 생존효율:</span>
                  <span className="font-semibold text-gray-800">
                    {(
                      (players.reduce(
                        (sum, p) => sum + p.efficiency.survivalEfficiency,
                        0
                      ) /
                        players.length) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">총 부활:</span>
                  <span className="font-semibold text-gray-800">
                    {players.reduce((sum, p) => sum + p.efficiency.revives, 0)}
                    회
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">이동 통계</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 이동거리:</span>
                  <span className="font-semibold text-gray-800">
                    {formatDistance(
                      players.reduce(
                        (sum, p) => sum + p.movement.totalDistance,
                        0
                      ) / players.length
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 도보거리:</span>
                  <span className="font-semibold text-gray-800">
                    {formatDistance(
                      players.reduce(
                        (sum, p) => sum + p.movement.walkDistance,
                        0
                      ) / players.length
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 차량거리:</span>
                  <span className="font-semibold text-gray-800">
                    {formatDistance(
                      players.reduce(
                        (sum, p) => sum + p.movement.rideDistance,
                        0
                      ) / players.length
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnalysisCard
      title="플레이어 성과 분석"
      icon="⚡"
      description="모든 플레이어의 상세한 성과 분석을 확인하세요"
      onClick={handleCardClick}
      isLoading={isLoading}
      hasData={!!playerPerformance}
    >
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500">
            플레이어 성과 분석 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        playerPerformance && renderSelectedCardContent(playerPerformance)
      )}
    </AnalysisCard>
  );
}
