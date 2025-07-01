export interface MatchSummary {
  summary: {
    matchId: string;
    gameMode: string;
    mapName: string;
    duration: number;
    createdAt: string;
    totalPlayers: number;
    totalTeams: number;
    winner: {
      attributes: {
        stats: { teamId: number };
      };
      relationships: {
        participants: { data: { id: string }[] };
      };
    };
    topKiller: {
      attributes: {
        stats: {
          name: string;
          kills: number;
          damageDealt: number;
          timeSurvived: number;
        };
      };
    };
    matchStats: {
      totalKills: number;
      totalDamage: number;
      totalDistance: number;
    };
  };
  isLoading?: boolean;
  error?: string | null;
}
