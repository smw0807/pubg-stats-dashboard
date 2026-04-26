import { useEffect } from 'react';
import AnalysisCard from './AnalysisCard';
import { TeamAnalysisData } from '~/models/teamAnalysis';
import {
  getRankColor,
  getRankIcon,
  formatDistance,
  formatTime,
} from '~/utils/matchUtils';
import { useTeamAnalysis } from '~/features/match-analysis/queries';
import PlayerNameClick from './PlayerNameClick';

export default function TeamAnalysisCard({
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
    data: teamAnalysis,
    isLoading,
    error,
  } = useTeamAnalysis(platform ?? '', matchId ?? '');

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const handleCardClick = () => {
    // 팀 분석 데이터가 로드되면 자동으로 표시됨
  };

  const renderSelectedCardContent = (teamAnalysis: TeamAnalysisData) => {
    if (teamAnalysis.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            팀 분석 정보가 없습니다.
          </p>
        </div>
      );
    }

    // 순위별로 정렬
    const sortedTeams = [...teamAnalysis].sort((a, b) => a.rank - b.rank);

    return (
      <div className="space-y-6">
        {/* 상위 3팀 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            상위 팀
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedTeams.slice(0, 3).map((team, index) => (
              <div
                key={team.teamId}
                className={`border rounded-lg p-4 transition-colors duration-200
                  ${
                    team.won
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
                        team.rank
                      )}`}
                    >
                      {getRankIcon(team.rank)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        팀 {team.teamId}
                        {team.won && (
                          <span className="ml-2 text-yellow-600 dark:text-yellow-400">
                            🏆 승리
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        최고 순위: {team.teamStats.bestWinPlace}위
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">
                      총 킬
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {team.teamStats.totalKills}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded p-2">
                    <div className="text-gray-600 dark:text-gray-300">
                      총 데미지
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {Math.round(team.teamStats.totalDamage)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                  생존시간: {formatTime(team.teamStats.totalSurvivalTime)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 전체 팀 분석 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <span className="mr-2">📊</span>팀 분석 ({teamAnalysis.length}팀)
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {sortedTeams.map((team) => (
              <div
                key={team.teamId}
                className={`border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                  ${
                    team.won
                      ? 'border-2 border-yellow-400 dark:border-yellow-600'
                      : 'border-gray-200 dark:border-gray-600'
                  }
                  ${
                    team.topPerformers.topKiller.name === playerName
                      ? 'border-red-600 dark:border-red-500 border-2'
                      : team.topPerformers.topDamage.name === playerName
                      ? 'border-red-600 dark:border-red-500 border-2'
                      : team.topPerformers.topSurvivor.name === playerName
                      ? 'border-red-600 dark:border-red-500 border-2'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
              >
                {/* 팀 헤더 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${getRankColor(
                        team.rank
                      )}`}
                    >
                      {team.rank}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        팀 {team.teamId}
                        {team.won && (
                          <span className="ml-2 text-yellow-600 dark:text-yellow-400">
                            🏆 승리
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        최고 순위: {team.teamStats.bestWinPlace}위
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <div>총 킬: {team.teamStats.totalKills}</div>
                      <div>
                        총 데미지: {Math.round(team.teamStats.totalDamage)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 팀 통계 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-2 text-center">
                    <div className="text-red-600 dark:text-red-400 text-xs">
                      총 킬
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {team.teamStats.totalKills}
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2 text-center">
                    <div className="text-blue-600 dark:text-blue-400 text-xs">
                      총 데미지
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {Math.round(team.teamStats.totalDamage)}
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-2 text-center">
                    <div className="text-green-600 dark:text-green-400 text-xs">
                      총 생존시간
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatTime(team.teamStats.totalSurvivalTime)}
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2 text-center">
                    <div className="text-purple-600 dark:text-purple-400 text-xs">
                      총 이동거리
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatDistance(team.teamStats.totalDistance)}
                    </div>
                  </div>
                </div>

                {/* 팀 효율성 */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    팀 효율성
                  </h5>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 text-center">
                      <div className="text-gray-600 dark:text-gray-300">
                        인당 킬
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {team.teamEfficiency.killsPerPlayer.toFixed(1)}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 text-center">
                      <div className="text-gray-600 dark:text-gray-300">
                        인당 데미지
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {Math.round(team.teamEfficiency.damagePerPlayer)}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 text-center">
                      <div className="text-gray-600 dark:text-gray-300">
                        인당 생존시간
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {formatTime(team.teamEfficiency.survivalTimePerPlayer)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 최고 성과자 */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    최고 성과자
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded p-2">
                      <div className="text-red-600 dark:text-red-400 font-medium">
                        🔫 최고 킬러
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        <PlayerNameClick
                          platform={platform}
                          playerName={team.topPerformers.topKiller.name}
                          isMine={
                            team.topPerformers.topKiller.name === playerName
                          }
                        />
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {team.topPerformers.topKiller.kills}킬 |{' '}
                        {Math.round(team.topPerformers.topKiller.damage || 0)}
                        데미지
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                      <div className="text-blue-600 dark:text-blue-400 font-medium">
                        💥 최고 데미지
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        <PlayerNameClick
                          platform={platform}
                          playerName={team.topPerformers.topDamage.name}
                          isMine={
                            team.topPerformers.topDamage.name === playerName
                          }
                        />
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {Math.round(team.topPerformers.topDamage.damage || 0)}
                        데미지 | {team.topPerformers.topDamage.kills}킬
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded p-2">
                      <div className="text-green-600 dark:text-green-400 font-medium">
                        ⏱️ 최고 생존자
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        <PlayerNameClick
                          platform={platform}
                          playerName={team.topPerformers.topSurvivor.name}
                          isMine={
                            team.topPerformers.topSurvivor.name === playerName
                          }
                        />
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {formatTime(
                          team.topPerformers.topSurvivor.survivalTime || 0
                        )}{' '}
                        | {team.topPerformers.topSurvivor.winPlace}위
                      </div>
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
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center border border-yellow-200 dark:border-yellow-800">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {sortedTeams.find((team) => team.won)?.teamId || 'N/A'}
              </div>
              <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                우승 팀
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                {sortedTeams.find((team) => team.won)?.teamStats.totalKills ||
                  0}
                킬
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {sortedTeams.reduce(
                  (sum, team) => sum + team.teamStats.totalKills,
                  0
                )}
              </div>
              <div className="text-sm font-medium text-red-700 dark:text-red-300">
                총 킬
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                전체 팀
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(
                  sortedTeams.reduce(
                    (sum, team) => sum + team.teamStats.totalDamage,
                    0
                  )
                )}
              </div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                총 데미지
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                전체 팀
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatTime(
                  Math.round(
                    sortedTeams.reduce(
                      (sum, team) => sum + team.teamStats.totalSurvivalTime,
                      0
                    ) / sortedTeams.length
                  )
                )}
              </div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">
                평균 생존시간
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                팀당
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnalysisCard
      title="팀 분석"
      icon="👥"
      description="팀별 성과와 효율성을 상세히 분석해보세요"
      onClick={handleCardClick}
      isLoading={isLoading}
      hasData={!!teamAnalysis && teamAnalysis.length > 0}
    >
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500 dark:text-red-400">
            팀 분석 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        teamAnalysis && renderSelectedCardContent(teamAnalysis)
      )}
    </AnalysisCard>
  );
}
