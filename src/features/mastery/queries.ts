'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchWeaponMastery } from './api';

export const useWeaponMastery = (platform: string, playerName: string) => {
  return useQuery({
    queryKey: ['weaponMastery', platform, playerName],
    queryFn: () => fetchWeaponMastery(platform, playerName),
    enabled: !!platform && !!playerName,
    staleTime: 1000 * 60 * 5,
  });
};
