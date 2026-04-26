import type { TooltipInfo } from '~/features/match-analysis/telemetry/types';

export function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m > 0 ? `${m}분 ${s}초` : `${s}초`;
}

export function TooltipBox({
  tooltip,
  canvasWidth,
}: {
  tooltip: TooltipInfo;
  canvasWidth: number;
}) {
  const {x, y, info} = tooltip;
  const flipX = x > canvasWidth * 0.65;

  let header = '';
  let rows: string[] = [];

  if (info.type === 'kill') {
    header = '💀 킬';
    rows = [
      `킬러: ${info.data.killer.name}`,
      `피해자: ${info.data.victim.name}`,
      `무기: ${info.data.weapon}`,
      `거리: ${Math.round(info.data.distance) / 100}m`,
      ...(info.data.isSuicide ? ['(자살)'] : []),
      ...(info.data.assists?.length
        ? [`어시스트: ${info.data.assists.join(', ')}`]
        : []),
    ];
  } else if (info.type === 'groggy') {
    header = '👊 기절(DBNO)';
    rows = [
      `공격자: ${info.data.attacker?.name ?? '알 수 없음'}`,
      `피해자: ${info.data.victim.name}`,
      `무기: ${info.data.weapon}`,
      `거리: ${Math.round(info.data.distance) / 100}m`,
    ];
  } else if (info.type === 'damage') {
    header = '💥 데미지';
    rows = [
      `공격자: ${info.data.attacker?.name ?? '환경/블루존'}`,
      `피해자: ${info.data.victim.name}`,
      `데미지: ${Math.round(info.data.damage)}`,
      `무기: ${info.data.weapon}`,
    ];
  } else {
    header = '👣 이동';
    rows = [
      `체력: ${Math.round(info.data.health)}%`,
      `경과: ${formatElapsed(info.data.elapsedTime)}`,
      `생존자: ${info.data.numAlivePlayers}명`,
    ];
  }

  return (
    <div
      className="absolute z-20 pointer-events-none bg-gray-900/95 text-white text-xs rounded-lg px-3 py-2 shadow-xl border border-gray-600 space-y-0.5"
      style={{
        left: flipX ? x - 14 : x + 14,
        top: Math.max(4, y - 10),
        transform: flipX ? 'translateX(-100%)' : undefined,
        whiteSpace: 'nowrap',
      }}>
      <div className="font-bold text-sm mb-1">{header}</div>
      {rows.map((r, i) => (
        <div key={i} className="text-gray-200">
          {r}
        </div>
      ))}
    </div>
  );
}
