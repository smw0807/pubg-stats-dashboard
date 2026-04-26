import { TIER_DOT_COLORS, TIER_INFO } from "~/utils/weaponMasteryUtils";

export default function TierLegend() {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(TIER_INFO)
        .filter(([tier]) => Number(tier) > 0)
        .map(([tier, info]) => (
          <div
            key={tier}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${info.bg} ${info.border} ${info.color} font-medium`}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: TIER_DOT_COLORS[Number(tier)] }}
            />
            Tier {tier} · {info.label}
          </div>
        ))}
    </div>
  );
}
