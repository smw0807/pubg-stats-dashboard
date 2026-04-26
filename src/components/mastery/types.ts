import type { WeaponCategory } from "~/models/weaponMastery";

export type WeaponMasterySortKey = "level" | "kills" | "damage" | "headshots";
export type WeaponCategoryFilter = "ALL" | WeaponCategory;
