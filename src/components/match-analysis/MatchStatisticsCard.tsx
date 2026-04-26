import { useEffect } from 'react';
import AnalysisCard from './AnalysisCard';
import { MatchStatistics } from '~/models/matchStatistics';
import { getGameModeDisplayName, getMapDisplayName } from '~/utils/matchUtils';
import { formatDuration } from '~/utils/dateUtils';
import { formatDistance, formatTime } from '~/utils/matchUtils';
import { useMatchStatistics } from '~/features/match-analysis/queries';

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
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            매치 기본 정보
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {getGameModeDisplayName(matchStatistics.gameMode ?? '')}
              </div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                게임 모드
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {getMapDisplayName(matchStatistics.mapName ?? '')}
              </div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                맵
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatDuration(matchStatistics.duration ?? 0)}
              </div>
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                플레이 시간
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center border border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {matchStatistics.playerCount}명
              </div>
              <div className="text-sm font-medium text-orange-700 dark:text-orange-300">
                참가자
              </div>
            </div>
          </div>
        </div>

        {/* 매치 요약 통계 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            매치 요약 통계
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {matchStatistics.summary.totalKills}
              </div>
              <div className="text-sm font-medium text-red-700 dark:text-red-300">
                총 킬
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                💀
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(matchStatistics.summary.totalDamage)}
              </div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                총 데미지
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                💥
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {matchStatistics.summary.totalHeadshots}
              </div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                총 헤드샷
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                🎯
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatDistance(matchStatistics.summary.totalDistance)}
              </div>
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                총 이동거리
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                🏃
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-600">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                {matchStatistics.summary.alivePlayers}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                생존자
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                👤
              </div>
            </div>
          </div>
        </div>

        {/* 평균 통계 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            평균 통계
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 text-center border border-indigo-200 dark:border-indigo-800">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {matchStatistics.averages.avgKills.toFixed(1)}
              </div>
              <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                평균 킬
              </div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                인당
              </div>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 text-center border border-cyan-200 dark:border-cyan-800">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {Math.round(matchStatistics.averages.avgDamage)}
              </div>
              <div className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                평균 데미지
              </div>
              <div className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">
                인당
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 text-center border border-emerald-200 dark:border-emerald-800">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatDistance(matchStatistics.averages.avgDistance)}
              </div>
              <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                평균 이동거리
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                인당
              </div>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 text-center border border-pink-200 dark:border-pink-800">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {(matchStatistics.averages.headshotRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm font-medium text-pink-700 dark:text-pink-300">
                헤드샷 비율
              </div>
              <div className="text-xs text-pink-600 dark:text-pink-400 mt-1">
                전체 킬 대비
              </div>
            </div>
          </div>
        </div>

        {/* 극값 통계 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            극값 통계
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center border border-yellow-200 dark:border-yellow-800">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {matchStatistics.extremes.mostKills}
              </div>
              <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                최고 킬
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                개인 최고
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center border border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {Math.round(matchStatistics.extremes.mostDamage)}
              </div>
              <div className="text-sm font-medium text-orange-700 dark:text-orange-300">
                최고 데미지
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                개인 최고
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatDistance(matchStatistics.extremes.longestKill)}
              </div>
              <div className="text-sm font-medium text-red-700 dark:text-red-300">
                최장 킬
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                거리
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatTime(matchStatistics.extremes.longestSurvival)}
              </div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                최장 생존
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                시간
              </div>
            </div>
          </div>
        </div>

        {/* 추가 통계 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">🔍</span>
            추가 통계
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                참가자 정보
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    총 플레이어:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {matchStatistics.playerCount}명
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    총 팀:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {matchStatistics.teamCount}팀
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    팀당 평균 인원:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {(
                      matchStatistics.playerCount / matchStatistics.teamCount
                    ).toFixed(1)}
                    명
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                킬 통계
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    킬률:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {(
                      (matchStatistics.summary.totalKills /
                        matchStatistics.playerCount) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    헤드샷률:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {(
                      (matchStatistics.summary.totalHeadshots /
                        matchStatistics.summary.totalKills) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    킬당 데미지:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {Math.round(
                      matchStatistics.summary.totalDamage /
                        matchStatistics.summary.totalKills
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                생존 통계
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    생존률:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {(
                      (matchStatistics.summary.alivePlayers /
                        matchStatistics.playerCount) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    평균 생존시간:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {formatTime(Math.round(matchStatistics.duration ?? 0 / 2))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    인당 평균 거리:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
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
          <p className="text-red-500 dark:text-red-400">
            매치 통계 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        matchStatistics && renderSelectedCardContent(matchStatistics)
      )}
    </AnalysisCard>
  );
}
