import Link from 'next/link';
import GameModeStats from './GameModeStats';
import StatCard from './card/StatCard';
import ErrorCard from './card/ErrorCard';
import {
  formatNumber,
  formatPercentage,
  getTierColor,
} from '~/utils/matchUtils';
import { fetchPlayerRankStats } from './hooks/usePlayerStats';

interface PlayerStatsProps {
  playerName: string;
  platform: string;
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

export default async function PlayerStats({
  playerName,
  platform,
}: PlayerStatsProps) {
  const rankStats = await fetchPlayerRankStats({ platform, playerName });

  if (rankStats && 'statusCode' in rankStats) {
    return (
      <ErrorCard
        title="플레이어 정보 없음"
        message="해당 플레이어의 정보를 찾을 수 없습니다."
      />
    );
  }

  // 타입 가드: rankStats가 유효한 데이터인지 확인
  if (!rankStats || 'statusCode' in rankStats) {
    return (
      <ErrorCard
        title="플레이어 정보 없음"
        message="해당 플레이어의 정보를 찾을 수 없습니다."
      />
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <HeaderComponent
          playerName={playerName}
          platform={platform}
          banType={rankStats.banType}
        />

        {/* 게임 모드 탭 */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            {rankStats.all && (
              <StatCard title="랭크">
                <GameModeStats
                  stats={rankStats.all}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                />
              </StatCard>
            )}
            {rankStats.duo && (
              <StatCard title="듀오">
                <GameModeStats
                  stats={rankStats.duo}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                />
              </StatCard>
            )}
            {rankStats.squad && (
              <StatCard title="스쿼드">
                <GameModeStats
                  stats={rankStats.squad}
                  getTierColor={getTierColor}
                  formatNumber={formatNumber}
                  formatPercentage={formatPercentage}
                />
              </StatCard>
            )}
            {rankStats['squad-fpp'] && platform === 'steam' && (
              <StatCard title="스쿼드 FPP">
                <GameModeStats
                  stats={rankStats['squad-fpp']}
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
