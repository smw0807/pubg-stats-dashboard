'use client';

import { useRecentMatchStats } from './hooks/useRecentMatchStats';
import type { RecentMatch } from '~/models/recentMatches';

interface RecentMatchStatsProps {
  platform: string;
  playerName: string;
}

export default function RecentMatchStats({
  platform,
  playerName,
}: RecentMatchStatsProps) {
  const {
    data: recentMatches,
    isLoading,
    error,
  } = useRecentMatchStats(platform, playerName);

  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    return num.toLocaleString();
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const getGameModeDisplayName = (gameMode: string) => {
    switch (gameMode) {
      case 'solo':
        return '솔로';
      case 'duo':
        return '듀오';
      case 'squad':
        return '스쿼드';
      case 'solo-fpp':
        return '솔로 FPP';
      case 'squad-fpp':
        return '스쿼드 FPP';
      default:
        return gameMode;
    }
  };

  const getMapDisplayName = (mapName: string) => {
    switch (mapName) {
      case 'DihorOtok_Main':
        return '비켄디';
      case 'Baltic_Main':
        return '에란겔';
      case 'Desert_Main':
        return '미라마';
      case 'Savage_Main':
        return '사녹';
      case 'Tiger_Main':
        return '태이고';
      case 'Neon_Main':
        return '론도';
      default:
        return mapName;
    }
  };

  const getPlaceColor = (place: number) => {
    if (place === 1) return 'text-yellow-600 font-bold';
    if (place <= 3) return 'text-orange-600 font-semibold';
    if (place <= 10) return 'text-blue-600 font-medium';
    return 'text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">최근 매치</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">
            최근 매치 정보를 불러오는 중...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">최근 매치</h2>
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">
            최근 매치 정보를 불러올 수 없습니다.
          </p>
          <p className="text-gray-500 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!recentMatches || recentMatches.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">최근 매치</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">최근 매치 정보가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">최근 매치</h2>
      <div className="space-y-4">
        {recentMatches.map((match: RecentMatch, index: number) => (
          <div
            key={`${match.matchId}-${index}`}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {/* 매치 헤더 */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {getGameModeDisplayName(match.gameMode)} -{' '}
                  {getMapDisplayName(match.mapName)}
                </h3>
                <p className="text-sm text-gray-500">
                  {match.matchId.slice(0, 8)}...
                </p>
              </div>
              <div className="text-right">
                <span className={`text-lg ${getPlaceColor(match.team.rank)}`}>
                  {match.team.rank}위
                </span>
                {match.team.won === 'true' && (
                  <div className="text-yellow-600 font-bold text-sm">승리!</div>
                )}
              </div>
            </div>

            {/* 성과 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {match.performance.kills}
                </div>
                <div className="text-xs text-gray-500">킬</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {match.performance.assists}
                </div>
                <div className="text-xs text-gray-500">어시스트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatNumber(match.performance.damage)}
                </div>
                <div className="text-xs text-gray-500">데미지</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {formatTime(match.performance.survivalTime)}
                </div>
                <div className="text-xs text-gray-500">생존시간</div>
              </div>
            </div>

            {/* 상세 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div className="bg-gray-50 rounded px-3 py-2">
                <div className="text-gray-500 text-xs mb-1">헤드샷 킬</div>
                <div className="font-semibold text-gray-800">
                  {match.performance.headshotKills}
                </div>
              </div>
              <div className="bg-gray-50 rounded px-3 py-2">
                <div className="text-gray-500 text-xs mb-1">최장 킬 거리</div>
                <div className="font-semibold text-gray-800">
                  {formatDistance(match.performance.longestKill)}
                </div>
              </div>
              <div className="bg-gray-50 rounded px-3 py-2">
                <div className="text-gray-500 text-xs mb-1">킬 스트릭</div>
                <div className="font-semibold text-gray-800">
                  {match.performance.killStreaks}
                </div>
              </div>
              <div className="bg-gray-50 rounded px-3 py-2">
                <div className="text-gray-500 text-xs mb-1">이동 거리</div>
                <div className="font-semibold text-gray-800">
                  {formatDistance(match.movement.totalDistance)}
                </div>
              </div>
              <div className="bg-gray-50 rounded px-3 py-2">
                <div className="text-gray-500 text-xs mb-1">부스트 사용</div>
                <div className="font-semibold text-gray-800">
                  {match.items.boosts}
                </div>
              </div>
              <div className="bg-gray-50 rounded px-3 py-2">
                <div className="text-gray-500 text-xs mb-1">무기 획득</div>
                <div className="font-semibold text-gray-800">
                  {match.items.weaponsAcquired}
                </div>
              </div>
            </div>

            {/* 팀 정보 */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-blue-50 rounded px-3 py-2">
                  <div className="text-blue-600 text-xs mb-1">팀 ID</div>
                  <div className="font-semibold text-blue-800">
                    {match.team.teamId}
                  </div>
                </div>
                <div className="bg-green-50 rounded px-3 py-2">
                  <div className="text-green-600 text-xs mb-1">부활</div>
                  <div className="font-semibold text-green-800">
                    {match.team.revives}
                  </div>
                </div>
                <div className="bg-orange-50 rounded px-3 py-2">
                  <div className="text-orange-600 text-xs mb-1">다운</div>
                  <div className="font-semibold text-orange-800">
                    {match.team.DBNOs}
                  </div>
                </div>
                <div className="bg-red-50 rounded px-3 py-2">
                  <div className="text-red-600 text-xs mb-1">팀킬</div>
                  <div className="font-semibold text-red-800">
                    {match.team.teamKills}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
