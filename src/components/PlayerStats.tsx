'use client';

import type { RankedGameModeStats, GameModeStats } from '~/models/playerStats';

interface PlayerStatsProps {
  playerName: string;
  platform: string;
  stats: RankedGameModeStats;
  onNewSearch: () => void;
}

export default function PlayerStats({
  playerName,
  platform,
  stats,
  onNewSearch,
}: PlayerStatsProps) {
  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    return num.toLocaleString();
  };

  const formatPercentage = (num: number) => {
    return (num * 100).toFixed(1) + '%';
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze':
        return 'text-amber-700';
      case 'silver':
        return 'text-gray-600';
      case 'gold':
        return 'text-yellow-600';
      case 'platinum':
        return 'text-cyan-600';
      case 'diamond':
        return 'text-purple-600';
      case 'master':
        return 'text-pink-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {playerName}의 통계
          </h1>
          <p className="text-gray-600 mb-6">
            플랫폼: {platform === 'steam' ? '스팀' : '카카오'}
          </p>
          <button
            onClick={onNewSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-200 shadow-lg"
          >
            새로운 검색
          </button>
        </div>

        {/* 게임 모드 탭 */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                카카오
              </h2>
              {stats.all && (
                <GameModeStats
                  stats={stats.all}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                  formatTime={formatTime}
                />
              )}
            </div>
            {stats.squad && (
              <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  스쿼드
                </h2>
                <GameModeStats
                  stats={stats.squad}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                  formatTime={formatTime}
                />
              </div>
            )}
            {stats['squad-fpp'] && platform === 'steam' && (
              <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  스쿼드 FPP
                </h2>
                <GameModeStats
                  stats={stats['squad-fpp']}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                  formatTime={formatTime}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface GameModeStatsProps {
  stats: GameModeStats;
  getTierColor: (tier: string) => string;
  formatNumber: (num: number) => string;
  formatPercentage: (num: number) => string;
  formatTime: (seconds: number) => string;
}

function GameModeStats({
  stats,
  getTierColor,
  formatNumber,
  formatPercentage,
  formatTime,
}: GameModeStatsProps) {
  return (
    <div className="space-y-4">
      {/* 주요 통계 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div
            className={`text-lg font-bold ${getTierColor(
              stats.currentTier.tier
            )}`}
          >
            {stats.currentTier.tier} {stats.currentTier.subTier}
          </div>
          <div className="text-sm text-gray-600">현재 티어</div>
          <div className="text-xs text-gray-500">
            {formatNumber(stats.currentRankPoint)} RP
          </div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div
            className={`text-lg font-bold ${getTierColor(stats.bestTier.tier)}`}
          >
            {stats.bestTier.tier} {stats.bestTier.subTier}
          </div>
          <div className="text-sm text-gray-600">최고 티어</div>
          <div className="text-xs text-gray-500">
            {formatNumber(stats.bestRankPoint)} RP
          </div>
        </div>
      </div>

      {/* KDA & 승률 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">
            {stats.kda.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">KDA</div>
          <div className="text-xs text-gray-500">
            {stats.kills}K/{stats.deaths}D/{stats.assists}A
          </div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">
            {formatPercentage(stats.winRatio)}
          </div>
          <div className="text-sm text-gray-600">승률</div>
          <div className="text-xs text-gray-500">
            {stats.wins}승/{stats.roundsPlayed}게임
          </div>
        </div>
      </div>

      {/* 게임 통계 */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">총 게임</span>
          <span className="font-semibold text-gray-900">
            {formatNumber(stats.roundsPlayed)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">평균 순위</span>
          <span className="font-semibold text-gray-900">
            {stats.avgRank.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Top 10 비율</span>
          <span className="font-semibold text-gray-900">
            {formatPercentage(stats.top10Ratio)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">총 킬</span>
          <span className="font-semibold text-gray-900">
            {formatNumber(stats.kills)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">헤드샷 킬</span>
          <span className="font-semibold text-gray-900">
            {formatNumber(stats.headshotKills)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">헤드샷 비율</span>
          <span className="font-semibold text-gray-900">
            {formatPercentage(stats.headshotKillRatio)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">데미지</span>
          <span className="font-semibold text-gray-900">
            {formatNumber(stats.damageDealt)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">평균 생존 시간</span>
          <span className="font-semibold text-gray-900">
            {formatTime(stats.avgSurvivalTime)}
          </span>
        </div>
      </div>
    </div>
  );
}
