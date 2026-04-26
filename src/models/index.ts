export interface SearchParams {
  platform: string;
  playerName: string;
}

export * from './platform';
export * from './playerStats';
export * from './recentMatches';
export * from './teamRank';
export * from './killLeaderboard';
export * from './damageLeaderboard';
export * from './survivalLeaderboard';
export * from './teamAnalysis';
export * from './weaponMastery';

// Match Statistics
export type {
  MatchStatistics,
  MatchSummary,
  MatchAverages,
  MatchExtremes,
} from './matchStatistics';

// Player Performance Analysis
export type {
  PlayerPerformanceAnalysis,
  PlayerPerformance,
  PlayerEfficiency,
  PlayerMovement,
  PlayerItems,
} from './playerPerformance';

// Telemetry
export type {
  MovementLogEntry,
  MovementLogData,
  KillLogEntry,
  KillLogData,
  GroggyLogEntry,
  GroggyLogData,
  DamageLogEntry,
  DamageLogData,
} from './telemetry';

export interface ErrorResponse {
  statusCode: number;
  message: string;
}
