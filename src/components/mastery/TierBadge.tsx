import { TIER_INFO } from "~/utils/weaponMasteryUtils";

interface TierBadgeProps {
  tier: number;
}

export default function TierBadge({ tier }: TierBadgeProps) {
  const info = TIER_INFO[tier] ?? TIER_INFO[0];

  if (tier === 0) return null;

  return (
    <span
      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${info.bg} ${info.border} ${info.color}`}
    >
      {info.label}
    </span>
  );
}
