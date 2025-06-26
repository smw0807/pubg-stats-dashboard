interface TeamStatsProps {
  teamId: number;
  revives: number;
  DBNOs: number;
  teamKills: number;
}

export default function TeamStats({
  teamId,
  revives,
  DBNOs,
  teamKills,
}: TeamStatsProps) {
  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div className="bg-blue-50 rounded px-3 py-2">
          <div className="text-blue-600 text-xs mb-1">팀 ID</div>
          <div className="font-semibold text-blue-800">{teamId}</div>
        </div>
        <div className="bg-green-50 rounded px-3 py-2">
          <div className="text-green-600 text-xs mb-1">부활</div>
          <div className="font-semibold text-green-800">{revives}</div>
        </div>
        <div className="bg-orange-50 rounded px-3 py-2">
          <div className="text-orange-600 text-xs mb-1">다운</div>
          <div className="font-semibold text-orange-800">{DBNOs}</div>
        </div>
        <div className="bg-red-50 rounded px-3 py-2">
          <div className="text-red-600 text-xs mb-1">팀킬</div>
          <div className="font-semibold text-red-800">{teamKills}</div>
        </div>
      </div>
    </div>
  );
}
