export interface KillLeaderboardEntry {
  name: string;
  kills: number;
  damage: number;
  headshotKills: number;
  longestKill: number;
  winPlace: number;
}

export type KillLeaderboardData = KillLeaderboardEntry[];
