export interface MatchSummary {
  totalKills: number;
  totalDamage: number;
  totalHeadshots: number;
  totalDistance: number;
  alivePlayers: number;
}

export interface MatchAverages {
  avgKills: number;
  avgDamage: number;
  avgDistance: number;
  headshotRate: number;
}

export interface MatchExtremes {
  mostKills: number;
  mostDamage: number;
  longestKill: number;
  longestSurvival: number;
}

export interface MatchStatistics {
  matchId: string;
  gameMode: string;
  mapName: string;
  duration: number;
  playerCount: number;
  teamCount: number;
  summary: MatchSummary;
  averages: MatchAverages;
  extremes: MatchExtremes;
}
