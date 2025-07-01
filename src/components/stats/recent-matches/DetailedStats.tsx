import { formatDistance } from '~/utils/matchUtils';

interface DetailedStatsProps {
  headshotKills: number;
  longestKill: number;
  killStreaks: number;
  totalDistance: number;
  boosts: number;
  weaponsAcquired: number;
}

export default function DetailedStats({
  headshotKills,
  longestKill,
  killStreaks,
  totalDistance,
  boosts,
  weaponsAcquired,
}: DetailedStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
      <div className="bg-gray-50 rounded px-3 py-2">
        <div className="text-gray-500 text-xs mb-1">헤드샷 킬</div>
        <div className="font-semibold text-gray-800">{headshotKills}</div>
      </div>
      <div className="bg-gray-50 rounded px-3 py-2">
        <div className="text-gray-500 text-xs mb-1">최장 킬 거리</div>
        <div className="font-semibold text-gray-800">
          {formatDistance(longestKill)}
        </div>
      </div>
      <div className="bg-gray-50 rounded px-3 py-2">
        <div className="text-gray-500 text-xs mb-1">연속 킬</div>
        <div className="font-semibold text-gray-800">{killStreaks}</div>
      </div>
      <div className="bg-gray-50 rounded px-3 py-2">
        <div className="text-gray-500 text-xs mb-1">이동 거리</div>
        <div className="font-semibold text-gray-800">
          {formatDistance(totalDistance)}
        </div>
      </div>
      <div className="bg-gray-50 rounded px-3 py-2">
        <div className="text-gray-500 text-xs mb-1">부스트 사용</div>
        <div className="font-semibold text-gray-800">{boosts}</div>
      </div>
      <div className="bg-gray-50 rounded px-3 py-2">
        <div className="text-gray-500 text-xs mb-1">무기 획득</div>
        <div className="font-semibold text-gray-800">{weaponsAcquired}</div>
      </div>
    </div>
  );
}
