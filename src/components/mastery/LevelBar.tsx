import { TIER_BAR_COLORS } from "~/utils/weaponMasteryUtils";

const MAX_LEVEL = 100;

interface LevelBarProps {
  level: number;
  tier: number;
}

export default function LevelBar({ level, tier }: LevelBarProps) {
  const pct = Math.min((level / MAX_LEVEL) * 100, 100);
  const barColor = TIER_BAR_COLORS[tier] ?? TIER_BAR_COLORS[0];

  return (
    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
