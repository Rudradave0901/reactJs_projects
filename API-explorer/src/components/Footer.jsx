import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-netflix-black py-8 px-4 md:px-12 border-t border-white/5">
            <div className="container mx-auto max-w-7xl flex items-center justify-center">
                <p className="text-gray-500 text-sm font-medium tracking-wide">
                    Created by <span className="text-gray-300 font-bold">Rudra</span>
                    <span className="mx-2 text-gray-700">•</span>
                    <span className="text-[11px] text-gray-600 uppercase tracking-widest">Powered by TMDB</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer
