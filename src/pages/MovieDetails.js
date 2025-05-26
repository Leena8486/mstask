import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../api/omdbApi';
import ErrorMessage from '../components/ErrorMessage';

export default function MovieDetails() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(imdbID);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [imdbID]);

  if (loading) return <p className="text-center text-xl mt-10">Loading movie details...</p>;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-xl shadow-2xl p-6">
        <Link
          to="/"
          className="inline-block mb-6 text-blue-400 hover:underline text-sm"
          aria-label="Back to search"
        >
          ⬅ Back to Search
        </Link>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
            alt={`${movie.Title} poster`}
            className="w-full md:w-1/3 rounded-lg border-4 border-blue-700 shadow-lg"
          />
          <div className="md:flex-1 space-y-4">
            <h1 className="text-4xl font-bold text-blue-400">{movie.Title}</h1>
            <p className="text-sm text-gray-400">
              {movie.Year} | {movie.Genre} | {movie.Runtime}
            </p>
            <p className="text-base text-gray-200">{movie.Plot}</p>
            <div className="space-y-1">
              <p><strong>🎬 Director:</strong> {movie.Director}</p>
              <p><strong>🎭 Actors:</strong> {movie.Actors}</p>
              <p><strong>🌍 Language:</strong> {movie.Language}</p>
              <p><strong>⭐ IMDB Rating:</strong> {movie.imdbRating}</p>
              <p><strong>🔞 Rated:</strong> {movie.Rated}</p>
            </div>
            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mt-4">
                <strong>📊 Other Ratings:</strong>
                <ul className="list-disc list-inside text-sm text-gray-300">
                  {movie.Ratings.map((rating) => (
                    <li key={rating.Source}>
                      {rating.Source}: <span className="text-white">{rating.Value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
