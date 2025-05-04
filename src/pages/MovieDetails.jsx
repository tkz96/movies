import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RatingsContainer from '../components/MovieDetails/RatingsContainer';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
      setIsLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={`min-h-screen bg-gray-100 p-8 ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Movie Poster */}
          <div className="md:w-1/3">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="md:w-2/3 p-8">
            {/* Title and Metadata */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{movie.Title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {movie.Year}
              </span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {movie.Rated}
              </span>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {movie.Runtime}
              </span>
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {movie.Genre}
              </span>
            </div>

            {/* Ratings */}
            <RatingsContainer ratings={movie.Ratings} imdbVotes={movie.imdbVotes} />

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-gray-600"><strong>Released:</strong> {movie.Released}</p>
                <p className="text-gray-600"><strong>Country:</strong> {movie.Country}</p>
                <p className="text-gray-600"><strong>Language:</strong> {movie.Language}</p>
                {movie.DVD !== 'N/A' && (
                  <p className="text-gray-600"><strong>DVD Release:</strong> {movie.DVD}</p>
                )}
              </div>
              <div>
                {movie.BoxOffice !== 'N/A' && (
                  <p className="text-gray-600"><strong>Box Office:</strong> {movie.BoxOffice}</p>
                )}
                {movie.Production !== 'N/A' && (
                  <p className="text-gray-600"><strong>Production:</strong> {movie.Production}</p>
                )}
                <p className="text-gray-600"><strong>Type:</strong> {movie.Type}</p>
                {movie.Website !== 'N/A' && (
                  <p className="text-gray-600">
                    <strong>Website:</strong>{' '}
                    <a href={movie.Website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      Official Site
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="space-y-8">
              {/* Plot */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Plot Summary</h2>
                <p className="text-gray-600 leading-relaxed">{movie.Plot}</p>
              </section>

              {/* Cast & Crew */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Cast & Crew</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600"><strong>Director:</strong> {movie.Director}</p>
                    <p className="text-gray-600"><strong>Writer:</strong> {movie.Writer}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>Actors:</strong> {movie.Actors}</p>
                  </div>
                </div>
              </section>

              {/* Awards */}
              {movie.Awards !== 'N/A' && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Awards</h2>
                  <p className="text-gray-600">{movie.Awards}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}