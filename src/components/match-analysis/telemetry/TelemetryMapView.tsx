'use client';

import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import {
  useTelemetryDamage,
  useTelemetryGroggy,
  useTelemetryKills,
  useTelemetryMovement,
} from '~/features/match-analysis/queries';
import { drawTelemetryLayers } from '~/features/match-analysis/telemetry/drawTelemetryLayers';
import { findTelemetryTooltip } from '~/features/match-analysis/telemetry/hitTestTelemetry';
import {
  getTelemetryMapImageSrc,
  getTelemetryMapSize,
  TELEMETRY_CANVAS_SIZE,
  TELEMETRY_ZOOM_STEP,
} from '~/features/match-analysis/telemetry/mapConfig';
import type {
  TelemetryLayerState,
  TooltipInfo,
} from '~/features/match-analysis/telemetry/types';
import { useCanvasViewport } from '~/features/match-analysis/telemetry/useCanvasViewport';
import { useTelemetryMapImage } from '~/features/match-analysis/telemetry/useTelemetryMapImage';
import { TooltipBox } from './MapTooltip';

interface Props {
  platform: string;
  matchId: string;
  playerName: string;
  mapName: string;
}

const DEFAULT_LAYERS: TelemetryLayerState = {
  movement: true,
  kills: true,
  groggy: true,
  damage: false,
};

export default function TelemetryMapView({
  platform,
  matchId,
  playerName,
  mapName,
}: Props) {
  const [layers, setLayers] = useState<TelemetryLayerState>(DEFAULT_LAYERS);
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
  const [canvasCssWidth, setCanvasCssWidth] = useState(0);

  const mapSize = getTelemetryMapSize(mapName);
  const mapImageSrc = getTelemetryMapImageSrc(mapName);
  const { mapImage, mapLoaded } = useTelemetryMapImage(mapImageSrc);
  const {
    canvasRef,
    zoom,
    offset,
    dragging,
    getPointerState,
    startDrag,
    dragByPointerMove,
    stopDrag,
    zoomAt,
    resetView,
  } = useCanvasViewport(mapLoaded);

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

  useEffect(() => {
    if (!mapLoaded || !canvasRef.current || !mapImage) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    drawTelemetryLayers({
      ctx,
      mapImage,
      mapSize,
      playerName,
      zoom,
      offset,
      layers,
      movementData,
      killData,
      groggyData,
      damageData,
    });
  }, [
    canvasRef,
    damageData,
    groggyData,
    killData,
    layers,
    mapImage,
    mapLoaded,
    mapSize,
    movementData,
    offset,
    playerName,
    zoom,
  ]);

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    setTooltip(null);
    startDrag(event);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (dragByPointerMove(event)) return;

    const pointer = getPointerState(event.clientX, event.clientY);
    if (!pointer) return;

    setCanvasCssWidth(pointer.canvasCssWidth);
    setTooltip(
      findTelemetryTooltip({
        point: pointer.worldPoint,
        cssPoint: pointer.cssPoint,
        hitRadius: pointer.hitRadius,
        layers,
        mapSize,
        movementData,
        killData,
        groggyData,
        damageData,
      })
    );
  };

  const handleMouseLeave = () => {
    stopDrag();
    setTooltip(null);
  };

  const toggleLayer = (layer: keyof TelemetryLayerState) =>
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));

  const layerConfig: {
    key: keyof TelemetryLayerState;
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
    { key: 'kills', label: '킬', color: '#ef4444', count: killData?.length },
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

  const cursor =
    zoom > 1 ? (dragging ? 'grabbing' : 'grab') : tooltip ? 'pointer' : 'crosshair';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
          레이어:
        </span>
        {layerConfig.map(({ key, label, color, count }) => (
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
              className="w-2.5 h-2.5 rounded-full shrink-0"
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

      <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-900">
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
          <button
            onClick={() => zoomAt(TELEMETRY_ZOOM_STEP)}
            className="w-8 h-8 bg-white/90 dark:bg-gray-700/90 rounded shadow text-lg font-bold text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 flex items-center justify-center"
            title="확대"
          >
            +
          </button>
          <button
            onClick={() => zoomAt(1 / TELEMETRY_ZOOM_STEP)}
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
          width={TELEMETRY_CANVAS_SIZE}
          height={TELEMETRY_CANVAS_SIZE}
          className="w-full h-auto block select-none"
          style={{ display: mapLoaded ? 'block' : 'none', cursor }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={handleMouseLeave}
        />
        {tooltip && (
          <TooltipBox tooltip={tooltip} canvasWidth={canvasCssWidth} />
        )}
      </div>

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
