import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BrandLogo, SearchMultiURL, SearchMovieURL, SearchTVURL, IMAGE_BASE_URL, options } from '../Constents';
import axios from 'axios';
import LazyImage from './LazyImage';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        type: searchParams.get('type') || 'multi',
        language: searchParams.get('language') || 'all',
        year: searchParams.get('year') || ''
    });

    useEffect(() => {
        setFilters({
            type: searchParams.get('type') || 'multi',
            language: searchParams.get('language') || 'all',
            year: searchParams.get('year') || ''
        });
    }, [searchParams]);
    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const filterRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close search and filter on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                setSearchOpen(false);
                setSearchResults([]);
            }
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input on open
    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    // Debounced search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setIsSearching(true);
            try {
                let url;
                if (filters.type === 'movie') {
                    url = SearchMovieURL;
                } else if (filters.type === 'tv') {
                    url = SearchTVURL;
                } else {
                    url = SearchMultiURL;
                }

                let params = `?query=${encodeURIComponent(searchQuery.trim())}`;
                if (filters.language !== 'all') {
                    params += `&language=${filters.language}`;
                }
                if (filters.year) {
                    params += `&year=${filters.year}`;
                }

                const response = await axios.get(`${url}${params}`, options);
                let results = response.data.results || [];

                // Client-side language filter for more accuracy
                if (filters.language !== 'all') {
                    results = results.filter(item => item.original_language === filters.language);
                }

                setSearchResults(results.slice(0, 8));
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsSearching(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [searchQuery, filters.type, filters.language, filters.year]);

    const handleResultClick = (item) => {
        const type = item.media_type || filters.type;
        const route = type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`;
        navigate(route);
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setSearchParams(new URLSearchParams());
        setFilterOpen(false);
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (filters.type !== 'multi') params.set('type', filters.type);
        if (filters.language !== 'all') params.set('language', filters.language);
        if (filters.year) params.set('year', filters.year);
        setSearchParams(params);
        setFilterOpen(false);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    return (
        <header className={`fixed top-0 z-[100] w-full transition-colors duration-500 ${isScrolled ? 'bg-netflix-black shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
            <nav className="mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link to="/" className="flex items-center transition-all active:scale-95">
                        <BrandLogo />
                    </Link>

                    <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-200">
                        <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-white">
                    {/* Filter Dropdown */}
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            aria-label="Toggle Filters"
                            className={`p-2 rounded-lg transition-all cursor-pointer ${filterOpen ? 'bg-white/15 text-netflix-red' : 'hover:text-gray-300'}`}
                            title="Filters"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" />
                                <line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" />
                                <line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" />
                                <line x1="1" x2="7" y1="14" y2="14" /><line x1="9" x2="15" y1="8" y2="8" />
                                <line x1="17" x2="23" y1="16" y2="16" />
                            </svg>
                        </button>

                        {filterOpen && (
                            <div className="absolute right-0 top-full mt-3 w-72 bg-[#1a1a1a]/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-black/60 p-5 animate-fadeIn">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">Filters</h2>
                                    <button
                                        onClick={clearFilters}
                                        className="text-[10px] font-bold uppercase tracking-wider text-netflix-red hover:text-red-400 cursor-pointer transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>

                                {/* Type Filter */}
                                <div className="mb-4">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Content Type</label>
                                    <select
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-netflix-red/50 transition-colors"
                                        value={filters.type}
                                        onChange={(e) => handleFilterChange('type', e.target.value)}
                                    >
                                        <option value="multi" className="bg-[#1a1a1a]">Everything</option>
                                        <option value="movie" className="bg-[#1a1a1a]">Movies</option>
                                        <option value="tv" className="bg-[#1a1a1a]">TV Shows</option>
                                    </select>
                                </div>

                                {/* Language Filter */}
                                <div className="mb-4">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Language</label>
                                    <select
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-netflix-red/50 transition-colors"
                                        value={filters.language}
                                        onChange={(e) => handleFilterChange('language', e.target.value)}
                                    >
                                        <option value="all" className="bg-[#1a1a1a]">All Languages</option>
                                        <option value="en" className="bg-[#1a1a1a]">English</option>
                                        <option value="hi" className="bg-[#1a1a1a]">Hindi</option>
                                        <option value="te" className="bg-[#1a1a1a]">Telugu</option>
                                        <option value="ta" className="bg-[#1a1a1a]">Tamil</option>
                                        <option value="ko" className="bg-[#1a1a1a]">Korean</option>
                                        <option value="ja" className="bg-[#1a1a1a]">Japanese</option>
                                    </select>
                                </div>

                                {/* Year Filter */}
                                <div className="mb-6">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Year</label>
                                    <select
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-netflix-red/50 transition-colors"
                                        value={filters.year}
                                        onChange={(e) => handleFilterChange('year', e.target.value)}
                                    >
                                        <option value="" className="bg-[#1a1a1a]">Any Year</option>
                                        {years.map(y => (
                                            <option key={y} value={y} className="bg-[#1a1a1a]">{y}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={applyFilters}
                                    className="w-full px-4 py-3 bg-netflix-red text-white text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors active:scale-95 cursor-pointer border-0 shadow-lg shadow-netflix-red/30"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Search */}
                    <div className="relative" ref={searchContainerRef}>
                        <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'bg-black/80 border border-white/20 rounded-lg backdrop-blur-md' : ''}`}>
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                aria-label="Toggle Search"
                                className="p-2 hover:text-gray-300 transition-colors cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </button>

                            {searchOpen && (
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    aria-label="Search movies and shows"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search movies, shows..."
                                    className="bg-transparent text-white text-sm w-48 md:w-64 py-2 pr-4 focus:outline-none placeholder-gray-500"
                                />
                            )}
                        </div>

                        {/* Search Results Dropdown */}
                        {searchOpen && searchQuery.trim() && (
                            <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-[#1a1a1a]/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden animate-fadeIn max-h-[65vh] overflow-y-auto no-scrollbar">
                                {isSearching ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="w-6 h-6 border-2 border-netflix-red/30 border-t-netflix-red rounded-full animate-spin"></div>
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="py-2">
                                        {searchResults.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleResultClick(item)}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer text-left"
                                            >
                                                <div className="w-12 h-16 flex-shrink-0 bg-[#333] rounded-md overflow-hidden relative">
                                                    {item.poster_path ? (
                                                        <LazyImage
                                                            src={`${IMAGE_BASE_URL}${item.poster_path}`}
                                                            alt={item.title || item.name}
                                                            className="w-full h-full absolute inset-0"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-[8px]">N/A</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-white truncate">{item.title || item.name}</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase">{item.media_type || filters.type}</span>
                                                        <span className="text-[10px] text-gray-600">•</span>
                                                        <span className="text-[10px] text-gray-400">
                                                            {(item.release_date || item.first_air_date || '').split('-')[0] || 'N/A'}
                                                        </span>
                                                        {item.vote_average > 0 && (
                                                            <>
                                                                <span className="text-[10px] text-gray-600">•</span>
                                                                <span className="text-[10px] text-green-500 font-bold">{Math.round(item.vote_average * 10)}%</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500 text-sm">
                                        No results found for "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
