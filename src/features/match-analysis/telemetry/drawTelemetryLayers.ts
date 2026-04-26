import type { MovementLogEntry } from '~/models/telemetry';
import { TELEMETRY_CANVAS_SIZE } from './mapConfig';
import type { CanvasPoint, TelemetryLayerData, TelemetryLayerState } from './types';

interface DrawTelemetryLayersOptions extends TelemetryLayerData {
  ctx: CanvasRenderingContext2D;
  mapImage: HTMLImageElement;
  mapSize: number;
  playerName: string;
  zoom: number;
  offset: CanvasPoint;
  layers: TelemetryLayerState;
}

export const toTelemetryCanvasPoint = (
  x: number,
  y: number,
  mapSize: number
) => ({
  x: (x / mapSize) * TELEMETRY_CANVAS_SIZE,
  y: (y / mapSize) * TELEMETRY_CANVAS_SIZE,
});

const drawMovementPath = (
  ctx: CanvasRenderingContext2D,
  points: MovementLogEntry[],
  mapSize: number,
  zoom: number
) => {
  const sorted = [...points].sort((a, b) => a.elapsedTime - b.elapsedTime);

  ctx.beginPath();
  ctx.strokeStyle = 'rgba(34,197,94,0.85)';
  ctx.lineWidth = 2 / zoom;
  ctx.lineJoin = 'round';
  sorted.forEach((pt, index) => {
    const point = toTelemetryCanvasPoint(pt.location.x, pt.location.y, mapSize);
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();

  const start = toTelemetryCanvasPoint(
    sorted[0].location.x,
    sorted[0].location.y,
    mapSize
  );
  ctx.beginPath();
  ctx.fillStyle = '#22c55e';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2 / zoom;
  ctx.arc(start.x, start.y, 7 / zoom, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.font = `bold ${9 / zoom}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('S', start.x, start.y);

  const last = sorted[sorted.length - 1];
  const end = toTelemetryCanvasPoint(last.location.x, last.location.y, mapSize);
  ctx.beginPath();
  ctx.fillStyle = '#ef4444';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2 / zoom;
  ctx.arc(end.x, end.y, 7 / zoom, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.font = `bold ${9 / zoom}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('E', end.x, end.y);
};

export const drawTelemetryLayers = ({
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
}: DrawTelemetryLayersOptions) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, TELEMETRY_CANVAS_SIZE, TELEMETRY_CANVAS_SIZE);
  ctx.save();
  ctx.setTransform(zoom, 0, 0, zoom, offset.x, offset.y);

  ctx.drawImage(
    mapImage,
    0,
    0,
    TELEMETRY_CANVAS_SIZE,
    TELEMETRY_CANVAS_SIZE
  );
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 0, TELEMETRY_CANVAS_SIZE, TELEMETRY_CANVAS_SIZE);

  if (layers.damage && damageData) {
    damageData.forEach((entry) => {
      if (!entry.victim?.location) return;
      const point = toTelemetryCanvasPoint(
        entry.victim.location.x,
        entry.victim.location.y,
        mapSize
      );
      const isMe = entry.attacker?.name === playerName;
      ctx.beginPath();
      ctx.fillStyle = isMe
        ? 'rgba(251,191,36,0.9)'
        : 'rgba(251,191,36,0.35)';
      ctx.arc(point.x, point.y, (isMe ? 3 : 2) / zoom, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  if (layers.groggy && groggyData) {
    groggyData.forEach((entry) => {
      if (!entry.victim?.location) return;
      const victim = toTelemetryCanvasPoint(
        entry.victim.location.x,
        entry.victim.location.y,
        mapSize
      );
      const isMyKnock = entry.attacker?.name === playerName;
      const isMyDown = entry.victim.name === playerName;
      const size = (isMyKnock || isMyDown ? 7 : 5) / zoom;
      const color = isMyDown ? '#f97316' : isMyKnock ? '#60a5fa' : '#fbbf24';

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.lineWidth = 1 / zoom;
      ctx.moveTo(victim.x, victim.y - size);
      ctx.lineTo(victim.x + size, victim.y);
      ctx.lineTo(victim.x, victim.y + size);
      ctx.lineTo(victim.x - size, victim.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });
  }

  if (layers.kills && killData) {
    killData.forEach((entry) => {
      if (!entry.killer?.location || !entry.victim?.location) return;
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
      const isMyKill = entry.killer.name === playerName;
      const isMyDeath = entry.victim.name === playerName;

      ctx.beginPath();
      ctx.strokeStyle = isMyKill
        ? 'rgba(96,165,250,0.7)'
        : 'rgba(239,68,68,0.25)';
      ctx.lineWidth = (isMyKill || isMyDeath ? 1.5 : 0.8) / zoom;
      ctx.moveTo(killer.x, killer.y);
      ctx.lineTo(victim.x, victim.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = isMyKill ? '#3b82f6' : isMyDeath ? '#f97316' : '#ef4444';
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = 1 / zoom;
      ctx.arc(
        killer.x,
        killer.y,
        (isMyKill || isMyDeath ? 5 : 3) / zoom,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();

      const crossSize = (isMyKill || isMyDeath ? 5 : 3) / zoom;
      ctx.strokeStyle = isMyDeath ? '#f97316' : isMyKill ? '#60a5fa' : '#ef4444';
      ctx.lineWidth = (isMyKill || isMyDeath ? 2.5 : 1.5) / zoom;
      ctx.beginPath();
      ctx.moveTo(victim.x - crossSize, victim.y - crossSize);
      ctx.lineTo(victim.x + crossSize, victim.y + crossSize);
      ctx.moveTo(victim.x + crossSize, victim.y - crossSize);
      ctx.lineTo(victim.x - crossSize, victim.y + crossSize);
      ctx.stroke();
    });
  }

  if (layers.movement && movementData && movementData.length > 0) {
    drawMovementPath(ctx, movementData, mapSize, zoom);
  }

  ctx.restore();
};
