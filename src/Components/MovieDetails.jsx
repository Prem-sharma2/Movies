import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Users,
  Award,
  Globe,
  Play,
  Heart,
  Share2,
  Download,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState({});
function MovieDetails({ onBack }) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const { movieId } = useParams();
  console.log(movieId);

  const fetchMovieDetails = async () => {
    if (!movieId) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movieId}&apikey=b0eec689`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovie(data);
      } else {
        setError(data.Error || 'Movie not found');
      }
    } catch (err) {
      setError('Failed to load movie details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${movieId}&apikey=b0eec689`)
      .then((data) => {
        console.log(data);
        setMovieDetails(data.data);
      });
  }, []);

  return <div>{movieDetails.Director}</div>;
    fetchMovieDetails();
  } [movieId];

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return 'text-green-600 bg-green-100';
    if (numRating >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatRuntime = (runtime) => {
    if (!runtime || runtime === 'N/A') return 'Unknown';
    const minutes = parseInt(runtime);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Loading Movie Details...
          </h3>
          <p className="text-gray-400">
            Please wait while we fetch the information.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ExternalLink className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Something went wrong
          </h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={fetchMovieDetails}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src={
              movie.Poster !== 'N/A'
                ? movie.Poster
                : 'https://via.placeholder.com/1920x1080?text=No+Image'
            }
            alt={movie.Title}
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-8 px-4 py-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Search
          </button>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <div className="relative group">
                <img
                  src={
                    movie.Poster !== 'N/A'
                      ? movie.Poster
                      : 'https://via.placeholder.com/400x600?text=No+Image'
                  }
                  alt={movie.Title}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center shadow-xl">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                  {movie.Title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <span className="text-lg">{movie.Year}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span className="text-lg">
                      {formatRuntime(movie.Runtime)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <span className="text-lg">{movie.Country}</span>
                  </div>

                  <span className="px-3 py-1 bg-emerald-600 rounded-full text-sm font-medium">
                    {movie.Rated}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.Genre &&
                    movie.Genre.split(', ').map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-colors cursor-default"
                      >
                        {genre}
                      </span>
                    ))}
                </div>

                {movie.Ratings && movie.Ratings.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-6">
                    {movie.Ratings.map((rating, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="font-semibold">{rating.Value}</span>
                        <span className="text-gray-400 text-sm">
                          ({rating.Source})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Plot</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.Plot !== 'N/A'
                    ? movie.Plot
                    : 'No plot summary available.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold transition-colors">
                  <Play className="w-5 h-5" />
                  Watch Trailer
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isFavorite
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
                  />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>

                <button className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-400" />
                Cast & Crew
              </h3>
              <div className="space-y-4">
                {movie.Director && movie.Director !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-emerald-400 mb-1">
                      Director
                    </h4>
                    <p className="text-gray-300">{movie.Director}</p>
                  </div>
                )}

                {movie.Writer && movie.Writer !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-emerald-400 mb-1">
                      Writer
                    </h4>
                    <p className="text-gray-300">{movie.Writer}</p>
                  </div>
                )}

                {movie.Actors && movie.Actors !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-emerald-400 mb-1">
                      Actors
                    </h4>
                    <p className="text-gray-300">{movie.Actors}</p>
                  </div>
                )}
              </div>
            </div>

            {movie.Awards && movie.Awards !== 'N/A' && (
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-emerald-400" />
                  Awards & Recognition
                </h3>
                <p className="text-gray-300">{movie.Awards}</p>
              </div>
            )}
          </div>

          {/* Technical Details */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Technical Details</h3>
            <div className="space-y-4">
              {[
                { label: 'Release Date', value: movie.Released },
                { label: 'Language', value: movie.Language },
                { label: 'Production', value: movie.Production },
                { label: 'Box Office', value: movie.BoxOffice },
                { label: 'DVD Release', value: movie.DVD },
                { label: 'Website', value: movie.Website },
              ].map(
                (item, index) =>
                  item.value &&
                  item.value !== 'N/A' && (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-700"
                    >
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-medium">
                        {item.value}
                      </span>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;