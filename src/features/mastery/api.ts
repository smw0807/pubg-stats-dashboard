import type { WeaponMasterySummaryResponse } from '~/models/weaponMastery';

export const fetchWeaponMastery = async (
  platform: string,
  playerName: string
): Promise<WeaponMasterySummaryResponse> => {
  const params = new URLSearchParams({
    platform,
    playerName,
  });

  const res = await fetch(`/api/mastery/weapon?${params.toString()}`);

  if (!res.ok) {
    throw new Error('무기 마스터리 정보를 찾을 수 없습니다.');
  }

  return res.json();
};
