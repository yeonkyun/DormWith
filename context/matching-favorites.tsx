import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type FavoriteProfile = {
  id: string;
  name: string;
  major: string;
  gender: string;
  dorm: string;
  tags: string[];
};

type MatchingFavoritesContextValue = {
  favorites: FavoriteProfile[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (profile: FavoriteProfile) => void;
};

const MatchingFavoritesContext = createContext<MatchingFavoritesContextValue | null>(null);

export function MatchingFavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProfile[]>([]);

  const isFavorite = (id: string) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = (profile: FavoriteProfile) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === profile.id)) {
        return prev.filter((fav) => fav.id !== profile.id);
      }
      return [...prev, profile];
    });
  };

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
    }),
    [favorites],
  );

  return (
    <MatchingFavoritesContext.Provider value={value}>
      {children}
    </MatchingFavoritesContext.Provider>
  );
}

export function useMatchingFavorites() {
  const ctx = useContext(MatchingFavoritesContext);
  if (!ctx) {
    throw new Error('useMatchingFavorites must be used within MatchingFavoritesProvider');
  }
  return ctx;
}
