import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, IMAGE_BASE_URL, options } from '../Constents';
import LazyImage from '../components/LazyImage';
import SEO from '../components/SEO';

const MovieDetails = ({ type = 'movie' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const [detailsRes, creditsRes] = await Promise.all([
          axios.get(`${BASE_URL}/${type}/${id}`, options),
          axios.get(`${BASE_URL}/${type}/${id}/credits`, options)
        ]);
        setData(detailsRes.data);
        setCast(creditsRes.data.cast.slice(0, 10));
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [id, type]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#000] flex items-center justify-center z-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-netflix-red/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-netflix-red rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!data) return <div className="text-center py-20 text-gray-500">Content not found.</div>;

  const backgroundImage = `${IMAGE_BASE_URL.replace('w500', 'original')}${data.backdrop_path}`;

  return (
    <div className="min-h-screen bg-[#141414] text-white pb-32 animate-fadeIn relative selection:bg-netflix-red/30">
      <SEO
        title={data.title || data.name}
        description={data.overview}
      />

      {/* Cinematic Header Section */}
      <div className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden bg-[#222]">
        <div className="absolute inset-0">
          <LazyImage
            src={backgroundImage}
            alt={data.title || data.name}
            className="w-full h-full"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="absolute top-24 left-4 md:left-12 z-20">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go Back"
            className="flex items-center gap-2 p-2 rounded-full bg-black/50 border border-white/10 hover:bg-black/70 transition-all font-bold text-sm tracking-wide active:scale-95 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
        </div>
      </div>

      {/* Narrative Section - Positioning content like Netflix Detail Card */}
      <div className="container mx-auto px-4 md:px-12 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 -mt-16 md:-mt-32">
            <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-4 uppercase drop-shadow-2xl">
              {data.title || data.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-200 font-bold text-sm">
              <span className="text-green-500 font-black">{Math.round(data.vote_average * 10)}% Match</span>
              <span className="text-gray-400">{data.release_date ? data.release_date.split('-')[0] : data.first_air_date?.split('-')[0]}</span>
              <span className="border border-gray-500 px-1 rounded-sm text-xs font-medium">U/A 16+</span>
              <span className="text-gray-400">{data.runtime ? `${data.runtime}m` : `${data.number_of_seasons} Seasons`}</span>
              <span className="border border-gray-500 px-1 rounded-sm text-[8px] font-black uppercase">HD</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-8">
              {data.genres?.map(genre => (
                <span key={genre.id} className="text-xs font-bold text-gray-300">
                  {genre.name} <span className="mx-1.5 opacity-50">•</span>
                </span>
              ))}
            </div>

            <div className="bg-[#242424]/50 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/5 mb-12 shadow-inner">
              <h2 className="text-lg md:text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-netflix-red rounded-full"></span>
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-lg max-w-4xl font-medium tracking-wide">
                {data.overview}
              </p>

              {/* Full Release Date */}
              {(data.release_date || data.first_air_date) && (
                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Release Date</p>
                  <p className="text-base md:text-lg font-bold text-white">
                    {new Date(data.release_date || data.first_air_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Cast Section */}
            <div className="mb-10">
              <h2 className="text-lg md:text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest px-1">
                Cast
              </h2>
              <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                {cast.map(member => (
                  <div key={member.id} className="flex-shrink-0 w-32 group text-center">
                    <div className="relative aspect-square mb-3 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-netflix-red transition-all duration-500 bg-[#333] mx-auto">
                      <LazyImage
                        src={member.profile_path ? `${IMAGE_BASE_URL}${member.profile_path}` : 'https://via.placeholder.com/200?text=No+Photo'}
                        alt={member.name}
                        className="w-full h-full absolute inset-0"
                        imgClassName="filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <p className="text-[11px] font-bold text-white leading-tight mb-0.5">{member.name}</p>
                    <p className="text-[9px] font-medium text-gray-500 italic">{member.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metadata Sidebar (Right Side) */}
          <div className="w-full lg:w-80 flex-shrink-0 lg:mt-[-16vh]">
            <div className="p-6 bg-[#181818] rounded-xl border border-white/5 shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#777] mb-6">Master Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Status</label>
                  <p className="text-sm font-bold text-white">{data.status}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Vote Average</label>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-netflix-red"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    {data.vote_average?.toFixed(1)} / 10
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Language</label>
                  <p className="text-sm font-bold text-white uppercase">{data.original_language}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Production</label>
                  <p className="text-xs font-bold text-white line-clamp-2">{data.production_companies?.[0]?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
