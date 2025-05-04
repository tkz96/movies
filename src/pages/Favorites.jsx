import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
