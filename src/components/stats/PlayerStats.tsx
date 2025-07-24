import Link from 'next/link';
import type { RankedGameModeStats } from '~/models/playerStats';
import GameModeStats from './GameModeStats';
import StatCard from './card/StatCard';
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

function HeaderComponent({
  playerName,
  platform,
  banType,
}: {
  playerName: string;
  platform: string;
  banType: string;
}) {
  const banTypeName = () => {
    switch (banType) {
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
  );
}

export default function PlayerStats({
  playerName,
  platform,
  stats,
}: PlayerStatsProps) {
  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <HeaderComponent
          playerName={playerName}
          platform={platform}
          banType={stats.banType}
        />

        {/* 게임 모드 탭 */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            {stats.all && (
              <StatCard title="랭크">
                <GameModeStats
                  stats={stats.all}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                />
              </StatCard>
            )}
            {stats.duo && (
              <StatCard title="듀오">
                <GameModeStats
                  stats={stats.duo}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                />
              </StatCard>
            )}
            {stats.squad && (
              <StatCard title="스쿼드">
                <GameModeStats
                  stats={stats.squad}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                />
              </StatCard>
            )}
            {stats['squad-fpp'] && platform === 'steam' && (
              <StatCard title="스쿼드 FPP">
                <GameModeStats
                  stats={stats['squad-fpp']}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                />
              </StatCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
