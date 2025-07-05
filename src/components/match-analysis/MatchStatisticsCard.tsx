import { useEffect } from 'react';
import AnalysisCard from './AnalysisCard';
import { MatchStatistics } from '~/models/matchStatistics';
import { getGameModeDisplayName, getMapDisplayName } from '~/utils/matchUtils';
import { formatDuration } from '~/utils/dateUtils';
import { formatDistance, formatTime } from '~/utils/matchUtils';
import { useMatchStatistics } from './hooks/useMatchStatistics';

export default function MatchStatisticsCard({
  platform,
  matchId,
  setIsLoading,
}: {
  platform: string;
  matchId: string;
  setIsLoading: (isLoading: boolean) => void;
}) {
  const {
    data: matchStatistics,
    isLoading,
    error,
  } = useMatchStatistics(platform ?? '', matchId ?? '');

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const handleCardClick = () => {
    // 매치 통계 데이터가 로드되면 자동으로 표시됨
  };

  const renderSelectedCardContent = (matchStatistics: MatchStatistics) => {
    return (
      <div className="space-y-8">
        {/* 매치 기본 정보 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            매치 기본 정보
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {getGameModeDisplayName(matchStatistics.gameMode ?? '')}
              </div>
              <div className="text-sm font-medium text-blue-700">게임 모드</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {getMapDisplayName(matchStatistics.mapName ?? '')}
              </div>
              <div className="text-sm font-medium text-green-700">맵</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {formatDuration(matchStatistics.duration ?? 0)}
              </div>
              <div className="text-sm font-medium text-purple-700">
                플레이 시간
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {matchStatistics.playerCount}명
              </div>
              <div className="text-sm font-medium text-orange-700">참가자</div>
            </div>
          </div>
        </div>

        {/* 매치 요약 통계 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            매치 요약 통계
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {matchStatistics.summary.totalKills}
              </div>
              <div className="text-sm font-medium text-red-700">총 킬</div>
              <div className="text-xs text-red-600 mt-1">💀</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(matchStatistics.summary.totalDamage)}
              </div>
              <div className="text-sm font-medium text-blue-700">총 데미지</div>
              <div className="text-xs text-blue-600 mt-1">💥</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {matchStatistics.summary.totalHeadshots}
              </div>
              <div className="text-sm font-medium text-green-700">
                총 헤드샷
              </div>
              <div className="text-xs text-green-600 mt-1">🎯</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {formatDistance(matchStatistics.summary.totalDistance)}
              </div>
              <div className="text-sm font-medium text-purple-700">
                총 이동거리
              </div>
              <div className="text-xs text-purple-600 mt-1">🏃</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <div className="text-2xl font-bold text-gray-600">
                {matchStatistics.summary.alivePlayers}
              </div>
              <div className="text-sm font-medium text-gray-700">생존자</div>
              <div className="text-xs text-gray-600 mt-1">👤</div>
            </div>
          </div>
        </div>

        {/* 평균 통계 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            평균 통계
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-indigo-50 rounded-lg p-4 text-center border border-indigo-200">
              <div className="text-2xl font-bold text-indigo-600">
                {matchStatistics.averages.avgKills.toFixed(1)}
              </div>
              <div className="text-sm font-medium text-indigo-700">평균 킬</div>
              <div className="text-xs text-indigo-600 mt-1">인당</div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-4 text-center border border-cyan-200">
              <div className="text-2xl font-bold text-cyan-600">
                {Math.round(matchStatistics.averages.avgDamage)}
              </div>
              <div className="text-sm font-medium text-cyan-700">
                평균 데미지
              </div>
              <div className="text-xs text-cyan-600 mt-1">인당</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 text-center border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-600">
                {formatDistance(matchStatistics.averages.avgDistance)}
              </div>
              <div className="text-sm font-medium text-emerald-700">
                평균 이동거리
              </div>
              <div className="text-xs text-emerald-600 mt-1">인당</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 text-center border border-pink-200">
              <div className="text-2xl font-bold text-pink-600">
                {(matchStatistics.averages.headshotRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm font-medium text-pink-700">
                헤드샷 비율
              </div>
              <div className="text-xs text-pink-600 mt-1">전체 킬 대비</div>
            </div>
          </div>
        </div>

        {/* 극값 통계 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            극값 통계
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">
                {matchStatistics.extremes.mostKills}
              </div>
              <div className="text-sm font-medium text-yellow-700">최고 킬</div>
              <div className="text-xs text-yellow-600 mt-1">개인 최고</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(matchStatistics.extremes.mostDamage)}
              </div>
              <div className="text-sm font-medium text-orange-700">
                최고 데미지
              </div>
              <div className="text-xs text-orange-600 mt-1">개인 최고</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {formatDistance(matchStatistics.extremes.longestKill)}
              </div>
              <div className="text-sm font-medium text-red-700">최장 킬</div>
              <div className="text-xs text-red-600 mt-1">거리</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {formatTime(matchStatistics.extremes.longestSurvival)}
              </div>
              <div className="text-sm font-medium text-green-700">
                최장 생존
              </div>
              <div className="text-xs text-green-600 mt-1">시간</div>
            </div>
          </div>
        </div>

        {/* 추가 통계 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🔍</span>
            추가 통계
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                참가자 정보
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">총 플레이어:</span>
                  <span className="font-semibold text-gray-800">
                    {matchStatistics.playerCount}명
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">총 팀:</span>
                  <span className="font-semibold text-gray-800">
                    {matchStatistics.teamCount}팀
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">팀당 평균 인원:</span>
                  <span className="font-semibold text-gray-800">
                    {(
                      matchStatistics.playerCount / matchStatistics.teamCount
                    ).toFixed(1)}
                    명
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                킬 통계
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">킬률:</span>
                  <span className="font-semibold text-gray-800">
                    {(
                      (matchStatistics.summary.totalKills /
                        matchStatistics.playerCount) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">헤드샷률:</span>
                  <span className="font-semibold text-gray-800">
                    {(
                      (matchStatistics.summary.totalHeadshots /
                        matchStatistics.summary.totalKills) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">킬당 데미지:</span>
                  <span className="font-semibold text-gray-800">
                    {Math.round(
                      matchStatistics.summary.totalDamage /
                        matchStatistics.summary.totalKills
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                생존 통계
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">생존률:</span>
                  <span className="font-semibold text-gray-800">
                    {(
                      (matchStatistics.summary.alivePlayers /
                        matchStatistics.playerCount) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 생존시간:</span>
                  <span className="font-semibold text-gray-800">
                    {formatTime(Math.round(matchStatistics.duration ?? 0 / 2))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">인당 평균 거리:</span>
                  <span className="font-semibold text-gray-800">
                    {formatDistance(matchStatistics.averages.avgDistance)}
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
      title="매치 통계"
      icon="📈"
      description="매치의 전체적인 통계와 분석을 확인하세요"
      onClick={handleCardClick}
      isLoading={isLoading}
      hasData={!!matchStatistics}
    >
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500">
            매치 통계 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        matchStatistics && renderSelectedCardContent(matchStatistics)
      )}
    </AnalysisCard>
  );
}
