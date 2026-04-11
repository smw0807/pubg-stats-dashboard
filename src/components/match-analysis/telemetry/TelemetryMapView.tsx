'use client';

import { useRef, useEffect, useState } from 'react';
import { useTelemetryMovement } from '../hooks/useTelemetryMovement';
import { useTelemetryKills } from '../hooks/useTelemetryKills';
import { useTelemetryGroggy } from '../hooks/useTelemetryGroggy';
import { useTelemetryDamage } from '../hooks/useTelemetryDamage';

interface Props {
  platform: string;
  matchId: string;
  playerName: string;
  mapName: string;
}

// 맵별 게임 월드 크기 (cm 단위)
const MAP_SIZES: Record<string, number> = {
  Baltic_Main: 816000, // 에란겔
  Desert_Main: 816000, // 미라마
  Tiger_Main: 816000, // 태이고
  Neon_Main: 612000, // 론도
  Savage_Main: 408000, // 사녹
  DihorOtok_Main: 612000, // 비켄디
  Heaven_Main: 204000, // 헤이븐
  Summerland_Main: 204000, // 카라킨
  Chimera_Main: 408000, // 파라모
};

// 맵 이미지 경로
const MAP_IMAGES: Record<string, string> = {
  Baltic_Main: '/maps/erangel.png',
  Desert_Main: '/maps/miramar.png',
  Tiger_Main: '/maps/taego.png',
  Neon_Main: '/maps/Rondo.png',
};

const CANVAS_SIZE = 700;

interface Layers {
  movement: boolean;
  kills: boolean;
  groggy: boolean;
  damage: boolean;
}

