'use client';

import type { MouseEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
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
import type {
  DamageLogData,
  GroggyLogData,
  KillLogData,
  MovementLogData,
} from '~/models/telemetry';
import { TooltipBox } from './MapTooltip';

interface Props {
  mapName: string;
  playerName: string;
  movementData?: MovementLogData;
  killData?: KillLogData;
  groggyData?: GroggyLogData;
  damageData?: DamageLogData;
}

export default function LogMapCanvas({
  mapName,
  playerName,
  movementData,
  killData,
  groggyData,
  damageData,
}: Props) {
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

  const layers = useMemo<TelemetryLayerState>(
    () => ({
      movement: !!movementData,
      kills: !!killData,
      groggy: !!groggyData,
      damage: !!damageData,
    }),
    [damageData, groggyData, killData, movementData]
  );

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
      {tooltip && <TooltipBox tooltip={tooltip} canvasWidth={canvasCssWidth} />}
    </div>
  );
}
