import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import {
  DiscoverMoviesURL,
  DiscoverTVURL,
  IMAGE_BASE_URL,
  options,
  PopularMoviesURL,
  TrendingMoviesURL,
  TrendingTVURL,
  IndiaTrendingURL
} from '../Constents';
import MovieCarousel from '../components/MovieCarousel';
import Hero from '../components/Hero';
import MovieCards from '../components/MovieCards';
import SEO from '../components/SEO';

const Home = () => {
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get('type') || 'multi';
  const filterLang = searchParams.get('language') || 'all';
  const filterYear = searchParams.get('year') || '';

  const hasFilters = filterType !== 'multi' || filterLang !== 'all' || filterYear !== '';

  const [isLoading, setIsLoading] = useState(true);

  // Default state
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [indiaTrending, setIndiaTrending] = useState([]);

  // Filtered state
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    if (hasFilters) {
      const fetchFilteredData = async () => {
        try {
          let movieUrl = `${DiscoverMoviesURL}?sort_by=popularity.desc`;
          let tvUrl = `${DiscoverTVURL}?sort_by=popularity.desc`;

          if (filterLang !== 'all') {
            movieUrl += `&with_original_language=${filterLang}`;
            tvUrl += `&with_original_language=${filterLang}`;
          }
          if (filterYear) {
            movieUrl += `&primary_release_year=${filterYear}`;
            tvUrl += `&first_air_date_year=${filterYear}`;
          }

          let results = [];
          if (filterType === 'movie') {
            const res = await axios.get(movieUrl, options);
            results = res.data.results.map(item => ({ ...item, media_type: 'movie' }));
          } else if (filterType === 'tv') {
            const res = await axios.get(tvUrl, options);
            results = res.data.results.map(item => ({ ...item, media_type: 'tv' }));
          } else {
            const [movieRes, tvRes] = await Promise.all([
              axios.get(movieUrl, options),
              axios.get(tvUrl, options)
            ]);
            results = [
              ...movieRes.data.results.map(item => ({ ...item, media_type: 'movie' })),
              ...tvRes.data.results.map(item => ({ ...item, media_type: 'tv' }))
            ].sort((a, b) => b.popularity - a.popularity);
          }

          setFilteredResults(results);
        } catch (error) {
          console.error("Error fetching filtered data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchFilteredData();
    } else {
      const fetchHomeData = async () => {
        try {
          const [popular, trendingM, trendingT, india] = await Promise.all([
            axios.get(PopularMoviesURL, options),
            axios.get(TrendingMoviesURL, options),
            axios.get(TrendingTVURL, options),
            axios.get(IndiaTrendingURL, options)
          ]);

          setPopularMovies(popular.data.results);
          setTrendingMovies(trendingM.data.results.slice(0, 10)); // Top 10
          setTrendingTV(trendingT.data.results);
          setIndiaTrending(india.data.results);
        } catch (error) {
          console.error("Error fetching home data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchHomeData();
    }
  }, [hasFilters, filterType, filterLang, filterYear]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#141414] flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-netflix-red/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-netflix-red rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500 mt-6 font-bold tracking-widest uppercase text-xs">Synchronizing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] min-h-screen text-white selection:bg-netflix-red/30 overflow-x-hidden">
      <SEO
        title="Home"
        description="Discover trending movies, critically acclaimed TV shows, and hidden gems across global cinema on Movie Explorer."
      />

      {!hasFilters ? (
        <>
          {/* Dynamic Hero Section */}
          <Hero />

          {/* Movie Containers Section */}
          <div className="relative z-10 space-y-[-2vh] sm:space-y-[-5vh] md:space-y-[-6vh] pb-10">
            <MovieCarousel title="In The Spotlight" movies={popularMovies} mediaType="movie" />
            <MovieCarousel title="Trending Movies Daily" movies={trendingMovies} mediaType="movie" />
            <MovieCarousel title="Today's Top Picks For You" movies={indiaTrending} mediaType="movie" />
            <MovieCarousel title="Trending Shows on Netflix" movies={trendingTV} mediaType="tv" />
            <MovieCarousel title="Popular Indian Masterpieces" movies={indiaTrending.slice().reverse()} mediaType="movie" />
          </div>
        </>
      ) : (
        <div className="pt-32 px-4 md:px-12 pb-32 min-h-screen">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest">
              Filtered Results
            </h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {filteredResults.map(item => (
                <div key={`${item.media_type}-${item.id}`}>
                  <MovieCards
                    id={item.id}
                    title={item.title || item.name}
                    poster={`${IMAGE_BASE_URL}${item.backdrop_path || item.poster_path}`}
                    releaseDate={item.release_date || item.first_air_date}
                    rating={item.vote_average?.toFixed(1)}
                    mediaType={item.media_type || 'movie'}
                    genreIds={item.genre_ids}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center p-6 bg-white/5 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-300 uppercase tracking-widest mb-2">No Content Found</h3>
              <p className="text-gray-500 text-sm font-medium">Try adjusting your filters or clearing them to explore more.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;