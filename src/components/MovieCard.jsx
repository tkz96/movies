import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = isFavorite
      ? favorites.filter(fav => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative border rounded shadow bg-white p-2">
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-red-500 text-xl"
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded" />
        <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
        <p className="text-sm text-gray-600">{movie.Year}</p>
      </Link>
    </div>
  );
}
