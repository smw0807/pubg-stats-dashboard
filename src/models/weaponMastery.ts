export interface WeaponStatsTotal {
  Kills: number;
  DamagePlayer: number;
  HeadShots: number;
  Groggies: number;
  MostKillsInAGame: number;
}

export interface WeaponSummary {
  XPTotal: number;
  LevelCurrent: number;
  TierCurrent: number;
  StatsTotal: WeaponStatsTotal;
}

export interface WeaponMasterySummaryResponse {
  data: {
    type: "weaponMasterySummary";
    id: string;
    attributes: {
      weaponSummaries: Record<string, WeaponSummary>;
    };
  };
}

export type WeaponCategory =
  | "AR"
  | "DMR"
  | "SR"
  | "SMG"
  | "LMG"
  | "SG"
  | "PISTOL"
  | "SPECIAL";

export interface WeaponTierInfo {
  label: string;
  color: string;
  bg: string;
  border: string;
}
