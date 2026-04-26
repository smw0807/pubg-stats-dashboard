'use client';

import type { MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  TELEMETRY_CANVAS_SIZE,
  TELEMETRY_MAX_ZOOM,
  TELEMETRY_MIN_ZOOM,
  TELEMETRY_ZOOM_STEP,
} from './mapConfig';
import type { CanvasPoint } from './types';

const clampOffset = (zoom: number, offset: CanvasPoint) => ({
  x: Math.min(0, Math.max(TELEMETRY_CANVAS_SIZE * (1 - zoom), offset.x)),
  y: Math.min(0, Math.max(TELEMETRY_CANVAS_SIZE * (1 - zoom), offset.y)),
});

export const useCanvasViewport = (mapLoaded: boolean) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<CanvasPoint>({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const offsetRef = useRef<CanvasPoint>({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef<CanvasPoint>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const applyZoom = useCallback((newZoom: number, newOffset: CanvasPoint) => {
    zoomRef.current = newZoom;
    offsetRef.current = newOffset;
    setZoom(newZoom);
    setOffset(newOffset);
  }, []);

  const getPointerState = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const cssPoint = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
    const canvasPoint = {
      x: cssPoint.x * (TELEMETRY_CANVAS_SIZE / rect.width),
      y: cssPoint.y * (TELEMETRY_CANVAS_SIZE / rect.height),
    };

    return {
      canvasPoint,
      cssPoint,
      canvasCssWidth: rect.width,
      worldPoint: {
        x: (canvasPoint.x - offsetRef.current.x) / zoomRef.current,
        y: (canvasPoint.y - offsetRef.current.y) / zoomRef.current,
      },
      hitRadius:
        (12 * (TELEMETRY_CANVAS_SIZE / rect.width)) / zoomRef.current,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mapLoaded) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const pointer = getPointerState(event.clientX, event.clientY);
      if (!pointer) return;

      const factor = event.deltaY < 0 ? TELEMETRY_ZOOM_STEP : 1 / TELEMETRY_ZOOM_STEP;
      const newZoom = Math.min(
        TELEMETRY_MAX_ZOOM,
        Math.max(TELEMETRY_MIN_ZOOM, zoomRef.current * factor)
      );
      const ratio = newZoom / zoomRef.current;
      const newOffset = clampOffset(newZoom, {
        x:
          pointer.canvasPoint.x -
          ratio * (pointer.canvasPoint.x - offsetRef.current.x),
        y:
          pointer.canvasPoint.y -
          ratio * (pointer.canvasPoint.y - offsetRef.current.y),
      });

      applyZoom(newZoom, newOffset);
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, [applyZoom, getPointerState, mapLoaded]);

  const startDrag = useCallback(
    (event: MouseEvent<HTMLCanvasElement>) => {
      if (zoomRef.current <= 1) return false;

      const pointer = getPointerState(event.clientX, event.clientY);
      if (!pointer) return false;

      isDragging.current = true;
      setDragging(true);
      lastPos.current = pointer.canvasPoint;
      return true;
    },
    [getPointerState]
  );

  const dragByPointerMove = useCallback(
    (event: MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging.current) return false;

      const pointer = getPointerState(event.clientX, event.clientY);
      if (!pointer) return false;

      const dx = pointer.canvasPoint.x - lastPos.current.x;
      const dy = pointer.canvasPoint.y - lastPos.current.y;
      lastPos.current = pointer.canvasPoint;

      applyZoom(
        zoomRef.current,
        clampOffset(zoomRef.current, {
          x: offsetRef.current.x + dx,
          y: offsetRef.current.y + dy,
        })
      );

      return true;
    },
    [applyZoom, getPointerState]
  );

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    setDragging(false);
  }, []);

  const zoomAt = useCallback(
    (factor: number) => {
      const center = TELEMETRY_CANVAS_SIZE / 2;
      const newZoom = Math.min(
        TELEMETRY_MAX_ZOOM,
        Math.max(TELEMETRY_MIN_ZOOM, zoomRef.current * factor)
      );
      const ratio = newZoom / zoomRef.current;

      applyZoom(
        newZoom,
        clampOffset(newZoom, {
          x: center - ratio * (center - offsetRef.current.x),
          y: center - ratio * (center - offsetRef.current.y),
        })
      );
    },
    [applyZoom]
  );

  const resetView = useCallback(() => applyZoom(1, { x: 0, y: 0 }), [applyZoom]);

  return {
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
  };
};
