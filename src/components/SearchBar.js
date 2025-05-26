import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    onSearch(term.trim(), type);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8"
    >
      <input
        type="text"
        className="p-3 rounded w-full md:w-96 text-black"
        placeholder="Search movies..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        aria-label="Search movies"
      />
      <select
        className="p-3 rounded w-full md:w-48 text-black"
        value={type}
        onChange={(e) => setType(e.target.value)}
        aria-label="Filter by type"
      >
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
      >
        Search
      </button>
    </form>
  );
}
