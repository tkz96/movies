import { useState, useEffect } from 'react';
import { searchMovies, getMovieDetails } from '../utils/api';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import SearchHeader from '../components/SearchHeader';

export default function Home() {
  const [query, setQuery] = useState('batman');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('title');
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const { Search: results, totalResults } = await searchMovies(query, page);

        if (!results) throw new Error('No movies found');

        const detailedMovies = await Promise.all(
          results.map(movie => getMovieDetails(movie.imdbID))
        );

        setMovies(detailedMovies);
        setTotalPages(Math.ceil(parseInt(totalResults) / 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === 'title') return (a.Title || '').localeCompare(b.Title || '');
    if (sortBy === 'year') return parseInt(b.Year || 0) - parseInt(a.Year || 0);
    if (sortBy === 'rating') return parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0);
    return 0;
  });

  const toggleFavorite = (movie) => {
    const newFavorites = favorites.some(f => f.imdbID === movie.imdbID)
      ? favorites.filter(f => f.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  if (error) return <Error message={error} />;

  return (
    <div className="container mx-auto p-4">
      <SearchHeader
        query={query}
        setQuery={setQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleSearch={handleSearch}
        favoritesCount={favorites.length}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <MovieGrid>
            {sortedMovies
              .filter(movie => movie.imdbID) // filter invalid entries
              .map(movie => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isFavorite={favorites.some(f => f.imdbID === movie.imdbID)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
          </MovieGrid>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

// Sub-components
const MovieGrid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
    {children}
  </div>
);

const LoadingSpinner = () => (
  <div className="text-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
  </div>
);

const Error = ({ message }) => (
  <div className="p-4 bg-red-100 text-red-700 rounded-lg">{message}</div>
);