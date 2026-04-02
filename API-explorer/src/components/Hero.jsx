import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { DiscoverMoviesURL, IMAGE_BASE_URL, options } from '../Constents';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const Hero = () => {
    const [movies, setMovies] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await axios.get(`${DiscoverMoviesURL}?with_original_language=hi&sort_by=popularity.desc`, options);
                if (response.data.results.length > 0) {
                    setMovies(response.data.results.slice(0, 5));
                }
            } catch (error) {
                console.error("Error fetching hero data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    const startAutoPlay = useCallback(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % movies.length);
        }, 5000);
    }, [movies.length]);

    useEffect(() => {
        if (movies.length > 0) {
            startAutoPlay();
        }
        return () => clearInterval(intervalRef.current);
    }, [movies.length, startAutoPlay]);

    const goToSlide = (index) => {
        setActiveIndex(index);
        startAutoPlay();
    };

    if (isLoading || movies.length === 0) return null;

    const movie = movies[activeIndex];
    const backdrop = `${IMAGE_BASE_URL.replace('w500', 'original')}${movie.backdrop_path}`;

    return (
        <section className="relative h-[100vh] w-full overflow-hidden mb-[-10vh]">
            {/* Background Slides */}
            {movies.map((m, i) => {
                const bg = `${IMAGE_BASE_URL.replace('w500', 'original')}${m.backdrop_path}`;
                return (
                    <div
                        key={m.id}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{ opacity: i === activeIndex ? 1 : 0, zIndex: i === activeIndex ? 1 : 0 }}
                    >
                        {i === 0 ? (
                            <img
                                src={bg}
                                alt={m.title}
                                fetchpriority="high"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <LazyImage
                                src={bg}
                                alt={m.title}
                                className="w-full h-full"
                            />
                        )}
                    </div>
                );
            })}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20 z-[2]" />

            {/* Hero Content Section */}
            <div className="container mx-auto px-4 md:px-12 relative z-10 h-full flex items-center">
                <div className="max-w-2xl animate-fadeIn" key={movie.id}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-netflix-red p-0.5 rounded-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M5.4 3h2.1l7.1 11.2V3h2v18h-2.1L7.4 9.8V21h-2V3z" /></svg>
                        </div>
                        <span className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Series</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-6 uppercase text-shadow-lg leading-[0.9] transition-all duration-500">
                        {movie.title}
                    </h1>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-netflix-red text-white text-[10px] font-black uppercase tracking-tight">
                            TOP 10
                        </span>
                        <span className="text-white font-bold text-lg">#1 in Movies Today</span>
                    </div>

                    <p className="text-lg md:text-xl text-white font-medium drop-shadow-md mb-8 line-clamp-3 leading-relaxed max-w-xl transition-all duration-500">
                        {movie.overview}
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            to={`/movie/${movie.id}`}
                            className="flex items-center gap-2 px-8 py-3 bg-gray-500/50 text-white rounded-md font-bold text-lg hover:bg-gray-500/70 backdrop-blur-md transition-colors active:scale-95 cursor-pointer"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                            More Info
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {movies.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`rounded-full transition-all duration-500 cursor-pointer border-0 outline-none ${i === activeIndex
                            ? 'w-8 h-3 bg-netflix-red shadow-lg shadow-netflix-red/40'
                            : 'w-3 h-3 bg-white/30 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Age Rating Indicator (Right Side) */}
            <div className="absolute right-0 bottom-[15vh] bg-gray-500/30 border-l-4 border-gray-400 pl-4 pr-12 py-2 backdrop-blur-md z-10">
                <span className="text-white text-lg font-medium">U/A 13+</span>
            </div>
        </section>
    );
};

export default Hero;
