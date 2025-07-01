import AnalysisCard from './AnalysisCard';
import { TeamRankData } from '~/models/teamRank';
import { formatDistance, formatTime } from '~/utils/matchUtils';

interface TeamRankCardProps {
  teamRanks: TeamRankData;
  isLoading?: boolean;
  error?: string | null;
  playerName: string;
}

export default function TeamRankCard({
  teamRanks,
  isLoading = false,
  error = null,
  playerName,
}: TeamRankCardProps) {
  const handleCardClick = () => {
    // 팀 순위 데이터가 로드되면 자동으로 표시됨
  };

  const renderSelectedCardContent = (teamRanks: TeamRankData) => {
    if (teamRanks.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">팀 순위 정보가 없습니다.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {teamRanks.map((team) => (
          <div
            key={team.teamId}
            className={`border rounded-lg p-4 ${
              team.won ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
            } ${
              team.participants.find((p) => p.name === playerName)
                ? 'border-red-600 border-2'
                : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                    team.won ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}
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
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  <div>킬: {team.teamStats.totalKills}</div>
                  <div>데미지: {Math.round(team.teamStats.totalDamage)}</div>
                </div>
              </div>
            </div>

            {/* 팀 통계 */}
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div className="bg-gray-50 rounded p-2">
                <div className="text-gray-600">생존 시간</div>
                <div className="font-semibold text-gray-800">
                  {formatTime(team.teamStats.totalSurvivalTime)}
                </div>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <div className="text-gray-600">이동 거리</div>
                <div className="font-semibold text-gray-800">
                  {formatDistance(team.teamStats.totalDistance)}
                </div>
              </div>
            </div>

            {/* 참가자 목록 */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                참가자 ({team.participants.length}명)
              </h5>
              {team.participants.map((participant, pIndex) => (
                <div
                  key={pIndex}
                  className="flex items-center justify-between p-2 rounded text-sm bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-800">
                      {participant.name === playerName ? (
                        <>{participant.name} (나)</>
                      ) : (
                        participant.name
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span>킬: {participant.kills}</span>
                    <span>데미지: {Math.round(participant.damage)}</span>
                    <span>생존: {formatTime(participant.survivalTime)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AnalysisCard
      title="팀 순위"
      icon="🏆"
      description="매치에서의 팀별 순위와 성과를 확인하세요"
      onClick={handleCardClick}
      isLoading={isLoading}
      hasData={!!teamRanks && teamRanks.length > 0}
    >
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500">
            팀 순위 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      ) : (
        teamRanks && renderSelectedCardContent(teamRanks)
      )}
    </AnalysisCard>
  );
}
