import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';
import { fetchMovies } from '../api/omdbApi';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load sample movies once on page load
  useEffect(() => {
    loadMovies('Avengers', '', 1);
  }, []);

  // Fetch movies when user searches or changes page
  useEffect(() => {
    if (searchTerm) {
      loadMovies(searchTerm, type, currentPage);
    }
  }, [searchTerm, type, currentPage]);

  const handleSearch = (term, selectedType) => {
    setSearchTerm(term);
    setType(selectedType);
    setCurrentPage(1); // reset page on new search
  };

  const loadMovies = async (term, selectedType, page) => {
    setLoading(true);
    try {
      const data = await fetchMovies(term, selectedType, page);
      setMovies(data.Search || []);
      setTotalResults(parseInt(data.totalResults, 10) || 0);
      setError(null);
    } catch (err) {
      setError('No movies found.');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-lime-200 text-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-rose-600 drop-shadow">
          🎥 YOUR FAVOURITE MOVIES IN ONE PLACE.....
        </h1>

        <div className="bg-white shadow-lg border border-orange-200 rounded-lg p-6 mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && <ErrorMessage message={error} />}
        {loading && <p className="text-center text-xl mt-8">🍿 Loading movies...</p>}
        {!error && !loading && movies.length === 0 && searchTerm && (
          <ErrorMessage message="No movies found." />
        )}

        <MovieList movies={movies} />

        {/* Show pagination ONLY after a search is performed */}
        {searchTerm.trim() !== '' && totalResults > 10 && (
          <Pagination
            totalResults={totalResults}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
