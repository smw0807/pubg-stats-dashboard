export interface Participant {
  name: string;
  kills: number;
  damage: number;
  survivalTime: number;
  winPlace: number;
}

export interface TeamStats {
  totalKills: number;
  totalDamage: number;
  totalSurvivalTime: number;
  bestWinPlace: number;
  totalDistance: number;
}

export interface TeamRank {
  rank: number;
  teamId: number;
  won: boolean;
  participants: Participant[];
  teamStats: TeamStats;
}

export type TeamRankData = TeamRank[];
