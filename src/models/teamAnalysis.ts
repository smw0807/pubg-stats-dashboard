import { TeamStats } from './teamRank';

export interface TopPerformer {
  name: string;
  kills?: number;
  damage?: number;
  survivalTime?: number;
  winPlace?: number;
}

export interface TeamEfficiency {
  killsPerPlayer: number;
  damagePerPlayer: number;
  survivalTimePerPlayer: number;
}

export interface TopPerformers {
  topKiller: TopPerformer;
  topDamage: TopPerformer;
  topSurvivor: TopPerformer;
}

export interface TeamAnalysis {
  rank: number;
  teamId: number;
  won: boolean;
  teamStats: TeamStats;
  topPerformers: TopPerformers;
  teamEfficiency: TeamEfficiency;
}

export type TeamAnalysisData = TeamAnalysis[];
