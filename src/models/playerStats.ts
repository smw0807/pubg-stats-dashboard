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
}
