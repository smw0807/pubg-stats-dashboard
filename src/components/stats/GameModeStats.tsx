import type { GameModeStats } from '~/models/playerStats';

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
  console.log('stats', stats);
  return (
    <div className="space-y-4">
      {/* 주요 통계 */}
      {stats.currentTier && (
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
              className={`text-lg font-bold ${getTierColor(
                stats.bestTier.tier
              )}`}
            >
              {stats.bestTier.tier} {stats.bestTier.subTier}
            </div>
            <div className="text-sm text-gray-600">최고 티어</div>
            <div className="text-xs text-gray-500">
              {formatNumber(stats.bestRankPoint)} RP
            </div>
          </div>
        </div>
      )}

      {/* KDA & 승률 */}
      {stats.kda && (
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
      )}

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

export default GameModeStats;
