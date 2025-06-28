import React from 'react';
import { getGameModeDisplayName, getMapDisplayName } from '~/utils/matchUtils';
import { formatDuration, formatDate } from '~/utils/dateUtils';

interface MatchSummaryCardProps {
  summary: {
    matchId: string;
    gameMode: string;
    mapName: string;
    duration: number;
    createdAt: string;
    totalPlayers: number;
    totalTeams: number;
    winner: {
      attributes: {
        stats: { teamId: number };
      };
      relationships: {
        participants: { data: { id: string }[] };
      };
    };
    topKiller: {
      attributes: {
        stats: {
          name: string;
          kills: number;
          damageDealt: number;
          timeSurvived: number;
        };
      };
    };
    matchStats: {
      totalKills: number;
      totalDamage: number;
      totalDistance: number;
    };
  };
}

export default function MatchSummaryCard({ summary }: MatchSummaryCardProps) {
  const winnerTeamId = summary.winner?.attributes?.stats?.teamId;
  const winnerMembers =
    summary.winner?.relationships?.participants?.data?.map((p) => p.id) || [];
  const topKiller = summary.topKiller?.attributes?.stats;

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-blue-100">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
          <span className="text-2xl">🏆</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          매치 요약 정보
        </h2>
        <p className="text-gray-600 mt-2">매치 ID: {summary.matchId}</p>
      </div>

      {/* 기본 정보 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 왼쪽: 매치 기본 정보 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            매치 정보
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-blue-500 mr-3">🎮</span>
              <div>
                <div className="text-sm text-gray-500">게임 모드</div>
                <div className="font-semibold text-gray-800">
                  {getGameModeDisplayName(summary.gameMode)}
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-green-500 mr-3">🗺️</span>
              <div>
                <div className="text-sm text-gray-500">맵</div>
                <div className="font-semibold text-gray-800">
                  {getMapDisplayName(summary.mapName)}
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-purple-500 mr-3">⏱️</span>
              <div>
                <div className="text-sm text-gray-500">플레이 시간</div>
                <div className="font-semibold text-gray-800">
                  {formatDuration(summary.duration)}
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-orange-500 mr-3">📅</span>
              <div>
                <div className="text-sm text-gray-500">생성일시</div>
                <div className="font-semibold text-gray-800">
                  {formatDate(summary.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 참가자 정보 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">👥</span>
            참가자 정보
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-indigo-500 mr-3">👤</span>
              <div>
                <div className="text-sm text-gray-500">총 인원</div>
                <div className="font-semibold text-gray-800">
                  {summary.totalPlayers}명
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-pink-500 mr-3">🏆</span>
              <div>
                <div className="text-sm text-gray-500">우승 팀</div>
                <div className="font-semibold text-gray-800">
                  팀 {winnerTeamId}
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
              <span className="text-yellow-500 mr-3">👑</span>
              <div>
                <div className="text-sm text-gray-500">우승 멤버</div>
                <div className="font-semibold text-gray-800 text-sm">
                  {winnerMembers.length > 0
                    ? winnerMembers.join(', ')
                    : '정보 없음'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 최다 킬 플레이어 */}
      {topKiller && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🔫</span>
            최다 킬 플레이어
          </h3>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">👑</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">
                    {topKiller.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    최고 성과 플레이어
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">
                  {topKiller.kills} 킬
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round(topKiller.damageDealt)} 데미지
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-bold text-red-600">
                  {topKiller.kills}
                </div>
                <div className="text-xs text-gray-500">킬</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-bold text-orange-600">
                  {Math.round(topKiller.damageDealt)}
                </div>
                <div className="text-xs text-gray-500">데미지</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-bold text-blue-600">
                  {formatDuration(topKiller.timeSurvived)}
                </div>
                <div className="text-xs text-gray-500">생존 시간</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 매치 통계 */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📊</span>
          매치 통계
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 text-center border border-red-200">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {summary.matchStats.totalKills}
            </div>
            <div className="text-sm font-medium text-red-700">총 킬</div>
            <div className="text-xs text-red-600 mt-1">💀</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round(summary.matchStats.totalDamage)}
            </div>
            <div className="text-sm font-medium text-green-700">총 데미지</div>
            <div className="text-xs text-green-600 mt-1">💥</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round(summary.matchStats.totalDistance)}m
            </div>
            <div className="text-sm font-medium text-blue-700">총 이동거리</div>
            <div className="text-xs text-blue-600 mt-1">🏃</div>
          </div>
        </div>
      </div>
    </div>
  );
}
