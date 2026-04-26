import type { WeaponSummary } from "~/models/weaponMastery";
import { TIER_INFO, WEAPON_NAMES } from "~/utils/weaponMasteryUtils";
import LevelBar from "./LevelBar";
import StatItem from "./StatItem";
import TierBadge from "./TierBadge";

interface WeaponCardProps {
  weaponId: string;
  data: WeaponSummary;
}

export default function WeaponCard({ weaponId, data }: WeaponCardProps) {
  const name = WEAPON_NAMES[weaponId] ?? weaponId;
  const tier = data.TierCurrent;
  const tierInfo = TIER_INFO[tier] ?? TIER_INFO[0];

  return (
    <div
      className={`rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-default
        bg-white dark:bg-gray-800
        ${tier > 0 ? tierInfo.border : "border-gray-200 dark:border-gray-700"}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight">
            {name}
          </span>
          <TierBadge tier={tier} />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
          Lv.{data.LevelCurrent}
        </span>
      </div>

      <LevelBar level={data.LevelCurrent} tier={tier} />

      <div className="mt-1 mb-3 text-right">
        <span className="text-[10px] text-gray-400 dark:text-gray-500">
          {data.XPTotal.toLocaleString()} XP
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        <StatItem
          label="킬"
          value={data.StatsTotal.Kills.toLocaleString()}
          highlight={data.StatsTotal.Kills > 100}
        />
        <StatItem
          label="피해량"
          value={Math.round(data.StatsTotal.DamagePlayer).toLocaleString()}
        />
        <StatItem
          label="헤드샷"
          value={data.StatsTotal.HeadShots.toLocaleString()}
        />
        <StatItem
          label="기절"
          value={data.StatsTotal.Groggies.toLocaleString()}
        />
        <StatItem
          label="최다 킬"
          value={`${data.StatsTotal.MostKillsInAGame}`}
          highlight={data.StatsTotal.MostKillsInAGame >= 9}
        />
      </div>
    </div>
  );
}
