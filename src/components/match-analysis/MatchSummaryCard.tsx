import { useEffect } from 'react';
import { getGameModeDisplayName, getMapDisplayName } from '~/utils/matchUtils';
import { formatDuration, formatDate } from '~/utils/dateUtils';
import AnalysisCard from './AnalysisCard';
import { formatNumber } from '~/utils/matchUtils';
import { MatchSummary } from '~/models/summary';
import { useMatchSummary } from './hooks/useMatchSummary';

export default function MatchSummaryCard({
  platform,
  matchId,
  setIsLoading,
}: {
  platform: string;
  matchId: string;
  setIsLoading: (isLoading: boolean) => void;
}) {
  const {
    data: summary,
    isLoading,
    error,
  } = useMatchSummary(platform ?? '', matchId ?? '');

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const winnerTeamId = summary?.winner?.attributes?.stats?.teamId;
  const topKiller = summary?.topKiller?.attributes?.stats;

  const handleCardClick = () => {
    // 매치 요약 데이터가 로드되면 자동으로 표시됨
  };

  const renderSelectedCardContent = (summary: MatchSummary['summary']) => {
    return (
      <div className="space-y-8">
        {/* 기본 정보 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 매치 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <span className="mr-2">📋</span>
              매치 정보
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                <span className="text-blue-500 mr-3">🎮</span>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    게임 모드
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {getGameModeDisplayName(summary.gameMode)}
                  </div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                <span className="text-green-500 mr-3">🗺️</span>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    맵
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {getMapDisplayName(summary.mapName)}
                  </div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                <span className="text-purple-500 mr-3">⏱️</span>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    플레이 시간
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {formatDuration(summary.duration)}
                  </div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                <span className="text-orange-500 mr-3">📅</span>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    생성일시
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {formatDate(summary.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 참가자 정보 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <span className="mr-2">👥</span>
              참가자 정보
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                <span className="text-indigo-500 mr-3">👤</span>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    총 인원
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {summary.totalPlayers}명
                  </div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                <span className="text-pink-500 mr-3">🏆</span>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    우승 팀
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    팀 {winnerTeamId}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 최다 킬 플레이어 */}
        {topKiller && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <span className="mr-2">🔫</span>
              최다 킬 플레이어
            </h3>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-100 dark:border-red-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">👑</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {topKiller.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      최고 성과 플레이어
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {topKiller.kills} 킬
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {Math.round(topKiller.damageDealt)} 데미지
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">
                    {topKiller.kills}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    킬
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {Math.round(topKiller.damageDealt)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    데미지
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatDuration(topKiller.timeSurvived)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    생존 시간
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 매치 통계 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            매치 통계
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 text-center border border-red-200 dark:border-red-800">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                {summary.matchStats.totalKills}
              </div>
              <div className="text-sm font-medium text-red-700 dark:text-red-300">
                총 킬
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                💀
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 text-center border border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {formatNumber(summary.matchStats.totalDamage)}
              </div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                총 데미지
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                💥
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 text-center border border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {formatNumber(summary.matchStats.totalDistance)}m
              </div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                총 이동거리
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                🏃
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnalysisCard
      title="매치 요약"
      icon="🏆"
      description="매치의 기본 정보와 통계를 확인하세요"
      onClick={handleCardClick}
      isLoading={isLoading}
      hasData={!!summary}
    >
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500 dark:text-red-400">
            매치 요약 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        summary && renderSelectedCardContent(summary)
      )}
    </AnalysisCard>
  );
}
