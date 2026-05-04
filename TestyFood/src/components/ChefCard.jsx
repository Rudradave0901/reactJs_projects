import React from 'react';
import { Link } from 'react-router-dom';

const ChefCard = ({ name, title, image, link = "/chefdetail" }) => {
    return (
        <div className="our-chef-box-wrap flex flex-col items-center text-center mb-10 md:mb-[50px] h-full md:h-[calc(100%-50px)]">
            <img src={image} alt={`Chef ${name}`} className="w-full max-w-[270px] h-auto object-cover mb-[10px]" width="270" height="325" />
            <h2 className="mt-4 mb-0">
                <Link to={link} className="chef-title block font-['Carter_One',cursive] text-[24px] md:text-[28px] font-normal leading-[1.17] text-[#131313] mb-0 hover:text-[#E60000] focus:text-[#E60000] transition-colors">
                    {name}
                </Link>
            </h2>
            <p className="content-pera text-[14px] md:text-[16px] text-[#7D7D7D] mb-0 mt-1">{title}</p>
        </div>
    );
};

export default ChefCard;
