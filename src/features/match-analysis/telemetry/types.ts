import type {
  DamageLogData,
  DamageLogEntry,
  GroggyLogData,
  GroggyLogEntry,
  KillLogData,
  KillLogEntry,
  MovementLogData,
  MovementLogEntry,
} from '~/models/telemetry';

export interface TelemetryLayerState {
  movement: boolean;
  kills: boolean;
  groggy: boolean;
  damage: boolean;
}

export interface TelemetryLayerData {
  movementData?: MovementLogData;
  killData?: KillLogData;
  groggyData?: GroggyLogData;
  damageData?: DamageLogData;
}

export type TooltipData =
  | { type: 'kill'; data: KillLogEntry }
  | { type: 'groggy'; data: GroggyLogEntry }
  | { type: 'damage'; data: DamageLogEntry }
  | { type: 'movement'; data: MovementLogEntry };

export interface TooltipInfo {
  x: number;
  y: number;
  info: TooltipData;
}

export interface CanvasPoint {
  x: number;
  y: number;
}
