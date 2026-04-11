'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMatchSummary } from '~/components/match-analysis/hooks/useMatchSummary';
import AnalysisCard from '~/components/match-analysis/AnalysisCard';
import MatchSummaryCard from '~/components/match-analysis/MatchSummaryCard';
import TeamRankCard from '~/components/match-analysis/TeamRankCard';
import PlayerStatsCard from '~/components/match-analysis/PlayerStatsCard';
import KillLeaderboardCard from '~/components/match-analysis/KillLeaderboardCard';
import DamageLeaderboardCard from '~/components/match-analysis/DamageLeaderboardCard';
import SurvivalLeaderboardCard from '~/components/match-analysis/SurvivalLeaderboardCard';
import TeamAnalysisCard from '~/components/match-analysis/TeamAnalysisCard';
import MatchStatisticsCard from '~/components/match-analysis/MatchStatisticsCard';
import PlayerPerformanceCard from '~/components/match-analysis/PlayerPerformanceCard';
import TelemetrySection from '~/components/match-analysis/telemetry/TelemetrySection';

const CARD_LIST = [
  {
    key: 'summary',
    title: '매치 요약 정보',
    icon: '📊',
    description: '매치의 전체 요약',
  },
  {
    key: 'team',
    title: '팀 순위',
    icon: '🏆',
    description: '팀별 순위와 기본 통계',
  },
  {
    key: 'player',
    title: '플레이어 통계',
    icon: '👥',
    description: '모든 플레이어의 상세 통계',
  },
  {
    key: 'kills',
    title: '킬 리더보드',
    icon: '🔫',
    description: '킬 상위 플레이어',
  },
  {
    key: 'damage',
    title: '데미지 리더보드',
    icon: '💥',
    description: '데미지 상위 플레이어',
  },
  {
    key: 'survival',
    title: '생존 시간 리더보드',
    icon: '⏱️',
    description: '생존 시간 상위 플레이어',
  },
  {
    key: 'teamAnalysis',
    title: '팀 분석',
    icon: '🔍',
    description: '팀별 상세 분석',
  },
  {
    key: 'playerPerformance',
    title: '플레이어 성과 분석',
    icon: '⚡',
    description: '플레이어별 성과 분석',
  },
  {
    key: 'statistics',
    title: '매치 통계',
    icon: '📈',
    description: '매치 전체 통계 요약',
  },
];

export default function MatchAnalysisPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const platform = params.platform as string;
  const matchId = params.matchId as string;
  const playerName = params.playerName as string;

  // mapName: URL 파라미터 우선, 없으면 summary API에서 가져옴
  const mapNameFromUrl = searchParams.get('mapName') ?? '';
  const { data: summaryData } = useMatchSummary(platform, matchId);
  const mapName = mapNameFromUrl || (summaryData as { mapName?: string })?.mapName || '';

  const handleBack = () => {
    router.back();
  };

  const renderSelectedCardContent = () => {
    if (!selectedCard) return null;

    switch (selectedCard) {
      case 'summary':
        return (
          // 매치 요약 정보
          <MatchSummaryCard
            platform={platform}
            matchId={matchId}
            setIsLoading={setIsLoading}
          />
        );

      case 'team':
        return (
          // 팀 순위
          <TeamRankCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );

      case 'player':
        return (
          // 플레이어 통계
          <PlayerStatsCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );

      case 'kills':
        return (
          // 킬 리더보드
          <KillLeaderboardCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );

      case 'damage':
        return (
          // 데미지 리더보드
          <DamageLeaderboardCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );

      case 'survival':
        return (
          // 생존 시간 리더보드
          <SurvivalLeaderboardCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );

      case 'teamAnalysis':
        return (
          // 팀 분석
          <TeamAnalysisCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );

      case 'playerPerformance':
        return (
          // 플레이어 성과 분석
          <PlayerPerformanceCard
            platform={platform}
            matchId={matchId}
            playerName={playerName}
            setIsLoading={setIsLoading}
          />
        );

      case 'statistics':
        return (
          // 매치 통계
          <MatchStatisticsCard
            platform={platform}
            matchId={matchId}
            setIsLoading={setIsLoading}
          />
        );
      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center text-xl text-blue-700 dark:text-blue-400 font-semibold">
            &quot;{CARD_LIST.find((c) => c.key === selectedCard)?.title}&quot;
            결과 영역입니다.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              ← 뒤로 가기
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mr-10">
              매치 분석
            </h1>
          </div>
        </div>

        {/* 분석 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARD_LIST.map((card) => (
            <AnalysisCard
              key={card.key}
              title={card.title}
              icon={card.icon}
              description={card.description}
              onClick={() => setSelectedCard(card.key)}
              isLoading={isLoading}
              hasData={card.key === selectedCard}
            />
          ))}
        </div>

        {/* 결과 영역 */}
        <div className="mt-10 min-h-[200px]">
          {selectedCard ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              {renderSelectedCardContent()}
            </div>
          ) : (
            <div className="text-center text-gray-400 dark:text-gray-500 text-lg">
              카드를 클릭하면 결과가 여기에 표시됩니다.
            </div>
          )}
        </div>

        {/* 원격 분석 섹션 */}
        <TelemetrySection
          platform={platform}
          matchId={matchId}
          playerName={playerName}
          mapName={mapName}
        />
      </div>
    </div>
  );
}
