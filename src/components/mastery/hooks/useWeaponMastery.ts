import { useQuery } from "@tanstack/react-query";
import type { WeaponMasterySummaryResponse } from "~/models/weaponMastery";

const fetchWeaponMastery = async (
  platform: string,
  playerName: string
): Promise<WeaponMasterySummaryResponse> => {
  const params = new URLSearchParams({
    platform,
    playerName,
  });

  const res = await fetch(`/api/mastery/weapon?${params.toString()}`);

  if (!res.ok) {
    throw new Error("무기 마스터리 정보를 찾을 수 없습니다.");
  }

  return res.json();
};

export const useWeaponMastery = (platform: string, playerName: string) => {
  return useQuery({
    queryKey: ["weaponMastery", platform, playerName],
    queryFn: () => fetchWeaponMastery(platform, playerName),
    enabled: !!platform && !!playerName,
    staleTime: 1000 * 60 * 5,
  });
};
