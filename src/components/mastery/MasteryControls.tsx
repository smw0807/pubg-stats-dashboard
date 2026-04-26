import {
  WEAPON_CATEGORIES,
  WEAPON_CATEGORY_LABELS,
} from "~/utils/weaponMasteryUtils";
import type { WeaponCategoryFilter, WeaponMasterySortKey } from "./types";

interface MasteryControlsProps {
  category: WeaponCategoryFilter;
  sortKey: WeaponMasterySortKey;
  showZero: boolean;
  onCategoryChange: (category: WeaponCategoryFilter) => void;
  onSortKeyChange: (sortKey: WeaponMasterySortKey) => void;
  onShowZeroChange: (showZero: boolean) => void;
}

export default function MasteryControls({
  category,
  sortKey,
  showZero,
  onCategoryChange,
  onSortKeyChange,
  onShowZeroChange,
}: MasteryControlsProps) {
  const categories = [
    "ALL",
    ...Object.keys(WEAPON_CATEGORIES),
  ] as WeaponCategoryFilter[];

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors
              ${
                category === cat
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:text-purple-600"
              }`}
          >
            {WEAPON_CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <label className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showZero}
            onChange={(event) => onShowZeroChange(event.target.checked)}
            className="accent-purple-600"
          />
          미사용 포함
        </label>
        <select
          value={sortKey}
          onChange={(event) =>
            onSortKeyChange(event.target.value as WeaponMasterySortKey)
          }
          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <option value="level">레벨순</option>
          <option value="kills">킬순</option>
          <option value="damage">피해량순</option>
          <option value="headshots">헤드샷순</option>
        </select>
      </div>
    </div>
  );
}
