import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="bg-purple-200 rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      aria-label={`View details for ${movie.Title}`}
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
        alt={`${movie.Title} poster`}
        className="w-full h-72 object-cover"
      />
      <div className="p-2">
        <h3 className="font-semibold text-lg truncate">{movie.Title}</h3>
        <p className="text-sm text-blue-800">{movie.Year}</p>
        <p className="text-xs text-blue-800 capitalize">{movie.Type}</p>
      </div>
    </Link>
  );
}
