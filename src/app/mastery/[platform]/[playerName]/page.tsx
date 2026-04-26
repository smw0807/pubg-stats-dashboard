"use client";

import { useState, useMemo } from "react";
import type { WeaponSummary } from "~/models/weaponMastery";
import {
  WEAPON_NAMES,
  WEAPON_CATEGORIES,
  TIER_INFO,
} from "~/utils/weaponMasteryUtils";
import { DUMMY_MASTERY_DATA } from "./dummyData";

// 최대 레벨 (100레벨 기준)
const MAX_LEVEL = 100;

type SortKey = "level" | "kills" | "damage" | "headshots";
type CategoryFilter = "ALL" | keyof typeof WEAPON_CATEGORIES;

const CATEGORY_LABELS: Record<string, string> = {
  ALL: "전체",
  AR: "돌격소총",
  DMR: "지정사수",
  SR: "저격소총",
  SMG: "기관단총",
  LMG: "경기관총",
  SG: "산탄총",
  PISTOL: "권총",
  SPECIAL: "특수",
};

function TierBadge({ tier }: { tier: number }) {
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

function LevelBar({ level, tier }: { level: number; tier: number }) {
  const pct = Math.min((level / MAX_LEVEL) * 100, 100);
  const tierColors = [
    "bg-gray-400",
    "bg-amber-500",
    "bg-slate-400",
    "bg-yellow-400",
    "bg-cyan-400",
    "bg-blue-500",
    "bg-purple-500",
  ];
  const barColor = tierColors[tier] ?? tierColors[0];
  return (
    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function WeaponCard({
  weaponId,
  data,
}: {
  weaponId: string;
  data: WeaponSummary;
}) {
  const name = WEAPON_NAMES[weaponId] ?? weaponId;
  const tier = data.TierCurrent;
  const tierInfo = TIER_INFO[tier] ?? TIER_INFO[0];
  const hsRate =
    data.StatsTotal.Kills > 0
      ? ((data.StatsTotal.HeadShots / data.StatsTotal.Kills) * 100).toFixed(0)
      : "0";

  return (
    <div
      className={`rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-default
        bg-white dark:bg-gray-800
        ${tier > 0 ? tierInfo.border : "border-gray-200 dark:border-gray-700"}
      `}
    >
      {/* 헤더 */}
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

      {/* 레벨바 */}
      <LevelBar level={data.LevelCurrent} tier={tier} />

      {/* XP */}
      <div className="mt-1 mb-3 text-right">
        <span className="text-[10px] text-gray-400 dark:text-gray-500">
          {data.XPTotal.toLocaleString()} XP
        </span>
      </div>

      {/* 스탯 */}
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
        <StatItem label="HS율" value={`${hsRate}%`} />
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

function StatItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] text-gray-400 dark:text-gray-500 mb-0.5">
        {label}
      </div>
      <div
        className={`text-sm font-semibold ${
          highlight
            ? "text-orange-500 dark:text-orange-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function SummaryBar({
  weapons,
}: {
  weapons: Array<[string, WeaponSummary]>;
}) {
  const totalKills = weapons.reduce(
    (s, [, w]) => s + w.StatsTotal.Kills,
    0
  );
  const totalDamage = weapons.reduce(
    (s, [, w]) => s + w.StatsTotal.DamagePlayer,
    0
  );
  const totalHS = weapons.reduce(
    (s, [, w]) => s + w.StatsTotal.HeadShots,
    0
  );
  const maxLevel = Math.max(...weapons.map(([, w]) => w.LevelCurrent));
  const masteredCount = weapons.filter(
    ([, w]) => w.TierCurrent > 0
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
        { label: "총 헤드샷", value: totalHS.toLocaleString(), icon: "🎯" },
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

export default function MasteryPage() {
  const [playerInfo] = useState({ platform: "steam", playerName: "DummyPlayer" });
  const [sortKey, setSortKey] = useState<SortKey>("level");
  const [category, setCategory] = useState<CategoryFilter>("ALL");
  const [showZero, setShowZero] = useState(false);

  const allWeapons = useMemo(
    () =>
      Object.entries(DUMMY_MASTERY_DATA.data.attributes.weaponSummaries),
    []
  );

  const filtered = useMemo(() => {
    let list = allWeapons;

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
        {/* 헤더 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>{playerInfo.platform === "steam" ? "Steam" : "Kakao"}</span>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {playerInfo.playerName}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            무기 마스터리
          </h1>
        </div>

        {/* 요약 */}
        <SummaryBar weapons={allWeapons} />

        {/* 티어 범례 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(TIER_INFO)
            .filter(([t]) => Number(t) > 0)
            .map(([t, info]) => (
              <div
                key={t}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${info.bg} ${info.border} ${info.color} font-medium`}
              >
                <span className="w-2 h-2 rounded-full inline-block" style={{
                  background: ["","#b45309","#94a3b8","#eab308","#22d3ee","#3b82f6","#a855f7"][Number(t)]
                }} />
                Tier {t} · {info.label}
              </div>
            ))}
        </div>

        {/* 필터 & 정렬 */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-1.5">
            {(["ALL", ...Object.keys(WEAPON_CATEGORIES)] as CategoryFilter[]).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors
                    ${
                      category === cat
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:text-purple-600"
                    }`}
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </button>
              )
            )}
          </div>

          {/* 정렬 + 토글 */}
          <div className="flex items-center gap-2 ml-auto">
            <label className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showZero}
                onChange={(e) => setShowZero(e.target.checked)}
                className="accent-purple-600"
              />
              미사용 포함
            </label>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="level">레벨순</option>
              <option value="kills">킬순</option>
              <option value="damage">피해량순</option>
              <option value="headshots">헤드샷순</option>
            </select>
          </div>
        </div>

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
