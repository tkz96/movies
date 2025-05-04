import { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import useFavorites from '../hooks/useFavorites';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          You haven't added any favorites yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map(movie => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              showRemove
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}