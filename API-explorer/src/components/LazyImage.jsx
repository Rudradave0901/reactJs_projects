import React, { useState } from 'react';

const LazyImage = ({ src, alt, className = '', imgClassName = '' }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    if (!src || error) {
        return (
            <div className={`flex items-center justify-center bg-[#222] text-gray-500 text-[10px] sm:text-xs overflow-hidden ${className}`}>
                <span className="truncate px-2">{alt || 'No Image'}</span>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden bg-[#222] ${className}`}>
            {/* Shimmer Placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 w-full h-full animate-pulse bg-white/5"></div>
            )}

            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setError(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
            />
        </div>
    );
};

export default LazyImage;
