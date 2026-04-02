import React, { useEffect } from 'react';

const SEO = ({ title, description }) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} | Movie Explorer`;
        } else {
            document.title = 'Movie Explorer | Discover Movies Worldwide';
        }

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }

        if (description) {
            metaDescription.content = description;
        } else {
            metaDescription.content = 'Explore thousands of movies from Hollywood, Bollywood, and regional cinemas. Find your favorite movies with advanced search and filters.';
        }
    }, [title, description]);

    return null;
};

export default SEO;
