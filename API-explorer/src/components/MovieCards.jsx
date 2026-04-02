import React from 'react'
import { Link } from 'react-router-dom'
import LazyImage from './LazyImage'
import { IMAGE_BASE_URL } from '../Constents'

export const GENRES_MAP = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
    10759: 'Action & Adv', 10762: 'Kids', 10763: 'News',
    10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap',
    10767: 'Talk', 10768: 'War & Politics'
};

const MovieCards = ({ title, poster, releaseDate, rating, id, mediaType = 'movie', genreIds = [] }) => {
    // Determine genres to display
    const genres = genreIds
        ? genreIds.map(gid => GENRES_MAP[gid]).filter(Boolean).slice(0, 2).join(' • ')
        : '';

    return (
        <Link
            to={mediaType === 'tv' ? `/tv/${id}` : `/movie/${id}`}
            className="group relative block aspect-video rounded-md overflow-hidden bg-[#242424] border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:z-10"
        >
            {/* Backdrop Image */}
            <LazyImage
                src={poster}
                alt={title}
                className="w-full h-full absolute inset-0"
                imgClassName="transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dynamic Overlay Gradient - strictly constrained to the hovered card */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 pointer-events-none">
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-white line-clamp-1 mb-1 shadow-black drop-shadow-md">
                    {title}
                </h3>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold text-gray-300">
                    <span className="text-white">{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</span>
                    {rating > 0 && (
                        <span className="text-green-400 bg-green-500/10 px-1 rounded shadow-sm border border-green-500/20">
                            ⭐ {rating}
                        </span>
                    )}
                    {genres && <span className="text-gray-400 line-clamp-1">{genres}</span>}
                </div>
            </div>
        </Link>
    )
}

export default React.memo(MovieCards)
