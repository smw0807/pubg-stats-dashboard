'use client';

import type { RankedGameModeStats } from '~/models/playerStats';
import GameModeStats from './GameModeStats';

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
        return 'text-red-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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
                랭크
              </h2>
              {stats.all && (
                <GameModeStats
                  stats={stats.all}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
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
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
