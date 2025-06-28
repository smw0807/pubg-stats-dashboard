export interface DamageLeaderboardEntry {
  name: string;
  damage: number;
  kills: number;
  headshotKills: number;
  winPlace: number;
}

export type DamageLeaderboardData = DamageLeaderboardEntry[];
