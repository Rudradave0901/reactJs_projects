import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import MovieCards from './MovieCards';
import { IMAGE_BASE_URL } from '../Constents';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MovieCarousel = ({ movies, title, mediaType = 'movie' }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    if (!movies || movies.length === 0) return null;

    return (
        <div className="mb-12 md:mb-16 relative group/carousel px-4 md:px-12">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
                <h2 className="text-md md:text-2xl font-black md:font-bold text-white tracking-widest md:tracking-normal uppercase md:capitalize selection:bg-netflix-red/30 cursor-default">
                    {title}
                </h2>
                <div className="flex-1 h-px bg-white/10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500"></div>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={2}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                onSlideChange={(swiper) => {
                    setIsPrevDisabled(swiper.isBeginning);
                    setIsNextDisabled(swiper.isEnd);
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 10 },
                    768: { slidesPerView: 4, spaceBetween: 10 },
                    1024: { slidesPerView: 5, spaceBetween: 12 },
                    1440: { slidesPerView: 6, spaceBetween: 16 },
                }}
                className="movie-swiper overflow-visible pb-12"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="h-full">
                            <MovieCards
                                id={movie.id}
                                title={movie.title || movie.name}
                                poster={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                                releaseDate={movie.release_date || movie.first_air_date}
                                rating={movie.vote_average?.toFixed(1)}
                                mediaType={mediaType}
                                genreIds={movie.genre_ids}
                            />
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Compact Navigation Controls */}
                <div className="absolute right-0 bottom-[-40px] z-10 flex items-center gap-3">
                    <button
                        ref={prevRef}
                        disabled={isPrevDisabled}
                        aria-label="Previous Slide"
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isPrevDisabled
                            ? 'bg-white/5 text-white/30 cursor-not-allowed'
                            : 'bg-white/10 text-white hover:bg-white/20 active:scale-95 cursor-pointer'
                            }`}
                    >
                        Prev
                    </button>
                    <button
                        ref={nextRef}
                        disabled={isNextDisabled}
                        aria-label="Next Slide"
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isNextDisabled
                            ? 'bg-white/5 text-white/30 cursor-not-allowed'
                            : 'bg-white/10 text-white hover:bg-white/20 active:scale-95 cursor-pointer'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </Swiper>
        </div>
    );
};

export default React.memo(MovieCarousel);
