import { formatNumber, formatTime } from '../utils/matchUtils';

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
        <div className="text-2xl font-bold text-red-600">{kills}</div>
        <div className="text-xs text-gray-500">킬</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{assists}</div>
        <div className="text-xs text-gray-500">어시스트</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">
          {formatNumber(damage)}
        </div>
        <div className="text-xs text-gray-500">데미지</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">
          {formatTime(survivalTime)}
        </div>
        <div className="text-xs text-gray-500">생존시간</div>
      </div>
    </div>
  );
}
