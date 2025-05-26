const API_KEY = '9ed5beb0'; 
const BASE_URL = 'https://www.omdbapi.com/';

export async function fetchMovies(searchTerm, type = '', page = 1) {
  const url = new URL(BASE_URL);
  url.searchParams.append('apikey', API_KEY);
  url.searchParams.append('s', searchTerm);
  if (type) url.searchParams.append('type', type); // movie, series, episode
  url.searchParams.append('page', page);

  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Failed to fetch movies');
  }
  return data; // contains Search (array) and totalResults (string)
}

export async function fetchMovieDetails(imdbID) {
  const url = new URL(BASE_URL);
  url.searchParams.append('apikey', API_KEY);
  url.searchParams.append('i', imdbID);
  url.searchParams.append('plot', 'full');

  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Failed to fetch movie details');
  }
  return data;
}
