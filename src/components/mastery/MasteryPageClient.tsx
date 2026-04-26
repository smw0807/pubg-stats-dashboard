'use client';

import {useMemo, useState} from 'react';
import {WEAPON_CATEGORIES} from '~/utils/weaponMasteryUtils';
import MasteryControls from './MasteryControls';
import MasteryHeader from './MasteryHeader';
import SummaryBar from './SummaryBar';
import TierLegend from './TierLegend';
import type {WeaponCategoryFilter, WeaponMasterySortKey} from './types';
import WeaponCard from './WeaponCard';
import {useWeaponMastery} from './hooks/useWeaponMastery';

interface MasteryPageClientProps {
  platform: string;
  playerName: string;
}

export default function MasteryPageClient({
  platform,
  playerName,
}: MasteryPageClientProps) {
  const [sortKey, setSortKey] = useState<WeaponMasterySortKey>('level');
  const [category, setCategory] = useState<WeaponCategoryFilter>('ALL');
  const [showZero, setShowZero] = useState(false);
  const {data, isLoading, isError, error} = useWeaponMastery(
    platform,
    playerName,
  );

  const allWeapons = useMemo(
    () => Object.entries(data?.weaponSummaries ?? {}),
    [data],
  );

  const filtered = useMemo(() => {
    let list = [...allWeapons];

    if (!showZero) {
      list = list.filter(([, weapon]) => weapon.XPTotal > 0);
    }

    if (category !== 'ALL') {
      list = list.filter(([id]) =>
        (WEAPON_CATEGORIES[category] ?? []).includes(id),
      );
    }

    return list.sort(([, a], [, b]) => {
      switch (sortKey) {
        case 'level':
          return (
            b.LevelCurrent - a.LevelCurrent || b.TierCurrent - a.TierCurrent
          );
        case 'kills':
          return b.StatsTotal.Kills - a.StatsTotal.Kills;
        case 'damage':
          return b.StatsTotal.DamagePlayer - a.StatsTotal.DamagePlayer;
        case 'headshots':
          return b.StatsTotal.HeadShots - a.StatsTotal.HeadShots;
        default:
          return 0;
      }
    });
  }, [allWeapons, sortKey, category, showZero]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MasteryHeader platform={platform} playerName={playerName} />

        {isLoading && (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            무기 마스터리 정보를 불러오는 중입니다.
          </div>
        )}

        {isError && (
          <div className="text-center py-16 text-red-500 dark:text-red-400">
            {error instanceof Error
              ? error.message
              : '무기 마스터리 정보를 불러오지 못했습니다.'}
          </div>
        )}

        {!isLoading && !isError && (
          <>
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

            <div className="text-xs text-gray-400 dark:text-gray-500 mb-3">
              {filtered.length}개 무기
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filtered.map(([id, weapon]) => (
                <WeaponCard key={id} weaponId={id} data={weapon} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                해당 카테고리에 무기 데이터가 없습니다.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
