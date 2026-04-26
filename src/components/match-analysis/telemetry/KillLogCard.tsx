'use client';

import { useEffect, useState } from 'react';
import { useTelemetryKills } from '~/features/match-analysis/queries';
import { KillLogData } from '~/models/telemetry';
import LogMapCanvas from './LogMapCanvas';

interface Props {
  platform: string;
  matchId: string;
  playerName: string;
  mapName: string;
  setIsLoading: (v: boolean) => void;
}

type ViewMode = 'list' | 'map';

const formatTimestamp = (ts: string) => {
  const d = new Date(ts);
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(2, '0')}`;
};

const formatDistance = (meters: number) => {
  if (meters >= 100000) return `${(meters / 100000).toFixed(1)}km`;
  return `${Math.round(meters / 100)}m`;
};

export default function KillLogCard({
  platform,
  matchId,
  playerName,
  mapName,
  setIsLoading,
}: Props) {
  const [filterPlayer, setFilterPlayer] = useState(playerName);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { data, isLoading, error } = useTelemetryKills(
    platform,
    matchId,
    filterPlayer || undefined
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const renderContent = (logs: KillLogData) => {
    if (logs.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          킬 로그 데이터가 없습니다.
        </div>
      );
    }

    const suicideCount = logs.filter((l) => l.isSuicide).length;
    const playerKills = logs.filter((l) => l.killer.name === playerName);
    const playerDeaths = logs.filter((l) => l.victim.name === playerName);

    return (
      <div className="space-y-4">
        {/* 요약 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center border border-red-200 dark:border-red-800">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{logs.length}</div>
            <div className="text-sm text-red-700 dark:text-red-300">총 킬</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{playerKills.length}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">내 킬</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-600">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">{playerDeaths.length}</div>
            <div className="text-sm text-gray-700 dark:text-gray-400">사망</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center border border-orange-200 dark:border-orange-800">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{suicideCount}</div>
            <div className="text-sm text-orange-700 dark:text-orange-300">자살</div>
          </div>
        </div>

        {/* 필터 + 뷰 토글 */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400 shrink-0">
            플레이어 필터:
          </label>
          <input
            type="text"
            value={filterPlayer}
            onChange={(e) => setFilterPlayer(e.target.value)}
            placeholder="플레이어 이름 (비우면 전체)"
            className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
          <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              📋 목록
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 text-sm transition-colors ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              🗺️ 지도
            </button>
          </div>
        </div>

        {viewMode === 'map' ? (
          <LogMapCanvas
            mapName={mapName}
            playerName={playerName}
            killData={logs}
          />
        ) : (
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300">시간</th>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300">킬러</th>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300">피해자</th>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300">무기</th>
                  <th className="text-right p-2 text-gray-700 dark:text-gray-300">거리</th>
                  <th className="text-center p-2 text-gray-700 dark:text-gray-300">자살</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((entry, i) => {
                  const isMeKiller = entry.killer.name === playerName;
                  const isMeVictim = entry.victim.name === playerName;
                  return (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 dark:border-gray-700 ${
                        isMeKiller
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : isMeVictim
                          ? 'bg-red-50 dark:bg-red-900/20'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <td className="p-2 text-gray-500 dark:text-gray-400">
                        {formatTimestamp(entry.timestamp)}
                      </td>
                      <td className="p-2 font-medium text-gray-800 dark:text-gray-200">
                        {isMeKiller ? (
                          <span className="text-blue-600 dark:text-blue-400">★ {entry.killer.name}</span>
                        ) : (
                          entry.killer.name
                        )}
                      </td>
                      <td className="p-2 text-gray-800 dark:text-gray-200">
                        {isMeVictim ? (
                          <span className="text-red-600 dark:text-red-400">✕ {entry.victim.name}</span>
                        ) : (
                          entry.victim.name
                        )}
                      </td>
                      <td className="p-2 text-gray-600 dark:text-gray-400 max-w-[140px] truncate">
                        {entry.weapon}
                      </td>
                      <td className="p-2 text-right text-gray-600 dark:text-gray-400">
                        {formatDistance(entry.distance)}
                      </td>
                      <td className="p-2 text-center">
                        {entry.isSuicide ? (
                          <span className="text-orange-500 text-xs font-semibold">자살</span>
                        ) : (
                          <span className="text-gray-300 dark:text-gray-600">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {error ? (
        <div className="text-center py-8 text-red-500 dark:text-red-400">
          킬 로그 데이터를 불러오는 중 오류가 발생했습니다.
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
