import { useState, useEffect } from 'react';

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites(prev => 
      prev.some(f => f.imdbID === movie.imdbID)
        ? prev.filter(f => f.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  };

  const isFavorite = (imdbID) => 
    favorites.some(f => f.imdbID === imdbID);

  return { favorites, toggleFavorite, isFavorite };
}