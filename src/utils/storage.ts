import type { FavoritePackage } from "../types/index";

const FAVORITES_KEY = "favorites";

export const getFavorites = (): FavoritePackage[] => {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
};

export const saveFavorites = (favorites: FavoritePackage[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};
