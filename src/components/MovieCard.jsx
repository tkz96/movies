import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : '/assets/logo/404ImageNotFound.svg'}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded-t-xl cursor-pointer"
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
        />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 stroke-2 fill-none'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={movie.Title}>
          {movie.Title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
            {movie.Year}
          </span>
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
              ⭐ {movie.imdbRating}
            </span>
          )}
        </div>

        {movie.Director && movie.Director !== 'N/A' && (
          <p className="text-sm text-gray-600 truncate" title={`Director: ${movie.Director}`}>
            <span className="font-semibold">Director:</span> {movie.Director}
          </p>
        )}
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string,
    imdbID: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    imdbRating: PropTypes.string,
    Director: PropTypes.string
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func.isRequired
};

MovieCard.defaultProps = {
  isFavorite: false
};