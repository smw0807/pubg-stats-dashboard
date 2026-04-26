'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchDamage,
  fetchKills,
  fetchMatchStatistics,
  fetchMatchSummary,
  fetchPlayerPerformance,
  fetchPlayerStats,
  fetchSurvival,
  fetchTeamAnalysis,
  fetchTeamRank,
  fetchTelemetryDamage,
  fetchTelemetryGroggy,
  fetchTelemetryKills,
  fetchTelemetryMovement,
} from './api';

const MATCH_STALE_TIME = 1000 * 60 * 5;

export const useMatchSummary = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['matchSummary', platform, matchId],
    queryFn: () => fetchMatchSummary({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useTeamRank = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['teamRank', platform, matchId],
    queryFn: () => fetchTeamRank({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const usePlayerStats = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['playerStats', platform, matchId],
    queryFn: () => fetchPlayerStats({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useKills = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['kills', platform, matchId],
    queryFn: () => fetchKills({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useDamage = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['damage', platform, matchId],
    queryFn: () => fetchDamage({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useSurvival = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['survival', platform, matchId],
    queryFn: () => fetchSurvival({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useTeamAnalysis = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['teamAnalysis', platform, matchId],
    queryFn: () => fetchTeamAnalysis({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const usePlayerPerformance = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['playerPerformance', platform, matchId],
    queryFn: () => fetchPlayerPerformance({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useMatchStatistics = (platform: string, matchId: string) => {
  return useQuery({
    queryKey: ['matchStatistics', platform, matchId],
    queryFn: () => fetchMatchStatistics({ platform, matchId }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useTelemetryMovement = (
  platform: string,
  matchId: string,
  playerName?: string
) => {
  return useQuery({
    queryKey: ['telemetry', 'movement', platform, matchId, playerName],
    queryFn: () => fetchTelemetryMovement({ platform, matchId, playerName }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useTelemetryKills = (
  platform: string,
  matchId: string,
  playerName?: string
) => {
  return useQuery({
    queryKey: ['telemetry', 'kills', platform, matchId, playerName],
    queryFn: () => fetchTelemetryKills({ platform, matchId, playerName }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useTelemetryGroggy = (
  platform: string,
  matchId: string,
  playerName?: string
) => {
  return useQuery({
    queryKey: ['telemetry', 'groggy', platform, matchId, playerName],
    queryFn: () => fetchTelemetryGroggy({ platform, matchId, playerName }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};

export const useTelemetryDamage = (
  platform: string,
  matchId: string,
  playerName?: string
) => {
  return useQuery({
    queryKey: ['telemetry', 'damage', platform, matchId, playerName],
    queryFn: () => fetchTelemetryDamage({ platform, matchId, playerName }),
    enabled: !!platform && !!matchId,
    staleTime: MATCH_STALE_TIME,
  });
};
