export interface SurvivalLeaderboardEntry {
  name: string;
  survivalTime: number;
  winPlace: number;
  kills: number;
  damage: number;
}

export type SurvivalLeaderboardData = SurvivalLeaderboardEntry[];
