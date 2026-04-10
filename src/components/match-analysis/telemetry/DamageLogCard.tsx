'use client';

import { useEffect, useState } from 'react';
import { useTelemetryDamage } from '../hooks/useTelemetryDamage';
import { DamageLogData } from '~/models/telemetry';

interface Props {
  platform: string;
  matchId: string;
  playerName: string;
  setIsLoading: (v: boolean) => void;
}

const formatTimestamp = (ts: string) => {
  const d = new Date(ts);
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(2, '0')}`;
};

type FilterMode = 'all' | 'dealt' | 'received';

export default function DamageLogCard({
  platform,
  matchId,
  playerName,
  setIsLoading,
}: Props) {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [filterPlayerName, setFilterPlayerName] = useState(playerName);
  const [mounted, setMounted] = useState(false);

  const { data, isLoading, error } = useTelemetryDamage(
    platform,
    matchId,
    filterPlayerName || undefined
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const renderContent = (logs: DamageLogData) => {
    if (logs.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          데미지 로그 데이터가 없습니다.
        </div>
      );
    }

    const dealtLogs = logs.filter((l) => l.attacker?.name === playerName);
    const receivedLogs = logs.filter((l) => l.victim.name === playerName);
    const totalDealt = dealtLogs.reduce((sum, l) => sum + l.damage, 0);
    const totalReceived = receivedLogs.reduce((sum, l) => sum + l.damage, 0);
    const totalDamage = logs.reduce((sum, l) => sum + l.damage, 0);

    const filteredLogs =
      filterMode === 'dealt'
        ? dealtLogs
        : filterMode === 'received'
        ? receivedLogs
        : logs;

    return (
      <div className="space-y-4">
        {/* 요약 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center border border-red-200 dark:border-red-800">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {Math.round(totalDamage).toLocaleString()}
            </div>
            <div className="text-sm text-red-700 dark:text-red-300">
              전체 데미지
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(totalDealt).toLocaleString()}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              내가 준 피해
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center border border-orange-200 dark:border-orange-800">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {Math.round(totalReceived).toLocaleString()}
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300">
              내가 받은 피해
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            {(
              [
                { value: 'all', label: '전체' },
                { value: 'dealt', label: '준 피해' },
                { value: 'received', label: '받은 피해' },
              ] as { value: FilterMode; label: string }[]
            ).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilterMode(opt.value)}
                className={`px-3 py-1 text-sm transition-colors ${
                  filterMode === opt.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={filterPlayerName}
            onChange={(e) => setFilterPlayerName(e.target.value)}
            placeholder="플레이어 이름 (비우면 전체)"
            className="flex-1 min-w-[160px] text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
        </div>

        {/* 데미지 로그 테이블 */}
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-2 text-gray-700 dark:text-gray-300">
                  시간
                </th>
                <th className="text-left p-2 text-gray-700 dark:text-gray-300">
                  공격자
                </th>
                <th className="text-left p-2 text-gray-700 dark:text-gray-300">
                  피해자
                </th>
                <th className="text-right p-2 text-gray-700 dark:text-gray-300">
                  데미지
                </th>
                <th className="text-left p-2 text-gray-700 dark:text-gray-300">
                  무기
                </th>
                <th className="text-left p-2 text-gray-700 dark:text-gray-300">
                  원인
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.slice(0, 300).map((entry, i) => {
                const attackerName = entry.attacker?.name ?? null;
                const isMeAttacker = attackerName === playerName;
                const isMeVictim = entry.victim.name === playerName;
                return (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 dark:border-gray-700 ${
                      isMeAttacker
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : isMeVictim
                        ? 'bg-orange-50 dark:bg-orange-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <td className="p-2 text-gray-500 dark:text-gray-400">
                      {mounted ? formatTimestamp(entry.timestamp) : '—'}
                    </td>
                    <td className="p-2 font-medium text-gray-800 dark:text-gray-200">
                      {attackerName === null ? (
                        <span className="text-gray-400 dark:text-gray-500 italic text-xs">
                          {entry.damageType}
                        </span>
                      ) : isMeAttacker ? (
                        <span className="text-blue-600 dark:text-blue-400">
                          ★ {attackerName}
                        </span>
                      ) : (
                        attackerName
                      )}
                    </td>
                    <td className="p-2 text-gray-800 dark:text-gray-200">
                      {isMeVictim ? (
                        <span className="text-orange-600 dark:text-orange-400">
                          ✕ {entry.victim.name}
                        </span>
                      ) : (
                        entry.victim.name
                      )}
                    </td>
                    <td className="p-2 text-right font-semibold text-red-600 dark:text-red-400">
                      {Math.round(entry.damage)}
                    </td>
                    <td className="p-2 text-gray-600 dark:text-gray-400 text-xs max-w-[120px] truncate">
                      {entry.weapon}
                    </td>
                    <td className="p-2 text-gray-600 dark:text-gray-400 text-xs max-w-[100px] truncate">
                      {entry.damageReason}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredLogs.length > 300 && (
            <div className="text-center py-2 text-xs text-gray-500 dark:text-gray-400">
              상위 300개 항목 표시 중 (전체{' '}
              {filteredLogs.length.toLocaleString()}개)
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {error ? (
        <div className="text-center py-8 text-red-500 dark:text-red-400">
          데미지 로그 데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      ) : isLoading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2" />
          데이터 로딩 중...
        </div>
      ) : (
        data && renderContent(data)
      )}
    </div>
  );
}
