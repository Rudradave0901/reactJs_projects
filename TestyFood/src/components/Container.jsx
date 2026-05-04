import React from 'react';

const Container = ({ children, className = "" }) => {
    return (
        <div className={`w-full mx-auto px-4 min-[1200px]:max-w-[1194px] ${className}`}>
            {children}
        </div>
    );
};

export default Container;
