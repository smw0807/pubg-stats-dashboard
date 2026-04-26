import type { WeaponSummary } from "~/models/weaponMastery";

interface SummaryBarProps {
  weapons: Array<[string, WeaponSummary]>;
}

export default function SummaryBar({ weapons }: SummaryBarProps) {
  const totalKills = weapons.reduce(
    (sum, [, weapon]) => sum + weapon.StatsTotal.Kills,
    0
  );
  const totalDamage = weapons.reduce(
    (sum, [, weapon]) => sum + weapon.StatsTotal.DamagePlayer,
    0
  );
  const totalHeadshots = weapons.reduce(
    (sum, [, weapon]) => sum + weapon.StatsTotal.HeadShots,
    0
  );
  const maxLevel = Math.max(...weapons.map(([, weapon]) => weapon.LevelCurrent));
  const masteredCount = weapons.filter(
    ([, weapon]) => weapon.TierCurrent > 0
  ).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      {[
        { label: "총 킬", value: totalKills.toLocaleString(), icon: "💀" },
        {
          label: "총 피해량",
          value: Math.round(totalDamage).toLocaleString(),
          icon: "💥",
        },
        {
          label: "총 헤드샷",
          value: totalHeadshots.toLocaleString(),
          icon: "🎯",
        },
        { label: "최고 레벨", value: `Lv.${maxLevel}`, icon: "⭐" },
        {
          label: "티어 보유",
          value: `${masteredCount}종`,
          icon: "🏆",
        },
      ].map(({ label, value, icon }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center shadow-sm"
        >
          <div className="text-xl mb-1">{icon}</div>
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
