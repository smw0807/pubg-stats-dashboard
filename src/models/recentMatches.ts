export interface MatchPerformance {
  kills: number;
  assists: number;
  damage: number;
  headshotKills: number;
  killPlace: number;
  winPlace: number;
  survivalTime: number;
  killStreaks: number;
  longestKill: number;
}

export interface MatchMovement {
  walkDistance: number;
  rideDistance: number;
  swimDistance: number;
  totalDistance: number;
}

export interface MatchItems {
  boosts: number;
  heals: number;
  weaponsAcquired: number;
  vehicleDestroys: number;
}

export interface MatchTeam {
  rank: number;
  teamId: number;
  won: string; // "true" | "false" 문자열로 저장됨
  revives: number;
  DBNOs: number;
  teamKills: number;
}

export interface RecentMatch {
  name: string;
  playerId: string;
  matchId: string;
  gameMode: string;
  mapName: string;
  performance: MatchPerformance;
  movement: MatchMovement;
  items: MatchItems;
  team: MatchTeam;
}

export type RecentMatches = RecentMatch[];

// 샘플 데이터 (주석 처리)
/*
[
  {
      "name": "wait_plz_bro",
      "playerId": "account.12ddde2e5fec4688ad5a3b10abfe8d59",
      "matchId": "aa8df751-b349-48e9-bde1-f5100bfdac14",
      "gameMode": "squad",
      "mapName": "DihorOtok_Main",
      "performance": {
          "kills": 0,
          "assists": 0,
          "damage": 0,
          "headshotKills": 0,
          "killPlace": 61,
          "winPlace": 16,
          "survivalTime": 249,
          "killStreaks": 0,
          "longestKill": 0
      },
      "movement": {
          "walkDistance": 115.99455,
          "rideDistance": 934.5852,
          "swimDistance": 0,
          "totalDistance": 1050.5797499999999
      },
      "items": {
          "boosts": 0,
          "heals": 0,
          "weaponsAcquired": 2,
          "vehicleDestroys": 0
      },
      "team": {
          "rank": 16,
          "teamId": 15,
          "won": "false",
          "revives": 0,
          "DBNOs": 0,
          "teamKills": 0
      }
  }
]
*/
