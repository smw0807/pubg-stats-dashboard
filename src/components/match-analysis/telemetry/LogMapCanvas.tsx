'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type {
  MovementLogData,
  KillLogData,
  GroggyLogData,
  DamageLogData,
  MovementLogEntry,
} from '~/models/telemetry';
import { TooltipBox } from './MapTooltip';
import type { TooltipInfo } from './MapTooltip';

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

interface Props {
  mapName: string;
  playerName: string;
  movementData?: MovementLogData;
  killData?: KillLogData;
  groggyData?: GroggyLogData;
  damageData?: DamageLogData;
}

// ── 메인 컴포넌트 ──────────────────────────────────────

export default function LogMapCanvas({
  mapName,
  playerName,
  movementData,
  killData,
  groggyData,
  damageData,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapImgRef = useRef<HTMLImageElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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

  // 마우스 휠 줌
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

    ctx.drawImage(mapImgRef.current, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // ── 데미지
    if (damageData) {
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

    // ── 기절
    if (groggyData) {
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

    // ── 킬
    if (killData) {
      killData.forEach((e) => {
        if (!e.killer?.location || !e.victim?.location) return;
        const { cx: kx, cy: ky } = toC(e.killer.location.x, e.killer.location.y);
        const { cx: vx, cy: vy } = toC(e.victim.location.x, e.victim.location.y);
        const isMyKill = e.killer.name === playerName;
        const isMyDeath = e.victim.name === playerName;

        ctx.beginPath();
        ctx.strokeStyle = isMyKill ? 'rgba(96,165,250,0.7)' : 'rgba(239,68,68,0.25)';
        ctx.lineWidth = (isMyKill || isMyDeath ? 1.5 : 0.8) / zoom;
        ctx.moveTo(kx, ky);
        ctx.lineTo(vx, vy);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = isMyKill ? '#3b82f6' : isMyDeath ? '#f97316' : '#ef4444';
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.lineWidth = 1 / zoom;
        ctx.arc(kx, ky, (isMyKill || isMyDeath ? 5 : 3) / zoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

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

    // ── 이동경로
    if (movementData && movementData.length > 0) {
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
  }, [mapLoaded, movementData, killData, groggyData, damageData, mapSize, playerName, zoom, offset]);

  // 드래그
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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
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

      if (!found && killData) {
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

      if (!found && groggyData) {
        for (const entry of groggyData) {
          if (!entry.victim?.location) continue;
          const v = tc(entry.victim.location.x, entry.victim.location.y);
          if (d2(cx, cy, v.px, v.py) < hitRadius) {
            found = { x: cssX, y: cssY, info: { type: 'groggy', data: entry } };
            break;
          }
        }
      }

      if (!found && damageData) {
        for (const entry of damageData) {
          if (!entry.victim?.location) continue;
          const v = tc(entry.victim.location.x, entry.victim.location.y);
          if (d2(cx, cy, v.px, v.py) < hitRadius) {
            found = { x: cssX, y: cssY, info: { type: 'damage', data: entry } };
            break;
          }
        }
      }

      if (!found && movementData) {
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
    },
    [killData, groggyData, damageData, movementData, mapSize, applyZoom]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    setDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    setDragging(false);
    setTooltip(null);
  }, []);

  const zoomAt = useCallback(
    (factor: number) => {
      const cx = CANVAS_SIZE / 2;
      const cy = CANVAS_SIZE / 2;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomRef.current * factor));
      const ratio = newZoom / zoomRef.current;
      const clamped = {
        x: Math.min(0, Math.max(CANVAS_SIZE * (1 - newZoom), cx - ratio * (cx - offsetRef.current.x))),
        y: Math.min(0, Math.max(CANVAS_SIZE * (1 - newZoom), cy - ratio * (cy - offsetRef.current.y))),
      };
      applyZoom(newZoom, clamped);
    },
    [applyZoom]
  );

  const resetView = useCallback(() => applyZoom(1, { x: 0, y: 0 }), [applyZoom]);

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

      {/* 줌 레벨 */}
      <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded font-mono">
        {Math.round(zoom * 100)}%
      </div>

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
      {tooltip && <TooltipBox tooltip={tooltip} canvasWidth={canvasCssWidth} />}
    </div>
  );
}
