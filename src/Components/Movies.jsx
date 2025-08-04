import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Star,
  Eye,
  Film,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
function Movies({ setTotalResults }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  console.log(query);
  console.log(movies);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(
          query
        )}&apikey=b0eec689`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search || []);
        setTotalResults && setTotalResults(data.totalResults);
      } else {
        setMovies([]);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      setError('Failed to search movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const MovieCard = ({ movie }) => (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-emerald-100">
      <div className="relative overflow-hidden">
        <img
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          src={
            movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/450'
          }
          alt={movie.Title}
          onError={(e) => {
            e.target.src = '/api/placeholder/300/450';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 text-white text-sm">
            <Film className="w-4 h-4" />
            <span className="font-medium">{movie.Type?.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-emerald-900 font-bold text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
            {movie.Title}
          </h3>

          <div className="flex items-center gap-2 text-emerald-700">
            <Calendar className="w-4 h-4" />
            <span className="font-medium text-sm">
              Release Year: {movie.Year}
            </span>
          </div>

          {movie.imdbID && (
            <div className="flex items-center gap-2 text-emerald-600 text-xs">
              <span className="font-mono bg-emerald-50 px-2 py-1 rounded">
                ID: {movie.imdbID}
              </span>
            </div>
          )}
        </div>

        <Link
        to={`/movies/${movie.imdbID}`}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          onClick={() => {
            console.log('View details for:', movie.Title);
          }}
        >
          <Eye className="w-4 h-4" />
          View Details
        </Link>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <Film className="w-12 h-12 text-emerald-600" />
      </div>
      <h3 className="text-2xl font-bold text-emerald-900 mb-2">
        {hasSearched ? 'No Movies Found' : 'Discover Amazing Movies'}
      </h3>
      <p className="text-emerald-600 text-lg max-w-md">
        {hasSearched
          ? `We couldn't find any movies matching "${query}". Try a different search term.`
          : 'Search for your favorite movies, TV shows, and series to get started.'}
      </p>
      {hasSearched && (
        <button
          onClick={() => {
            setQuery('');
            setMovies([]);
            setHasSearched(false);
            setError('');
          }}
          className="mt-4 px-6 py-2 bg-emerald-200 hover:bg-emerald-300 text-emerald-900 rounded-lg font-medium transition-colors"
        >
          Clear Search
        </button>
      )}
    </div>
  );

  const ErrorState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>
      <h3 className="text-2xl font-bold text-red-900 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-red-600 text-lg max-w-md mb-4">{error}</p>
      <button
        onClick={() => handleSubmit({ preventDefault: () => {} })}
        className="px-6 py-2 bg-red-200 hover:bg-red-300 text-red-900 rounded-lg font-medium transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const LoadingState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
      <h3 className="text-xl font-semibold text-emerald-900 mb-2">
        Searching Movies...
      </h3>
      <p className="text-emerald-600">
        Please wait while we find the best results for you.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="bg-white border-b border-emerald-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-emerald-900 mb-2 flex items-center justify-center gap-3">
              <Film className="w-10 h-10 text-emerald-600" />
              Movie Explorer
            </h1>
            <p className="text-emerald-600 text-lg">
              Discover your next favorite movie or TV show
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                <input
                  className="w-full pl-12 pr-4 py-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all duration-200 placeholder:text-emerald-400 font-medium text-emerald-900"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for movies, TV shows, series..."
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-emerald-300 disabled:to-emerald-300 text-white font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {movies.length > 0 && query.length > 0 && !isLoading && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-emerald-900 mb-2">
              Search Results for "{query}"
            </h2>
            <p className="text-emerald-600">
              Found {movies.length} movies and shows
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}

export default Movies;