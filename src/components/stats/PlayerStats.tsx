import Link from 'next/link';
import type { RankedGameModeStats } from '~/models/playerStats';
import GameModeStats from './GameModeStats';
import {
  formatNumber,
  formatPercentage,
  getTierColor,
} from '~/utils/matchUtils';

interface PlayerStatsProps {
  playerName: string;
  platform: string;
  stats: RankedGameModeStats;
}

export default function PlayerStats({
  playerName,
  platform,
  stats,
}: PlayerStatsProps) {
  const banTypeName = () => {
    switch (stats.banType) {
      case 'Innocent':
        return '';
      case 'TemporaryBan':
        return (
          <span className="text-yellow-500 dark:text-yellow-400">
            (임시정지)
          </span>
        );
      case 'PermanentBan':
        return (
          <span className="text-red-500 dark:text-red-400">(영구정지)</span>
        );
    }
  };
  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {playerName}의 통계 {banTypeName()}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            플랫폼: {platform === 'steam' ? '스팀' : '카카오'}
          </p>

          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition duration-200 shadow-lg">
              새로운 검색
            </button>
          </Link>
        </div>

        {/* 게임 모드 탭 */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[300px] border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[300px] border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-[300px] border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
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
