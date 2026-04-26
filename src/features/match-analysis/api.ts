import type { DamageLeaderboardData } from '~/models/damageLeaderboard';
import type { KillLeaderboardData } from '~/models/killLeaderboard';
import type { MatchStatistics } from '~/models/matchStatistics';
import type { PlayerPerformanceAnalysis } from '~/models/playerPerformance';
import type { PlayerStatsData } from '~/models/playerStats';
import type { MatchSummary } from '~/models/summary';
import type { SurvivalLeaderboardData } from '~/models/survivalLeaderboard';
import type { TeamAnalysisData } from '~/models/teamAnalysis';
import type { TeamRankData } from '~/models/teamRank';
import type {
  DamageLogData,
  GroggyLogData,
  KillLogData,
  MovementLogData,
} from '~/models/telemetry';

type MatchRequest = {
  platform: string;
  matchId: string;
};

type TelemetryRequest = MatchRequest & {
  playerName?: string;
};

const fetchJson = async <T>(
  url: string,
  errorMessage: string
): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(errorMessage);
  }

  return res.json();
};

const buildQuery = (params: Record<string, string | undefined>) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });

  return query.toString();
};

export const fetchMatchSummary = ({ platform, matchId }: MatchRequest) => {
  return fetchJson<MatchSummary['summary']>(
    `/api/matches/summary?${buildQuery({ platform, matchId })}`,
    '매치 요약 정보를 불러올 수 없습니다.'
  );
};

export const fetchTeamRank = ({ platform, matchId }: MatchRequest) => {
  return fetchJson<TeamRankData>(
    `/api/matches/teams?${buildQuery({ platform, matchId })}`,
    '팀 순위 정보를 찾을 수 없습니다.'
  );
};

export const fetchPlayerStats = ({ platform, matchId }: MatchRequest) => {
  return fetchJson<PlayerStatsData>(
    `/api/matches/players?${buildQuery({ platform, matchId })}`,
    '플레이어 통계 정보를 찾을 수 없습니다.'
  );
};

export const fetchKills = ({ platform, matchId }: MatchRequest) => {
  return fetchJson<KillLeaderboardData>(
    `/api/matches/leaderboard/kills?${buildQuery({ platform, matchId })}`,
    '최다 킬 플레이어 정보를 찾을 수 없습니다.'
  );
};

export const fetchDamage = ({ platform, matchId }: MatchRequest) => {
  return fetchJson<DamageLeaderboardData>(
    `/api/matches/leaderboard/damage?${buildQuery({ platform, matchId })}`,
    '최다 데미지 플레이어 정보를 찾을 수 없습니다.'
  );
};

export const fetchSurvival = ({ platform, matchId }: MatchRequest) => {
  return fetchJson<SurvivalLeaderboardData>(
    `/api/matches/leaderboard/survival?${buildQuery({ platform, matchId })}`,
    '최다 생존 플레이어 정보를 찾을 수 없습니다.'
  );
};

export const fetchTeamAnalysis = ({ platform, matchId }: MatchRequest) => {
  return fetchJson<TeamAnalysisData>(
    `/api/matches/analysis/teams?${buildQuery({ platform, matchId })}`,
    '팀 분석 정보를 찾을 수 없습니다.'
  );
};

export const fetchPlayerPerformance = ({
  platform,
  matchId,
}: MatchRequest) => {
  return fetchJson<PlayerPerformanceAnalysis[]>(
    `/api/matches/analysis/performance?${buildQuery({ platform, matchId })}`,
    '플레이어 성과 분석 정보를 찾을 수 없습니다.'
  );
};

export const fetchMatchStatistics = ({ platform, matchId }: MatchRequest) => {
  return fetchJson<MatchStatistics>(
    `/api/matches/statistics?${buildQuery({ platform, matchId })}`,
    '매치 통계 정보를 찾을 수 없습니다.'
  );
};

export const fetchTelemetryMovement = ({
  platform,
  matchId,
  playerName,
}: TelemetryRequest) => {
  return fetchJson<MovementLogData>(
    `/api/telemetry/movement?${buildQuery({ platform, matchId, playerName })}`,
    '이동 경로 데이터를 불러올 수 없습니다.'
  );
};

export const fetchTelemetryKills = ({
  platform,
  matchId,
  playerName,
}: TelemetryRequest) => {
  return fetchJson<KillLogData>(
    `/api/telemetry/kills?${buildQuery({ platform, matchId, playerName })}`,
    '킬 로그 데이터를 불러올 수 없습니다.'
  );
};

export const fetchTelemetryGroggy = ({
  platform,
  matchId,
  playerName,
}: TelemetryRequest) => {
  return fetchJson<GroggyLogData>(
    `/api/telemetry/groggy?${buildQuery({ platform, matchId, playerName })}`,
    '기절 로그 데이터를 불러올 수 없습니다.'
  );
};

export const fetchTelemetryDamage = ({
  platform,
  matchId,
  playerName,
}: TelemetryRequest) => {
  return fetchJson<DamageLogData>(
    `/api/telemetry/damage?${buildQuery({ platform, matchId, playerName })}`,
    '데미지 로그 데이터를 불러올 수 없습니다.'
  );
};
