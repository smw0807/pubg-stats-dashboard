'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMatchSummary } from '~/features/match-analysis/queries';
import AnalysisCard from '~/components/match-analysis/AnalysisCard';
import TelemetrySection from '~/components/match-analysis/telemetry/TelemetrySection';
import {
  getMatchAnalysisCard,
  MATCH_ANALYSIS_CARDS,
  type MatchAnalysisCardKey,
} from '~/features/match-analysis/cardRegistry';

export default function MatchAnalysisPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [selectedCard, setSelectedCard] =
    useState<MatchAnalysisCardKey | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const platform = params.platform as string;
  const matchId = params.matchId as string;
  const playerName = params.playerName as string;

  // mapName: URL 파라미터 우선, 없으면 summary API에서 가져옴
  const mapNameFromUrl = searchParams.get('mapName') ?? '';
  const { data: summaryData } = useMatchSummary(platform, matchId);
  const mapName = mapNameFromUrl || summaryData?.mapName || '';
  const selectedCardDefinition = getMatchAnalysisCard(selectedCard);
  const SelectedCard = selectedCardDefinition?.Component;

  const handleBack = () => {
    router.back();
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
          {MATCH_ANALYSIS_CARDS.map((card) => (
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
          {SelectedCard ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <SelectedCard
                platform={platform}
                matchId={matchId}
                playerName={playerName}
                setIsLoading={setIsLoading}
              />
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
