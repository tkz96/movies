import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({
  movie,
  isFavorite = false,
  onToggleFavorite = () => { }
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded-t-xl cursor-pointer"
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
        />

        <button
          onClick={() => onToggleFavorite(movie)}
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            viewBox="0 0 20 20"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
          >
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.Title}</h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            {movie.Year}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
            ⭐ {movie.imdbRating}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Director:</span> {movie.Director}
        </p>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func
};