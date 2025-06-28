'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

import { useMatchSummary } from '~/components/match-analysis/hooks/useMatchSummary';
import { useTeamRank } from '~/components/match-analysis/hooks/useTeamRank';
import { usePlayerStats } from '~/components/match-analysis/hooks/usePlayerStats';
import { useKills } from '~/components/match-analysis/hooks/useKills';
import { useDamage } from '~/components/match-analysis/hooks/useDamage';
import { useSurvival } from '~/components/match-analysis/hooks/useSurvival';
import { useTeamAnalysis } from '~/components/match-analysis/hooks/useTeamAnalysis';
import { useMatchStatistics } from '~/components/match-analysis/hooks/useMatchStatistics';
import { usePlayerPerformance } from '~/components/match-analysis/hooks/usePlayerPerformance';

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
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const platform = params.platform as string;
  const matchId = params.matchId as string;

  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
  } = useMatchSummary(platform ?? '', matchId ?? '');

  const {
    data: teamRankData,
    isLoading: teamRankLoading,
    error: teamRankError,
  } = useTeamRank(platform ?? '', matchId ?? '');

  const {
    data: playerStatsData,
    isLoading: playerStatsLoading,
    error: playerStatsError,
  } = usePlayerStats(platform ?? '', matchId ?? '');

  const {
    data: killLeaderboardData,
    isLoading: killLeaderboardLoading,
    error: killLeaderboardError,
  } = useKills(platform ?? '', matchId ?? '');

  const {
    data: damageLeaderboardData,
    isLoading: damageLeaderboardLoading,
    error: damageLeaderboardError,
  } = useDamage(platform ?? '', matchId ?? '');

  const {
    data: survivalLeaderboardData,
    isLoading: survivalLeaderboardLoading,
    error: survivalLeaderboardError,
  } = useSurvival(platform ?? '', matchId ?? '');

  const {
    data: teamAnalysisData,
    isLoading: teamAnalysisLoading,
    error: teamAnalysisError,
  } = useTeamAnalysis(platform ?? '', matchId ?? '');

  const {
    data: matchStatisticsData,
    isLoading: matchStatisticsLoading,
    error: matchStatisticsError,
  } = useMatchStatistics(platform ?? '', matchId ?? '');

  const {
    data: playerPerformanceData,
    isLoading: playerPerformanceLoading,
    error: playerPerformanceError,
  } = usePlayerPerformance(platform ?? '', matchId ?? '');

  const handleBack = () => {
    router.back();
  };

  const renderSelectedCardContent = () => {
    if (!selectedCard) return null;

    switch (selectedCard) {
      case 'summary':
        return (
          <MatchSummaryCard
            summary={summaryData}
            isLoading={summaryLoading}
            error={summaryError?.message}
          />
        );

      case 'team':
        return (
          <TeamRankCard
            teamRanks={teamRankData ?? []}
            isLoading={teamRankLoading}
            error={teamRankError?.message}
          />
        );

      case 'player':
        return (
          <PlayerStatsCard
            playerStats={playerStatsData ?? []}
            isLoading={playerStatsLoading}
            error={playerStatsError?.message}
          />
        );

      case 'kills':
        return (
          <KillLeaderboardCard
            killLeaderboard={killLeaderboardData ?? []}
            isLoading={killLeaderboardLoading}
            error={killLeaderboardError?.message}
          />
        );

      case 'damage':
        return (
          <DamageLeaderboardCard
            damageLeaderboard={damageLeaderboardData ?? []}
            isLoading={damageLeaderboardLoading}
            error={damageLeaderboardError?.message}
          />
        );

      case 'survival':
        return (
          <SurvivalLeaderboardCard
            survivalLeaderboard={survivalLeaderboardData ?? []}
            isLoading={survivalLeaderboardLoading}
            error={survivalLeaderboardError?.message}
          />
        );

      case 'teamAnalysis':
        return (
          <TeamAnalysisCard
            teamAnalysis={teamAnalysisData ?? []}
            isLoading={teamAnalysisLoading}
            error={teamAnalysisError?.message}
          />
        );

      case 'statistics':
        return (
          <MatchStatisticsCard
            matchStatistics={matchStatisticsData!}
            isLoading={matchStatisticsLoading}
            error={matchStatisticsError?.message}
          />
        );

      case 'playerPerformance':
        return (
          <PlayerPerformanceCard
            playerPerformance={playerPerformanceData ?? []}
            isLoading={playerPerformanceLoading}
            error={playerPerformanceError?.message}
          />
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center text-xl text-blue-700 font-semibold">
            &quot;{CARD_LIST.find((c) => c.key === selectedCard)?.title}&quot;
            결과 영역입니다.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              ← 뒤로 가기
            </button>
            <h1 className="text-3xl font-bold text-gray-900">매치 분석</h1>
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
              isLoading={card.key === 'summary' && summaryLoading}
              hasData={card.key === selectedCard}
            />
          ))}
        </div>

        {/* 결과 영역 */}
        <div className="mt-10 min-h-[200px]">
          {selectedCard ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              {renderSelectedCardContent()}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-lg">
              카드를 클릭하면 결과가 여기에 표시됩니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
