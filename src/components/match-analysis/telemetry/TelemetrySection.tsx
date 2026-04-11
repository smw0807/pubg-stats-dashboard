'use client';

import { useState } from 'react';
import MovementLogCard from './MovementLogCard';
import KillLogCard from './KillLogCard';
import GroggyLogCard from './GroggyLogCard';
import DamageLogCard from './DamageLogCard';
import TelemetryMapView from './TelemetryMapView';

interface Props {
  platform: string;
  matchId: string;
  playerName: string;
  mapName: string;
}

const TELEMETRY_CARDS = [
  {
    key: 'map',
    title: '지도 보기',
    icon: '🗺️',
    description: '지도 위에 이동경로·킬·기절·데미지 표시',
  },
  {
    key: 'movement',
    title: '이동 경로',
    icon: '👣',
    description: '플레이어의 위치 이동 기록',
  },
  {
    key: 'kills',
    title: '킬 로그',
    icon: '💀',
    description: '매치에서 발생한 킬 이벤트',
  },
  {
    key: 'groggy',
    title: '기절(DBNO) 로그',
    icon: '👊',
    description: '매치에서 발생한 기절 이벤트',
  },
  {
    key: 'damage',
    title: '데미지 로그',
    icon: '💥',
    description: '매치에서 발생한 데미지 이벤트',
  },
];

export default function TelemetrySection({
  platform,
  matchId,
  playerName,
  mapName,
}: Props) {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const renderContent = () => {
    switch (selectedTab) {
      case 'map':
        return (
          <TelemetryMapView
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            mapName={mapName}
          />
        );
      case 'movement':
        return (
          <MovementLogCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );
      case 'kills':
        return (
          <KillLogCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );
      case 'groggy':
        return (
          <GroggyLogCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );
      case 'damage':
        return (
          <DamageLogCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-10">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📡</span>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            원격 분석 (Telemetry)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            매치 내 상세 이벤트 데이터를 확인하세요
          </p>
        </div>
      </div>

      {/* 탭 카드 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {TELEMETRY_CARDS.map((card) => {
          const isActive = selectedTab === card.key;
          return (
            <button
              key={card.key}
              onClick={() => setSelectedTab(isActive ? null : card.key)}
              disabled={isLoading && !isActive}
              className={`rounded-lg p-4 text-left transition-all duration-200 border-2 ${
                isActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
              } disabled:opacity-50`}
            >
              <div className="text-2xl mb-2">{card.icon}</div>
              <h3
                className={`font-semibold text-sm ${
                  isActive
                    ? 'text-blue-700 dark:text-blue-300'
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                {card.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {card.description}
              </p>
              {isActive && isLoading && (
                <div className="mt-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 콘텐츠 영역 */}
      {selectedTab && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl">
              {TELEMETRY_CARDS.find((c) => c.key === selectedTab)?.icon}
            </span>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {TELEMETRY_CARDS.find((c) => c.key === selectedTab)?.title}
            </h3>
          </div>
          {renderContent()}
        </div>
      )}
    </div>
  );
}
