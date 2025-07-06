import { formatNumber, formatTime } from '~/utils/matchUtils';

interface PerformanceStatsProps {
  kills: number;
  assists: number;
  damage: number;
  survivalTime: number;
}

export default function PerformanceStats({
  kills,
  assists,
  damage,
  survivalTime,
}: PerformanceStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
          {kills}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">킬</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {assists}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">어시스트</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
          {formatNumber(damage)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">데미지</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {formatTime(survivalTime)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">생존시간</div>
      </div>
    </div>
  );
}
