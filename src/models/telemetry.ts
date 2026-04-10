export interface TelemetryCharacter {
  name: string;
  teamId: number;
  location: {
    x: number;
    y: number;
    z: number;
  };
  health?: number;
}

// 이동 경로 로그 - 플랫 구조
export interface MovementLogEntry {
  timestamp: string;
  playerName: string;
  location: {
    x: number;
    y: number;
    z: number;
  };
  health: number;
  elapsedTime: number;
  numAlivePlayers: number;
}

export type MovementLogData = MovementLogEntry[];

// 킬 로그 - attacker 아닌 killer 필드
export interface KillLogEntry {
  timestamp: string;
  killer: TelemetryCharacter;
  victim: TelemetryCharacter;
  weapon: string;
  damageType: string;
  distance: number;
  isSuicide: boolean;
  assists: string[];
}

export type KillLogData = KillLogEntry[];

// 기절(DBNO) 로그
export interface GroggyLogEntry {
  timestamp: string;
  attacker: TelemetryCharacter;
  victim: TelemetryCharacter;
  weapon: string;
  damageType: string;
  damageReason: string;
  distance: number;
}

export type GroggyLogData = GroggyLogEntry[];

// 데미지 로그 - attacker는 블루존/환경 피해 시 null 가능
export interface DamageLogEntry {
  timestamp: string;
  attacker: TelemetryCharacter | null;
  victim: TelemetryCharacter;
  damage: number;
  weapon: string;
  damageType: string;
  damageReason: string;
}

export type DamageLogData = DamageLogEntry[];
