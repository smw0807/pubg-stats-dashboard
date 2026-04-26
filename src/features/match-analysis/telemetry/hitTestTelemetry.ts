import { toTelemetryCanvasPoint } from './drawTelemetryLayers';
import type { MovementLogEntry } from '~/models/telemetry';
import type {
  CanvasPoint,
  TelemetryLayerData,
  TelemetryLayerState,
  TooltipInfo,
} from './types';

interface FindTelemetryTooltipOptions extends TelemetryLayerData {
  layers: TelemetryLayerState;
  mapSize: number;
  point: CanvasPoint;
  cssPoint: CanvasPoint;
  hitRadius: number;
}

const distance = (a: CanvasPoint, b: CanvasPoint) =>
  Math.hypot(a.x - b.x, a.y - b.y);

export const findTelemetryTooltip = ({
  layers,
  mapSize,
  point,
  cssPoint,
  hitRadius,
  movementData,
  killData,
  groggyData,
  damageData,
}: FindTelemetryTooltipOptions): TooltipInfo | null => {
  if (layers.kills && killData) {
    for (const entry of killData) {
      if (!entry.killer?.location || !entry.victim?.location) continue;

      const killer = toTelemetryCanvasPoint(
        entry.killer.location.x,
        entry.killer.location.y,
        mapSize
      );
      const victim = toTelemetryCanvasPoint(
        entry.victim.location.x,
        entry.victim.location.y,
        mapSize
      );

      if (distance(point, killer) < hitRadius || distance(point, victim) < hitRadius) {
        return { x: cssPoint.x, y: cssPoint.y, info: { type: 'kill', data: entry } };
      }
    }
  }

  if (layers.groggy && groggyData) {
    for (const entry of groggyData) {
      if (!entry.victim?.location) continue;

      const victim = toTelemetryCanvasPoint(
        entry.victim.location.x,
        entry.victim.location.y,
        mapSize
      );

      if (distance(point, victim) < hitRadius) {
        return { x: cssPoint.x, y: cssPoint.y, info: { type: 'groggy', data: entry } };
      }
    }
  }

  if (layers.damage && damageData) {
    for (const entry of damageData) {
      if (!entry.victim?.location) continue;

      const victim = toTelemetryCanvasPoint(
        entry.victim.location.x,
        entry.victim.location.y,
        mapSize
      );

      if (distance(point, victim) < hitRadius) {
        return { x: cssPoint.x, y: cssPoint.y, info: { type: 'damage', data: entry } };
      }
    }
  }

  if (layers.movement && movementData) {
    let minDist = hitRadius;
    let nearest: MovementLogEntry | null = null;

    for (const entry of movementData) {
      const movement = toTelemetryCanvasPoint(
        entry.location.x,
        entry.location.y,
        mapSize
      );
      const dist = distance(point, movement);

      if (dist < minDist) {
        minDist = dist;
        nearest = entry;
      }
    }

    if (nearest) {
      return {
        x: cssPoint.x,
        y: cssPoint.y,
        info: { type: 'movement', data: nearest },
      };
    }
  }

  return null;
};
