export interface PlayerPerformance {
  kills: number;
  assists: number;
  deaths: number;
  kda: number;
  damage: number;
  damagePerKill: number;
  headshotKills: number;
  headshotAccuracy: number;
  longestKill: number;
}

export interface PlayerEfficiency {
  survivalTime: number;
  survivalEfficiency: number;
  killStreaks: number;
  revives: number;
  DBNOs: number;
}

export interface PlayerMovement {
  totalDistance: number;
  walkDistance: number;
  rideDistance: number;
  swimDistance: number;
}

export interface PlayerItems {
  boosts: number;
  heals: number;
  weaponsAcquired: number;
  vehicleDestroys: number;
}

export interface PlayerPerformanceAnalysis {
  name: string;
  playerId: string;
  winPlace: number;
  performance: PlayerPerformance;
  efficiency: PlayerEfficiency;
  movement: PlayerMovement;
  items: PlayerItems;
}
