'use client';

import { useEffect, useState } from 'react';
import { useTelemetryMovement } from '../hooks/useTelemetryMovement';
import { MovementLogData } from '~/models/telemetry';
import LogMapCanvas from './LogMapCanvas';

interface Props {
  platform: string;
  matchId: string;
  playerName: string;
  mapName: string;
  setIsLoading: (v: boolean) => void;
}

type ViewMode = 'list' | 'map';

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}분 ${s}초`;
};

export default function MovementLogCard({
  platform,
  matchId,
  playerName,
  mapName,
  setIsLoading,
}: Props) {
  const [filterPlayer, setFilterPlayer] = useState(playerName);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { data, isLoading, error } = useTelemetryMovement(
    platform,
    matchId,
    filterPlayer || undefined
  );

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const renderContent = (logs: MovementLogData) => {
    if (logs.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          이동 경로 데이터가 없습니다.
        </div>
      );
    }

    const maxElapsed = Math.max(...logs.map((l) => l.elapsedTime));
    const minHealth = Math.min(...logs.map((l) => l.health));

    return (
      <div className="space-y-4">
        {/* 요약 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {logs.length.toLocaleString()}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">총 위치 로그</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatTime(maxElapsed)}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">마지막 기록</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center border border-red-200 dark:border-red-800">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {Math.round(minHealth)}
            </div>
            <div className="text-sm text-red-700 dark:text-red-300">최저 체력</div>
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
            movementData={logs}
          />
        ) : (
          <div className="overflow-x-auto max-h-80 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="text-left p-2 text-gray-700 dark:text-gray-300">플레이어</th>
                  <th className="text-right p-2 text-gray-700 dark:text-gray-300">X</th>
                  <th className="text-right p-2 text-gray-700 dark:text-gray-300">Y</th>
                  <th className="text-right p-2 text-gray-700 dark:text-gray-300">체력</th>
                  <th className="text-right p-2 text-gray-700 dark:text-gray-300">생존자 수</th>
                  <th className="text-right p-2 text-gray-700 dark:text-gray-300">경과 시간</th>
                </tr>
              </thead>
              <tbody>
                {logs.slice(0, 200).map((entry, i) => {
                  const isMe = entry.playerName === playerName;
                  return (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 dark:border-gray-700 ${
                        isMe
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <td className="p-2 font-medium text-gray-800 dark:text-gray-200">
                        {isMe ? (
                          <span className="text-blue-600 dark:text-blue-400">★ {entry.playerName}</span>
                        ) : (
                          entry.playerName
                        )}
                      </td>
                      <td className="p-2 text-right text-gray-600 dark:text-gray-400">
                        {Math.round(entry.location.x)}
                      </td>
                      <td className="p-2 text-right text-gray-600 dark:text-gray-400">
                        {Math.round(entry.location.y)}
                      </td>
                      <td
                        className={`p-2 text-right font-medium ${
                          entry.health > 60
                            ? 'text-green-600 dark:text-green-400'
                            : entry.health > 30
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {Math.round(entry.health)}
                      </td>
                      <td className="p-2 text-right text-gray-600 dark:text-gray-400">
                        {entry.numAlivePlayers}
                      </td>
                      <td className="p-2 text-right text-gray-600 dark:text-gray-400">
                        {formatTime(entry.elapsedTime)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {logs.length > 200 && (
              <div className="text-center py-2 text-xs text-gray-500 dark:text-gray-400">
                상위 200개 항목 표시 중 (전체 {logs.length.toLocaleString()}개)
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {error ? (
        <div className="text-center py-8 text-red-500 dark:text-red-400">
          이동 경로 데이터를 불러오는 중 오류가 발생했습니다.
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
