'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useTelemetryMovement } from '../hooks/useTelemetryMovement';
import { useTelemetryKills } from '../hooks/useTelemetryKills';
import { useTelemetryGroggy } from '../hooks/useTelemetryGroggy';
import { useTelemetryDamage } from '../hooks/useTelemetryDamage';
import type { MovementLogEntry } from '~/models/telemetry';
import { TooltipBox } from './MapTooltip';
import type { TooltipInfo } from './MapTooltip';

interface Props {
  platform: string;
  matchId: string;
  playerName: string;
  mapName: string;
}

const MAP_SIZES: Record<string, number> = {
  Baltic_Main: 816000,
  Desert_Main: 816000,
  Tiger_Main: 816000,
  Neon_Main: 612000,
  Savage_Main: 408000,
  DihorOtok_Main: 612000,
  Heaven_Main: 204000,
  Summerland_Main: 204000,
  Chimera_Main: 408000,
};

const MAP_IMAGES: Record<string, string> = {
  Baltic_Main: '/maps/erangel.png',
  Desert_Main: '/maps/miramar.png',
  Tiger_Main: '/maps/taego.png',
  Neon_Main: '/maps/Rondo.png',
};

const CANVAS_SIZE = 700;
const MIN_ZOOM = 1;
const MAX_ZOOM = 12;
const ZOOM_STEP = 1.3;

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

  // 줌 & 패닝 상태 (ref: 이벤트 핸들러 내 최신값, state: 렌더 트리거)
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
  const [canvasCssWidth, setCanvasCssWidth] = useState(0);

  const mapSize = MAP_SIZES[mapName] ?? 816000;
  const mapImageSrc = MAP_IMAGES[mapName];

  const { data: movementData, isLoading: movLoading } = useTelemetryMovement(
    platform,
    matchId,
    playerName
  );
  const { data: killData, isLoading: killLoading } = useTelemetryKills(
    platform,
    matchId
  );
  const { data: groggyData, isLoading: groggyLoading } = useTelemetryGroggy(
    platform,
    matchId
  );
  const { data: damageData, isLoading: dmgLoading } = useTelemetryDamage(
    platform,
    matchId,
    playerName
  );

  const isLoading = movLoading || killLoading || groggyLoading || dmgLoading;

  const applyZoom = useCallback(
    (newZoom: number, newOffset: { x: number; y: number }) => {
      zoomRef.current = newZoom;
      offsetRef.current = newOffset;
      setZoom(newZoom);
      setOffset(newOffset);
    },
    []
  );

  // 맵 이미지 로드
  useEffect(() => {
    if (!mapImageSrc) return;
    setMapLoaded(false);
    const img = new Image();
    img.src = mapImageSrc;
    img.onload = () => {
      mapImgRef.current = img;
      setMapLoaded(true);
    };
  }, [mapImageSrc]);

  // 마우스 휠 줌 (passive:false 필요)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mapLoaded) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (CANVAS_SIZE / rect.width);
      const my = (e.clientY - rect.top) * (CANVAS_SIZE / rect.height);

      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomRef.current * factor));
      const ratio = newZoom / zoomRef.current;

      const clamped = {
        x: Math.min(0, Math.max(CANVAS_SIZE * (1 - newZoom), mx - ratio * (mx - offsetRef.current.x))),
        y: Math.min(0, Math.max(CANVAS_SIZE * (1 - newZoom), my - ratio * (my - offsetRef.current.y))),
      };

      applyZoom(newZoom, clamped);
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, [mapLoaded, applyZoom]);

  // 캔버스 그리기
  useEffect(() => {
    if (!mapLoaded || !canvasRef.current || !mapImgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const toC = (x: number, y: number) => ({
      cx: (x / mapSize) * CANVAS_SIZE,
      cy: (y / mapSize) * CANVAS_SIZE,
    });

    ctx.save();
    ctx.setTransform(zoom, 0, 0, zoom, offset.x, offset.y);

    // 맵 이미지
    ctx.drawImage(mapImgRef.current, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // ── 데미지 레이어
    if (layers.damage && damageData) {
      damageData.forEach((e) => {
        if (!e.victim?.location) return;
        const { cx, cy } = toC(e.victim.location.x, e.victim.location.y);
        const isMe = e.attacker?.name === playerName;
        ctx.beginPath();
        ctx.fillStyle = isMe ? 'rgba(251,191,36,0.9)' : 'rgba(251,191,36,0.35)';
        ctx.arc(cx, cy, (isMe ? 3 : 2) / zoom, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // ── 기절 레이어
    if (layers.groggy && groggyData) {
      groggyData.forEach((e) => {
        if (!e.victim?.location) return;
        const { cx: vx, cy: vy } = toC(e.victim.location.x, e.victim.location.y);
        const isMyKnock = e.attacker?.name === playerName;
        const isMyDown = e.victim.name === playerName;
        const sz = (isMyKnock || isMyDown ? 7 : 5) / zoom;
        const color = isMyDown ? '#f97316' : isMyKnock ? '#60a5fa' : '#fbbf24';

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        ctx.lineWidth = 1 / zoom;
        ctx.moveTo(vx, vy - sz);
        ctx.lineTo(vx + sz, vy);
        ctx.lineTo(vx, vy + sz);
        ctx.lineTo(vx - sz, vy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });
    }

    // ── 킬 레이어
    if (layers.kills && killData) {
      killData.forEach((e) => {
        if (!e.killer?.location || !e.victim?.location) return;
        const { cx: kx, cy: ky } = toC(e.killer.location.x, e.killer.location.y);
        const { cx: vx, cy: vy } = toC(e.victim.location.x, e.victim.location.y);
        const isMyKill = e.killer.name === playerName;
        const isMyDeath = e.victim.name === playerName;

        // 사거리 선
        ctx.beginPath();
        ctx.strokeStyle = isMyKill ? 'rgba(96,165,250,0.7)' : 'rgba(239,68,68,0.25)';
        ctx.lineWidth = (isMyKill || isMyDeath ? 1.5 : 0.8) / zoom;
        ctx.moveTo(kx, ky);
        ctx.lineTo(vx, vy);
        ctx.stroke();

        // 킬러 점
        ctx.beginPath();
        ctx.fillStyle = isMyKill ? '#3b82f6' : isMyDeath ? '#f97316' : '#ef4444';
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.lineWidth = 1 / zoom;
        ctx.arc(kx, ky, (isMyKill || isMyDeath ? 5 : 3) / zoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 피해자 X
        const xs = (isMyKill || isMyDeath ? 5 : 3) / zoom;
        ctx.strokeStyle = isMyDeath ? '#f97316' : isMyKill ? '#60a5fa' : '#ef4444';
        ctx.lineWidth = (isMyKill || isMyDeath ? 2.5 : 1.5) / zoom;
        ctx.beginPath();
        ctx.moveTo(vx - xs, vy - xs);
        ctx.lineTo(vx + xs, vy + xs);
        ctx.moveTo(vx + xs, vy - xs);
        ctx.lineTo(vx - xs, vy + xs);
        ctx.stroke();
      });
    }

    // ── 이동경로 레이어
    if (layers.movement && movementData && movementData.length > 0) {
      const sorted = [...movementData].sort((a, b) => a.elapsedTime - b.elapsedTime);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(34,197,94,0.85)';
      ctx.lineWidth = 2 / zoom;
      ctx.lineJoin = 'round';
      sorted.forEach((pt, i) => {
        const { cx, cy } = toC(pt.location.x, pt.location.y);
        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.stroke();

      // 시작점 S
      const { cx: sx, cy: sy } = toC(sorted[0].location.x, sorted[0].location.y);
      ctx.beginPath();
      ctx.fillStyle = '#22c55e';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2 / zoom;
      ctx.arc(sx, sy, 7 / zoom, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.font = `bold ${9 / zoom}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('S', sx, sy);

      // 종료점 E
      const last = sorted[sorted.length - 1];
      const { cx: ex, cy: ey } = toC(last.location.x, last.location.y);
      ctx.beginPath();
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2 / zoom;
      ctx.arc(ex, ey, 7 / zoom, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.font = `bold ${9 / zoom}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('E', ex, ey);
    }

    ctx.restore();
  }, [
    mapLoaded, movementData, killData, groggyData, damageData,
    layers, mapSize, playerName, zoom, offset,
  ]);

  // 드래그 핸들러
  const getPos = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (CANVAS_SIZE / rect.width),
      y: (clientY - rect.top) * (CANVAS_SIZE / rect.height),
    };
  };

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setTooltip(null);
    if (zoomRef.current <= 1) return;
    isDragging.current = true;
    setDragging(true);
    lastPos.current = getPos(e.clientX, e.clientY);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging.current) {
      const pos = getPos(e.clientX, e.clientY);
      const dx = pos.x - lastPos.current.x;
      const dy = pos.y - lastPos.current.y;
      lastPos.current = pos;
      const z = zoomRef.current;
      const clamped = {
        x: Math.min(0, Math.max(CANVAS_SIZE * (1 - z), offsetRef.current.x + dx)),
        y: Math.min(0, Math.max(CANVAS_SIZE * (1 - z), offsetRef.current.y + dy)),
      };
      applyZoom(z, clamped);
      return;
    }

    // Hover 툴팁 감지
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setCanvasCssWidth(rect.width);
    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;
    const canvasX = cssX * (CANVAS_SIZE / rect.width);
    const canvasY = cssY * (CANVAS_SIZE / rect.height);
    const cx = (canvasX - offsetRef.current.x) / zoomRef.current;
    const cy = (canvasY - offsetRef.current.y) / zoomRef.current;
    const hitRadius = 12 * (CANVAS_SIZE / rect.width) / zoomRef.current;

    const tc = (wx: number, wy: number) => ({
      px: (wx / mapSize) * CANVAS_SIZE,
      py: (wy / mapSize) * CANVAS_SIZE,
    });
    const d2 = (ax: number, ay: number, bx: number, by: number) =>
      Math.hypot(ax - bx, ay - by);

    let found: TooltipInfo | null = null;

    if (!found && layers.kills && killData) {
      for (const entry of killData) {
        if (!entry.killer?.location || !entry.victim?.location) continue;
        const k = tc(entry.killer.location.x, entry.killer.location.y);
        const v = tc(entry.victim.location.x, entry.victim.location.y);
        if (d2(cx, cy, k.px, k.py) < hitRadius || d2(cx, cy, v.px, v.py) < hitRadius) {
          found = { x: cssX, y: cssY, info: { type: 'kill', data: entry } };
          break;
        }
      }
    }

    if (!found && layers.groggy && groggyData) {
      for (const entry of groggyData) {
        if (!entry.victim?.location) continue;
        const v = tc(entry.victim.location.x, entry.victim.location.y);
        if (d2(cx, cy, v.px, v.py) < hitRadius) {
          found = { x: cssX, y: cssY, info: { type: 'groggy', data: entry } };
          break;
        }
      }
    }

    if (!found && layers.damage && damageData) {
      for (const entry of damageData) {
        if (!entry.victim?.location) continue;
        const v = tc(entry.victim.location.x, entry.victim.location.y);
        if (d2(cx, cy, v.px, v.py) < hitRadius) {
          found = { x: cssX, y: cssY, info: { type: 'damage', data: entry } };
          break;
        }
      }
    }

    if (!found && layers.movement && movementData) {
      let minDist = hitRadius;
      let nearest: MovementLogEntry | null = null;
      for (const entry of movementData) {
        const p = tc(entry.location.x, entry.location.y);
        const dist = d2(cx, cy, p.px, p.py);
        if (dist < minDist) {
          minDist = dist;
          nearest = entry;
        }
      }
      if (nearest) found = { x: cssX, y: cssY, info: { type: 'movement', data: nearest } };
    }

    setTooltip(found);
  }, [layers, killData, groggyData, damageData, movementData, mapSize, applyZoom]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    setDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    setDragging(false);
    setTooltip(null);
  }, []);

  // 버튼 줌 (중앙 기준)
  const zoomAt = useCallback((factor: number) => {
    const cx = CANVAS_SIZE / 2;
    const cy = CANVAS_SIZE / 2;
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomRef.current * factor));
    const ratio = newZoom / zoomRef.current;
    const clamped = {
      x: Math.min(0, Math.max(CANVAS_SIZE * (1 - newZoom), cx - ratio * (cx - offsetRef.current.x))),
      y: Math.min(0, Math.max(CANVAS_SIZE * (1 - newZoom), cy - ratio * (cy - offsetRef.current.y))),
    };
    applyZoom(newZoom, clamped);
  }, [applyZoom]);

  const resetView = useCallback(() => applyZoom(1, { x: 0, y: 0 }), [applyZoom]);

  const toggleLayer = (layer: keyof Layers) =>
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));

  const LAYER_CONFIG: { key: keyof Layers; label: string; color: string; count?: number }[] = [
    { key: 'movement', label: '이동경로', color: '#22c55e', count: movementData?.length },
    { key: 'kills', label: '킬', color: '#ef4444', count: killData?.length },
    { key: 'groggy', label: '기절', color: '#fbbf24', count: groggyData?.length },
    { key: 'damage', label: '데미지', color: '#f97316', count: damageData?.length },
  ];

  if (!mapImageSrc) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        지원하지 않는 맵입니다.{mapName ? ` (${mapName})` : ''}
      </div>
    );
  }

  const cursor = zoom > 1
    ? (dragging ? 'grabbing' : 'grab')
    : (tooltip ? 'pointer' : 'crosshair');

  return (
    <div className="space-y-4">
      {/* 레이어 토글 */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">레이어:</span>
        {LAYER_CONFIG.map(({ key, label, color, count }) => (
          <button
            key={key}
            onClick={() => toggleLayer(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
              layers[key]
                ? 'bg-white dark:bg-gray-700 shadow-sm opacity-100'
                : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-40'
            }`}
            style={{ borderColor: layers[key] ? color : undefined, color: layers[key] ? color : undefined }}
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            {label}
            {count !== undefined && <span className="text-xs opacity-70">({count})</span>}
          </button>
        ))}
        {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />}
      </div>

      {/* 캔버스 영역 */}
      <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-900">
        {/* 줌 컨트롤 */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
          <button
            onClick={() => zoomAt(ZOOM_STEP)}
            className="w-8 h-8 bg-white/90 dark:bg-gray-700/90 rounded shadow text-lg font-bold text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 flex items-center justify-center"
            title="확대"
          >
            +
          </button>
          <button
            onClick={() => zoomAt(1 / ZOOM_STEP)}
            className="w-8 h-8 bg-white/90 dark:bg-gray-700/90 rounded shadow text-lg font-bold text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 flex items-center justify-center"
            title="축소"
          >
            −
          </button>
          <button
            onClick={resetView}
            className="w-8 h-8 bg-white/90 dark:bg-gray-700/90 rounded shadow text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 flex items-center justify-center"
            title="초기화"
          >
            ↺
          </button>
        </div>

        {/* 줌 레벨 표시 */}
        <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded font-mono">
          {Math.round(zoom * 100)}%
        </div>

        {/* 조작 안내 */}
        {zoom === 1 && mapLoaded && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white text-xs px-3 py-1 rounded whitespace-nowrap">
            휠로 확대 · 확대 후 드래그로 이동
          </div>
        )}

        {!mapLoaded && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="w-full h-auto block select-none"
          style={{ display: mapLoaded ? 'block' : 'none', cursor }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
        {tooltip && (
          <TooltipBox tooltip={tooltip} canvasWidth={canvasCssWidth} />
        )}
      </div>

      {/* 범례 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-[8px]">S</span>
          <span>이동 시작점</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-[8px]">E</span>
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
