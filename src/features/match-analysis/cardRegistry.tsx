import type { ComponentType } from 'react';
import DamageLeaderboardCard from '~/components/match-analysis/DamageLeaderboardCard';
import KillLeaderboardCard from '~/components/match-analysis/KillLeaderboardCard';
import MatchStatisticsCard from '~/components/match-analysis/MatchStatisticsCard';
import MatchSummaryCard from '~/components/match-analysis/MatchSummaryCard';
import PlayerPerformanceCard from '~/components/match-analysis/PlayerPerformanceCard';
import PlayerStatsCard from '~/components/match-analysis/PlayerStatsCard';
import SurvivalLeaderboardCard from '~/components/match-analysis/SurvivalLeaderboardCard';
import TeamAnalysisCard from '~/components/match-analysis/TeamAnalysisCard';
import TeamRankCard from '~/components/match-analysis/TeamRankCard';

export interface MatchAnalysisCardProps {
  platform: string;
  matchId: string;
  playerName: string;
  setIsLoading: (isLoading: boolean) => void;
}

interface MatchAnalysisCardDefinition<Key extends string = string> {
  key: Key;
  title: string;
  icon: string;
  description: string;
  Component: ComponentType<MatchAnalysisCardProps>;
}

const SummaryCard = ({
  platform,
  matchId,
  setIsLoading,
}: MatchAnalysisCardProps) => (
  <MatchSummaryCard
    platform={platform}
    matchId={matchId}
    setIsLoading={setIsLoading}
  />
);

const StatisticsCard = ({
  platform,
  matchId,
  setIsLoading,
}: MatchAnalysisCardProps) => (
  <MatchStatisticsCard
    platform={platform}
    matchId={matchId}
    setIsLoading={setIsLoading}
  />
);

export const MATCH_ANALYSIS_CARDS = [
  {
    key: 'summary',
    title: '매치 요약 정보',
    icon: '📊',
    description: '매치의 전체 요약',
    Component: SummaryCard,
  },
  {
    key: 'team',
    title: '팀 순위',
    icon: '🏆',
    description: '팀별 순위와 기본 통계',
    Component: TeamRankCard,
  },
  {
    key: 'player',
    title: '플레이어 통계',
    icon: '👥',
    description: '모든 플레이어의 상세 통계',
    Component: PlayerStatsCard,
  },
  {
    key: 'kills',
    title: '킬 리더보드',
    icon: '🔫',
    description: '킬 상위 플레이어',
    Component: KillLeaderboardCard,
  },
  {
    key: 'damage',
    title: '데미지 리더보드',
    icon: '💥',
    description: '데미지 상위 플레이어',
    Component: DamageLeaderboardCard,
  },
  {
    key: 'survival',
    title: '생존 시간 리더보드',
    icon: '⏱️',
    description: '생존 시간 상위 플레이어',
    Component: SurvivalLeaderboardCard,
  },
  {
    key: 'teamAnalysis',
    title: '팀 분석',
    icon: '🔍',
    description: '팀별 상세 분석',
    Component: TeamAnalysisCard,
  },
  {
    key: 'playerPerformance',
    title: '플레이어 성과 분석',
    icon: '⚡',
    description: '플레이어별 성과 분석',
    Component: PlayerPerformanceCard,
  },
  {
    key: 'statistics',
    title: '매치 통계',
    icon: '📈',
    description: '매치 전체 통계 요약',
    Component: StatisticsCard,
  },
] as const satisfies readonly MatchAnalysisCardDefinition[];

export type MatchAnalysisCardKey = (typeof MATCH_ANALYSIS_CARDS)[number]['key'];

export const getMatchAnalysisCard = (key: MatchAnalysisCardKey | null) => {
  if (!key) return null;
  return MATCH_ANALYSIS_CARDS.find((card) => card.key === key) ?? null;
};
