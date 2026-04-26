"use client";

import { useState, useMemo } from "react";
import MasteryControls from "~/components/mastery/MasteryControls";
import MasteryHeader from "~/components/mastery/MasteryHeader";
import SummaryBar from "~/components/mastery/SummaryBar";
import TierLegend from "~/components/mastery/TierLegend";
import type {
  WeaponCategoryFilter,
  WeaponMasterySortKey,
} from "~/components/mastery/types";
import WeaponCard from "~/components/mastery/WeaponCard";
import { WEAPON_CATEGORIES } from "~/utils/weaponMasteryUtils";
import { DUMMY_MASTERY_DATA } from "./dummyData";

export default function MasteryPage() {
  const [playerInfo] = useState({ platform: "steam", playerName: "DummyPlayer" });
  const [sortKey, setSortKey] = useState<WeaponMasterySortKey>("level");
  const [category, setCategory] = useState<WeaponCategoryFilter>("ALL");
  const [showZero, setShowZero] = useState(false);

  const allWeapons = useMemo(
    () =>
      Object.entries(DUMMY_MASTERY_DATA.data.attributes.weaponSummaries),
    []
  );

  const filtered = useMemo(() => {
    let list = [...allWeapons];

    if (!showZero) {
      list = list.filter(([, w]) => w.XPTotal > 0);
    }

    if (category !== "ALL") {
      list = list.filter(([id]) =>
        (WEAPON_CATEGORIES[category] ?? []).includes(id)
      );
    }

    return list.sort(([, a], [, b]) => {
      switch (sortKey) {
        case "level":
          return b.LevelCurrent - a.LevelCurrent || b.TierCurrent - a.TierCurrent;
        case "kills":
          return b.StatsTotal.Kills - a.StatsTotal.Kills;
        case "damage":
          return b.StatsTotal.DamagePlayer - a.StatsTotal.DamagePlayer;
        case "headshots":
          return b.StatsTotal.HeadShots - a.StatsTotal.HeadShots;
        default:
          return 0;
      }
    });
  }, [allWeapons, sortKey, category, showZero]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MasteryHeader
          platform={playerInfo.platform}
          playerName={playerInfo.playerName}
        />
        <SummaryBar weapons={allWeapons} />
        <TierLegend />
        <MasteryControls
          category={category}
          sortKey={sortKey}
          showZero={showZero}
          onCategoryChange={setCategory}
          onSortKeyChange={setSortKey}
          onShowZeroChange={setShowZero}
        />

        {/* 결과 수 */}
        <div className="text-xs text-gray-400 dark:text-gray-500 mb-3">
          {filtered.length}개 무기
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map(([id, data]) => (
            <WeaponCard key={id} weaponId={id} data={data} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            해당 카테고리에 무기 데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
