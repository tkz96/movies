import React, { useState, useEffect } from 'react';
import { searchMovies } from '../utils/api';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [query, setQuery] = useState('batman');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await searchMovies(query, page);
      setMovies(data.Search || []);
    };
    fetchMovies();
  }, [query, page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movie Browser</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
