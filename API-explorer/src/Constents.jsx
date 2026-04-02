export const API_KEY = import.meta.env.VITE_TMDB_API_KEY
export const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL
export const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
export const ACCOUNT_URL = import.meta.env.VITE_TMDB_ACCOUNT_URL


export const options = { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }

export const PopularMoviesURL = `${BASE_URL}/movie/popular`
export const DiscoverMoviesURL = `${BASE_URL}/discover/movie`
export const DiscoverTVURL = `${BASE_URL}/discover/tv`
export const SearchMovieURL = `${BASE_URL}/search/movie`
export const SearchTVURL = `${BASE_URL}/search/tv`
export const SearchMultiURL = `${BASE_URL}/search/multi`
export const UpcomingMoviesURL = `${BASE_URL}/movie/upcoming`
export const RatedMoviesURL = `${BASE_URL}/movie/top_rated`
export const TrendingMoviesURL = `${BASE_URL}/trending/movie/day`
export const TrendingTVURL = `${BASE_URL}/trending/tv/day`
export const IndiaTrendingURL = `${BASE_URL}/discover/movie?region=IN&sort_by=popularity.desc`
export const MoviesDetailURL = `${BASE_URL}/movie/`

// Images and Logos

export const BrandLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 0 700 140" width="200" height="40"> <defs > <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1"> <stop offset="0%" stopColor="#ff4a4a" /> <stop offset="25%" stopColor="#e50914" /> <stop offset="50%" stopColor="#b8000a" /> <stop offset="52%" stopColor="#8b0000" /> <stop offset="100%" stopColor="#d40000" /> </linearGradient > <linearGradient id="playGrad" x1="0" y1="0" x2="1" y2="1"> <stop offset="0%" stopColor="#ffffff" /> <stop offset="40%" stopColor="#ff1e27" /> <stop offset="100%" stopColor="#8b0000" /> </linearGradient > <linearGradient id="flareGrad" x1="0%" y1="0%" x2="100%" y2="0%"> <stop offset="0%" stopColor="#ff0000" stopOpacity="0" /> <stop offset="35%" stopColor="#ff1e27" stopOpacity="0.6" /> <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" /> <stop offset="65%" stopColor="#ff1e27" stopOpacity="0.6" /> <stop offset="100%" stopColor="#ff0000" stopOpacity="0" /> </linearGradient > </defs > <g fill="#2a0000" transform="translate(0, 3)"> <path d="
M 50 20 H 24 A 24 24 0 0 0 0 44 V 76 A 24 24 0 0 0 24 100 H 50 V 84 H 24 A 8 8 0 0 1 16 76 V 44 A 8 8 0 0 1 24 36 H 50 Z M 62 20 H 78 V 100 H 62 Z M 90 20 H 106 L 126 65 V 20 H 142 V 100 H 126 L 106 55 V 100 H 90 Z M 154 20 H 202 V 36 H 170 V 52 H 196 V 68 H 170 V 84 H 202 V 100 H 154 Z M 214 20 H 234 L 246 55 L 258 20 H 278 V 100 H 262 V 50 L 251 80 H 241 L 230 50 V 100 H 214 Z M 306 20 H 326 L 344 100 H 326 L 316 50 L 306 100 H 288 Z M 352 20 H 380 A 24 24 0 0 1 404 44 A 24 24 0 0 1 380 68 H 368 V 100 H 352 Z M 368 36 V 52 H 380 A 8 8 0 0 0 388 44 A 8 8 0 0 0 380 36 Z M 412 20 H 428 V 76 A 9 9 0 0 0 446 76 V 20 H 462 V 76 A 25 25 0 0 1 412 76 Z M 474 20 H 490 V 84 H 514 V 100 H 474 Z M 584 44 A 24 24 0 0 0 560 20 H 548 A 24 24 0 0 0 524 44 V 46 A 24 24 0 0 0 546 69 L 562 71 A 7 7 0 0 1 568 78 V 80 A 8 8 0 0 1 560 88 H 548 A 8 8 0 0 1 540 80 H 524 A 24 24 0 0 0 548 100 H 560 A 24 24 0 0 0 584 76 V 74 A 24 24 0 0 0 562 51 L 546 49 A 7 7 0 0 1 540 42 V 40 A 8 8 0 0 1 548 32 H 560 A 8 8 0 0 1 568 40 H 584 Z M 596 20 H 644 V 36 H 612 V 52 H 638 V 68 H 612 V 84 H 644 V 100 H 596 Z "/>
    </g > <g fill="url(#redGrad)"> <path d="
M 50 20 H 24 A 24 24 0 0 0 0 44 V 76 A 24 24 0 0 0 24 100 H 50 V 84 H 24 A 8 8 0 0 1 16 76 V 44 A 8 8 0 0 1 24 36 H 50 Z M 62 20 H 78 V 100 H 62 Z M 90 20 H 106 L 126 65 V 20 H 142 V 100 H 126 L 106 55 V 100 H 90 Z M 154 20 H 202 V 36 H 170 V 52 H 196 V 68 H 170 V 84 H 202 V 100 H 154 Z M 214 20 H 234 L 246 55 L 258 20 H 278 V 100 H 262 V 50 L 251 80 H 241 L 230 50 V 100 H 214 Z M 306 20 H 326 L 344 100 H 326 L 316 50 L 306 100 H 288 Z M 352 20 H 380 A 24 24 0 0 1 404 44 A 24 24 0 0 1 380 68 H 368 V 100 H 352 Z M 368 36 V 52 H 380 A 8 8 0 0 0 388 44 A 8 8 0 0 0 380 36 Z M 412 20 H 428 V 76 A 9 9 0 0 0 446 76 V 20 H 462 V 76 A 25 25 0 0 1 412 76 Z M 474 20 H 490 V 84 H 514 V 100 H 474 Z M 584 44 A 24 24 0 0 0 560 20 H 548 A 24 24 0 0 0 524 44 V 46 A 24 24 0 0 0 546 69 L 562 71 A 7 7 0 0 1 568 78 V 80 A 8 8 0 0 1 560 88 H 548 A 8 8 0 0 1 540 80 H 524 A 24 24 0 0 0 548 100 H 560 A 24 24 0 0 0 584 76 V 74 A 24 24 0 0 0 562 51 L 546 49 A 7 7 0 0 1 540 42 V 40 A 8 8 0 0 1 548 32 H 560 A 8 8 0 0 1 568 40 H 584 Z M 596 20 H 644 V 36 H 612 V 52 H 638 V 68 H 612 V 84 H 644 V 100 H 596 Z "/>
        </g > <ellipse cx="322" cy="70" rx="350" ry="1.5" fill="url(#flareGrad)" opacity="0.85" /> <path d="M 314 60 L 324 70 L 310 80 Z" fill="url(#playGrad)" /> </svg >
)