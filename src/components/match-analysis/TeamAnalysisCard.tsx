import AnalysisCard from './AnalysisCard';
import { TeamAnalysisData } from '~/models/teamAnalysis';

interface TeamAnalysisCardProps {
  teamAnalysis: TeamAnalysisData;
  isLoading?: boolean;
  error?: string | null;
}

export default function TeamAnalysisCard({
  teamAnalysis,
  isLoading = false,
  error = null,
}: TeamAnalysisCardProps) {
  const handleCardClick = () => {
    // 팀 분석 데이터가 로드되면 자동으로 표시됨
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`;
    }
    return `${Math.round(meters)}m`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-white bg-yellow-500';
    if (rank === 2) return 'text-white bg-gray-500';
    if (rank === 3) return 'text-white bg-orange-500';
    return 'text-white bg-gray-400';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  const renderSelectedCardContent = (teamAnalysis: TeamAnalysisData) => {
    if (teamAnalysis.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">팀 분석 정보가 없습니다.</p>
        </div>
      );
    }

    // 순위별로 정렬
    const sortedTeams = [...teamAnalysis].sort((a, b) => a.rank - b.rank);

    return (
      <div className="space-y-6">
        {/* 상위 3팀 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            상위 팀
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sortedTeams.slice(0, 3).map((team, index) => (
              <div
                key={team.teamId}
                className={`border rounded-lg p-4 ${
                  team.won
                    ? 'border-yellow-400 bg-yellow-50'
                    : index === 1
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-orange-300 bg-orange-50'
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
                      <h4 className="font-semibold text-gray-800">
                        팀 {team.teamId}
                        {team.won && (
                          <span className="ml-2 text-yellow-600">🏆 승리</span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">
                        최고 순위: {team.teamStats.bestWinPlace}위
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white rounded p-2">
                    <div className="text-gray-600">총 킬</div>
                    <div className="font-semibold text-gray-800">
                      {team.teamStats.totalKills}
                    </div>
                  </div>
                  <div className="bg-white rounded p-2">
                    <div className="text-gray-600">총 데미지</div>
                    <div className="font-semibold text-gray-800">
                      {Math.round(team.teamStats.totalDamage)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  생존시간: {formatTime(team.teamStats.totalSurvivalTime)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 전체 팀 분석 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>팀 분석 ({teamAnalysis.length}팀)
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {sortedTeams.map((team) => (
              <div
                key={team.teamId}
                className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${
                  team.won ? 'border-2 border-yellow-400' : 'border-gray-200'
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
                      <h4 className="font-semibold text-gray-800">
                        팀 {team.teamId}
                        {team.won && (
                          <span className="ml-2 text-yellow-600">🏆 승리</span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">
                        최고 순위: {team.teamStats.bestWinPlace}위
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      <div>총 킬: {team.teamStats.totalKills}</div>
                      <div>
                        총 데미지: {Math.round(team.teamStats.totalDamage)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 팀 통계 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-red-50 rounded p-2 text-center">
                    <div className="text-red-600 text-xs">총 킬</div>
                    <div className="font-semibold text-gray-800">
                      {team.teamStats.totalKills}
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded p-2 text-center">
                    <div className="text-blue-600 text-xs">총 데미지</div>
                    <div className="font-semibold text-gray-800">
                      {Math.round(team.teamStats.totalDamage)}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded p-2 text-center">
                    <div className="text-green-600 text-xs">총 생존시간</div>
                    <div className="font-semibold text-gray-800">
                      {formatTime(team.teamStats.totalSurvivalTime)}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded p-2 text-center">
                    <div className="text-purple-600 text-xs">총 이동거리</div>
                    <div className="font-semibold text-gray-800">
                      {formatDistance(team.teamStats.totalDistance)}
                    </div>
                  </div>
                </div>

                {/* 팀 효율성 */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">
                    팀 효율성
                  </h5>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="text-gray-600">인당 킬</div>
                      <div className="font-semibold text-gray-800">
                        {team.teamEfficiency.killsPerPlayer.toFixed(1)}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="text-gray-600">인당 데미지</div>
                      <div className="font-semibold text-gray-800">
                        {Math.round(team.teamEfficiency.damagePerPlayer)}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <div className="text-gray-600">인당 생존시간</div>
                      <div className="font-semibold text-gray-800">
                        {formatTime(team.teamEfficiency.survivalTimePerPlayer)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 최고 성과자 */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">
                    최고 성과자
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div className="bg-red-50 rounded p-2">
                      <div className="text-red-600 font-medium">
                        🔫 최고 킬러
                      </div>
                      <div className="font-semibold text-gray-800">
                        {team.topPerformers.topKiller.name}
                      </div>
                      <div className="text-gray-600">
                        {team.topPerformers.topKiller.kills}킬 |{' '}
                        {Math.round(team.topPerformers.topKiller.damage || 0)}
                        데미지
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded p-2">
                      <div className="text-blue-600 font-medium">
                        💥 최고 데미지
                      </div>
                      <div className="font-semibold text-gray-800">
                        {team.topPerformers.topDamage.name}
                      </div>
                      <div className="text-gray-600">
                        {Math.round(team.topPerformers.topDamage.damage || 0)}
                        데미지 | {team.topPerformers.topDamage.kills}킬
                      </div>
                    </div>
                    <div className="bg-green-50 rounded p-2">
                      <div className="text-green-600 font-medium">
                        ⏱️ 최고 생존자
                      </div>
                      <div className="font-semibold text-gray-800">
                        {team.topPerformers.topSurvivor.name}
                      </div>
                      <div className="text-gray-600">
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            통계 요약
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">
                {sortedTeams.find((team) => team.won)?.teamId || 'N/A'}
              </div>
              <div className="text-sm font-medium text-yellow-700">우승 팀</div>
              <div className="text-xs text-yellow-600 mt-1">
                {sortedTeams.find((team) => team.won)?.teamStats.totalKills ||
                  0}
                킬
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {sortedTeams.reduce(
                  (sum, team) => sum + team.teamStats.totalKills,
                  0
                )}
              </div>
              <div className="text-sm font-medium text-red-700">총 킬</div>
              <div className="text-xs text-red-600 mt-1">전체 팀</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(
                  sortedTeams.reduce(
                    (sum, team) => sum + team.teamStats.totalDamage,
                    0
                  )
                )}
              </div>
              <div className="text-sm font-medium text-blue-700">총 데미지</div>
              <div className="text-xs text-blue-600 mt-1">전체 팀</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {formatTime(
                  Math.round(
                    sortedTeams.reduce(
                      (sum, team) => sum + team.teamStats.totalSurvivalTime,
                      0
                    ) / sortedTeams.length
                  )
                )}
              </div>
              <div className="text-sm font-medium text-green-700">
                평균 생존시간
              </div>
              <div className="text-xs text-green-600 mt-1">팀당</div>
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
          <p className="text-red-500">
            팀 분석 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        teamAnalysis && renderSelectedCardContent(teamAnalysis)
      )}
    </AnalysisCard>
  );
}
