export interface TierInfo {
  tier: string;
  subTier: string;
}

export interface GameModeStats {
  assists: number;
  avgRank: number;
  avgSurvivalTime: number;
  bestRankPoint: number;
  bestTier: TierInfo;
  boosts: number;
  currentRankPoint: number;
  currentTier: TierInfo;
  dBNOs: number;
  damageDealt: number;
  deaths: number;
  headshotKillRatio: number;
  headshotKills: number;
  heals: number;
  kda: number;
  kdr: number;
  killStreak: number;
  kills: number;
  longestKill: number;
  playTime: number;
  reviveRatio: number;
  revives: number;
  roundMostKills: number;
  roundsPlayed: number;
  teamKills: number;
  top10Ratio: number;
  weaponsAcquired: number;
  winRatio: number;
  wins: number;
}

export interface RankedGameModeStats {
  all: GameModeStats;
  squad: GameModeStats;
  'squad-fpp': GameModeStats;
  banType: 'Innocent' | 'TemporaryBan' | 'PermanentBan'; // 무죄, 임시정지, 영구정지
}

export interface PlayerDistance {
  walk: number;
  ride: number;
  swim: number;
  total: number;
}

export interface PlayerItems {
  boosts: number;
  heals: number;
  weaponsAcquired: number;
}

export interface PlayerPerformance {
  killStreaks: number;
  longestKill: number;
  revives: number;
  DBNOs: number; // Down But Not Out
}

export interface PlayerStats {
  name: string;
  playerId: string;
  kills: number;
  assists: number;
  damage: number;
  headshotKills: number;
  survivalTime: number;
  winPlace: number;
  killPlace: number;
  distance: PlayerDistance;
  items: PlayerItems;
  performance: PlayerPerformance;
}

export type PlayerStatsData = PlayerStats[];