export default function TelemetryMapView({
  platform,
  matchId,
  playerName,
  mapName,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapImgRef = useRef<HTMLImageElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [layers, setLayers] = useState<Layers>({
    movement: true,
    kills: true,
    groggy: true,
    damage: false,
  });

  const mapSize = MAP_SIZES[mapName] ?? 816000;
  const mapImageSrc = MAP_IMAGES[mapName];

  // 이동경로: 현재 플레이어만
  const { data: movementData, isLoading: movLoading } = useTelemetryMovement(
    platform,
    matchId,
    playerName
  );
  // 킬/기절: 전체 매치 데이터 (지도에서 전체 상황 파악)
  const { data: killData, isLoading: killLoading } = useTelemetryKills(
    platform,
    matchId
  );
  const { data: groggyData, isLoading: groggyLoading } = useTelemetryGroggy(
    platform,
    matchId
  );
  // 데미지: 현재 플레이어 기준
  const { data: damageData, isLoading: dmgLoading } = useTelemetryDamage(
    platform,
    matchId,
    playerName
  );

  const isLoading = movLoading || killLoading || groggyLoading || dmgLoading;

  // 맵 이미지 로드
  useEffect(() => {
    if (!mapImageSrc) return;
    const img = new Image();
    img.src = mapImageSrc;
    img.onload = () => {
      mapImgRef.current = img;
      setMapLoaded(true);
    };
    img.onerror = () => setMapLoaded(false);
  }, [mapImageSrc]);

  // 캔버스 그리기
  useEffect(() => {
    if (!mapLoaded || !canvasRef.current || !mapImgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const toCanvas = (x: number, y: number) => ({
      cx: (x / mapSize) * CANVAS_SIZE,
      cy: (y / mapSize) * CANVAS_SIZE,
    });

    // 초기화
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // 맵 이미지 그리기
    ctx.drawImage(mapImgRef.current, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // 맵 위 반투명 오버레이로 시인성 향상
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // ── 데미지 레이어 (가장 아래)
    if (layers.damage && damageData) {
      damageData.forEach((entry) => {
        if (!entry.victim?.location) return;
        const { cx, cy } = toCanvas(
          entry.victim.location.x,
          entry.victim.location.y
        );
        const isMyDmg = entry.attacker?.name === playerName;
        ctx.beginPath();
        ctx.fillStyle = isMyDmg
          ? 'rgba(251, 191, 36, 0.9)'
          : 'rgba(251, 191, 36, 0.35)';
        ctx.arc(cx, cy, isMyDmg ? 3 : 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // ── 기절 레이어
    if (layers.groggy && groggyData) {
      groggyData.forEach((entry) => {
        if (!entry.victim?.location) return;
        const { cx: vx, cy: vy } = toCanvas(
          entry.victim.location.x,
          entry.victim.location.y
        );
        const isMyKnock = entry.attacker?.name === playerName;
        const isMyDown = entry.victim.name === playerName;

        const size = isMyKnock || isMyDown ? 7 : 5;
        const color = isMyDown
          ? '#f97316'
          : isMyKnock
          ? '#60a5fa'
          : '#fbbf24';

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        ctx.lineWidth = 1;
        ctx.moveTo(vx, vy - size);
        ctx.lineTo(vx + size, vy);
        ctx.lineTo(vx, vy + size);
        ctx.lineTo(vx - size, vy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });
    }

    // ── 킬 레이어
    if (layers.kills && killData) {
      killData.forEach((entry) => {
        if (!entry.killer?.location || !entry.victim?.location) return;
        const { cx: kx, cy: ky } = toCanvas(
          entry.killer.location.x,
          entry.killer.location.y
        );
        const { cx: vx, cy: vy } = toCanvas(
          entry.victim.location.x,
          entry.victim.location.y
        );
        const isMyKill = entry.killer.name === playerName;
        const isMyDeath = entry.victim.name === playerName;

        // 킬러 → 피해자 선
        ctx.beginPath();
        ctx.strokeStyle = isMyKill
          ? 'rgba(96, 165, 250, 0.7)'
          : 'rgba(239, 68, 68, 0.25)';
        ctx.lineWidth = isMyKill || isMyDeath ? 1.5 : 0.8;
        ctx.moveTo(kx, ky);
        ctx.lineTo(vx, vy);
        ctx.stroke();

        // 킬러 위치 점
        ctx.beginPath();
        ctx.fillStyle = isMyKill
          ? '#3b82f6'
          : isMyDeath
          ? '#f97316'
          : '#ef4444';
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.lineWidth = 1;
        ctx.arc(kx, ky, isMyKill || isMyDeath ? 5 : 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 피해자 위치 X 표시
        const xSize = isMyKill || isMyDeath ? 5 : 3;
        ctx.strokeStyle = isMyDeath
          ? '#f97316'
          : isMyKill
          ? '#60a5fa'
          : '#ef4444';
        ctx.lineWidth = isMyKill || isMyDeath ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.moveTo(vx - xSize, vy - xSize);
        ctx.lineTo(vx + xSize, vy + xSize);
        ctx.moveTo(vx + xSize, vy - xSize);
        ctx.lineTo(vx - xSize, vy + xSize);
        ctx.stroke();
      });
    }

    // ── 이동경로 레이어 (가장 위)
    if (layers.movement && movementData && movementData.length > 0) {
      const sorted = [...movementData].sort(
        (a, b) => a.elapsedTime - b.elapsedTime
      );

      // 경로 선
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.85)';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      sorted.forEach((point, i) => {
        const { cx, cy } = toCanvas(point.location.x, point.location.y);
        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.stroke();

      // 시작점 (녹색 원)
      const first = sorted[0];
      const { cx: sx, cy: sy } = toCanvas(
        first.location.x,
        first.location.y
      );
      ctx.beginPath();
      ctx.fillStyle = '#22c55e';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.arc(sx, sy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('S', sx, sy);

      // 종료점 (빨간 원)
      const last = sorted[sorted.length - 1];
      const { cx: ex, cy: ey } = toCanvas(last.location.x, last.location.y);
      ctx.beginPath();
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.arc(ex, ey, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('E', ex, ey);
    }
  }, [
    mapLoaded,
    movementData,
    killData,
    groggyData,
    damageData,
    layers,
    mapSize,
    playerName,
  ]);

  const toggleLayer = (layer: keyof Layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const LAYER_CONFIG: {
    key: keyof Layers;
    label: string;
    color: string;
    count?: number;
  }[] = [
    {
      key: 'movement',
      label: '이동경로',
      color: '#22c55e',
      count: movementData?.length,
    },
    {
      key: 'kills',
      label: '킬',
      color: '#ef4444',
      count: killData?.length,
    },
    {
      key: 'groggy',
      label: '기절',
      color: '#fbbf24',
      count: groggyData?.length,
    },
    {
      key: 'damage',
      label: '데미지',
      color: '#f97316',
      count: damageData?.length,
    },
  ];

  if (!mapImageSrc) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        지원하지 않는 맵입니다.{mapName ? ` (${mapName})` : ''}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 레이어 토글 버튼 */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
          레이어:
        </span>
        {LAYER_CONFIG.map(({ key, label, color, count }) => (
          <button
            key={key}
            onClick={() => toggleLayer(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
              layers[key]
                ? 'bg-white dark:bg-gray-700 shadow-sm opacity-100'
                : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-40'
            }`}
            style={{
              borderColor: layers[key] ? color : undefined,
              color: layers[key] ? color : undefined,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
              style={{ backgroundColor: color }}
            />
            {label}
            {count !== undefined && (
              <span className="text-xs opacity-70">({count})</span>
            )}
          </button>
        ))}
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
        )}
      </div>

      {/* 캔버스 영역 */}
      <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-900">
        {!mapLoaded && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="w-full h-auto block"
          style={{ display: mapLoaded ? 'block' : 'none' }}
        />
      </div>

      {/* 범례 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-[8px]">
            S
          </span>
          <span>이동 시작점</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-[8px]">
            E
          </span>
          <span>이동 종료점</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-blue-500 inline-block" />
          <span>내 킬 위치</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-orange-500 inline-block" />
          <span>내 사망/기절 위치</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-red-500 font-bold text-sm">✕</span>
          <span>피해자 위치</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-500 font-bold text-sm">◆</span>
          <span>기절 위치</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-red-400 inline-block" />
          <span>킬 사거리</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-yellow-400 opacity-70 inline-block" />
          <span>데미지 위치</span>
        </div>
      </div>
    </div>
  );
}
