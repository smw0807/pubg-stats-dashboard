import React from 'react';

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

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}분 ${s}초`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export default function MatchSummaryCard({ summary }: MatchSummaryCardProps) {
  const winnerTeamId = summary.winner?.attributes?.stats?.teamId;
  const winnerMembers =
    summary.winner?.relationships?.participants?.data?.map((p) => p.id) || [];
  const topKiller = summary.topKiller?.attributes?.stats;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">매치 요약 정보</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div>
            <b>매치 ID:</b> {summary.matchId}
          </div>
          <div>
            <b>게임 모드:</b> {summary.gameMode}
          </div>
          <div>
            <b>맵:</b> {summary.mapName}
          </div>
          <div>
            <b>플레이 시간:</b> {formatDuration(summary.duration)}
          </div>
          <div>
            <b>생성일시:</b> {formatDate(summary.createdAt)}
          </div>
          <div>
            <b>총 인원:</b> {summary.totalPlayers}
          </div>
          <div>
            <b>총 팀 수:</b> {summary.totalTeams}
          </div>
        </div>
        <div>
          <div>
            <b>우승 팀:</b> {winnerTeamId}
          </div>
          <div>
            <b>우승 멤버 ID:</b> {winnerMembers.join(', ')}
          </div>
          <div className="mt-2">
            <b>최다 킬 플레이어:</b>
            {topKiller ? (
              <div className="ml-2">
                <div>닉네임: {topKiller.name}</div>
                <div>
                  킬: {topKiller.kills} / 데미지:{' '}
                  {Math.round(topKiller.damageDealt)}
                </div>
                <div>생존 시간: {formatDuration(topKiller.timeSurvived)}</div>
              </div>
            ) : (
              <span>정보 없음</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-red-600">
            {summary.matchStats.totalKills}
          </div>
          <div className="text-xs text-gray-500">총 킬</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">
            {Math.round(summary.matchStats.totalDamage)}
          </div>
          <div className="text-xs text-gray-500">총 데미지</div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-600">
            {Math.round(summary.matchStats.totalDistance)}m
          </div>
          <div className="text-xs text-gray-500">총 이동거리</div>
        </div>
      </div>
    </div>
  );
}
