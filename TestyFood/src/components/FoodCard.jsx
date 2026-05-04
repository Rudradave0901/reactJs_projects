import React, { useState, useEffect } from 'react';
import { addToCart, isItemInWishlist, toggleWishlistItem, WISHLIST_UPDATED_EVENT } from '../utils/localStorage';

const FoodCard = ({ food, index, onOpenQuickView }) => {
    const [message, setMessage] = useState('');
    const foodId = String(food.id || food.idMeal || food.name || food.title);
    const [isWishlisted, setIsWishlisted] = useState(() => isItemInWishlist(foodId));

    useEffect(() => {
        const syncWishlist = () => setIsWishlisted(isItemInWishlist(foodId));
        window.addEventListener(WISHLIST_UPDATED_EVENT, syncWishlist);
        return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, syncWishlist);
    }, [foodId]);

    const handleAddToCart = () => {
        addToCart(food);
        setMessage('Added to cart');
        setTimeout(() => setMessage(''), 1200);
    };

    const handleWishlistToggle = () => {
        toggleWishlistItem(food);
    };

    return (
        <div className="popular-foods-box-wrap group text-center pt-[30px] pb-[40px] bg-white border border-[#E7E8E8] rounded-[20px] h-[calc(100%-24px)] mb-[24px] transition-all duration-300 ease-in-out hover:shadow-[0px_0px_8px_rgba(0,0,0,0.25)]">
            <div className="foods-box-img-wrap relative">
                <img
                    src={food.image || food.img || food.strMealThumb}
                    width="270"
                    height="200"
                    alt="Popular Foods"
                    className="mx-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                />

                <div className="wishlist-check-box absolute top-0 right-[20px]">
                    <input
                        type="checkbox"
                        id={`wishlist${foodId}`}
                        className="absolute opacity-0 invisible peer"
                        checked={isWishlisted}
                        onChange={handleWishlistToggle}
                    />
                    <label htmlFor={`wishlist${foodId}`} className="cursor-pointer [&>svg>path]:peer-checked:fill-[#FEC223] [&>svg>path]:transition-colors">
                        <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23.9952 1.94496C23.3599 1.32835 22.6056 0.839213 21.7754 0.50549C20.9451 0.171768 20.0553 0 19.1566 0C18.258 0 17.3681 0.171768 16.5379 0.50549C15.7077 0.839213 14.9534 1.32835 14.3181 1.94496L12.9997 3.22404L11.6812 1.94496C10.398 0.700036 8.65749 0.000645287 6.84269 0.0006453C5.0279 0.000645313 3.28743 0.700036 2.00418 1.94496C0.720924 3.18988 1.35213e-08 4.87836 0 6.63895C-1.35213e-08 8.39954 0.720924 10.088 2.00418 11.3329L3.32264 12.612L12.9997 22L22.6767 12.612L23.9952 11.3329C24.6308 10.7166 25.1349 9.98485 25.4789 9.17944C25.8229 8.37403 25.8229 7.51076 26 6.63895C26 5.76714 25.8229 4.90387 25.4789 4.09846C25.1349 3.29305 24.6308 2.56128 23.9952 1.94496Z" fill="#E7E8E8" /> </svg>
                    </label>
                </div>
            </div>

            <div className="foods-box-content-wrap px-[30px] mt-4">
                <ul className="food-box-rating flex items-center justify-center mb-2">
                    <li><img src="/icons/yellow-star.svg" alt="Star" width="18" height="17" /></li>
                    <li><img src="/icons/yellow-star.svg" alt="Star" width="18" height="17" /></li>
                    <li><img src="/icons/yellow-star.svg" alt="Star" width="18" height="17" /></li>
                    <li><img src="/icons/yellow-star.svg" alt="Star" width="18" height="17" /></li>
                    <li><img src="/icons/gray-star.svg" alt="Star" width="18" height="17" /></li>
                </ul>

                <a href="#" className="food-box-title font-['Carter_One',cursive] text-[28px] leading-[1.2] text-[#131313] hover:text-[#E60000] mb-[6px] inline-block transition-colors">
                    {food.title || food.name || food.strMeal}
                </a>

                <div className="content-pera text-[18px] font-light text-[#636363] tracking-[0.2px] mb-[10px]">
                    {food.discount || "Fresh meal loaded from API"}
                </div>

                <span className="food-box-price block text-[20px] font-black leading-[1.2] text-[#E60000] mb-[20px]">
                    {food.price || "$10.90"}
                </span>

                <div className="food-box-btns max-w-[220px] mx-auto flex items-center justify-between">
                    <button 
                        onClick={() => onOpenQuickView && onOpenQuickView(food)}
                        className="cart-btn flex items-center justify-center w-[40px] h-[40px] bg-[#E7E8E8] rounded-full border border-[rgba(0,0,0,0.1)] hover:bg-[#E60000] transition-colors"
                        title="Quick View"
                    >
                        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8C1 8 4.63636 1 11 1C17.3636 1 21 8 21 8C21 8 17.3636 15 11 15C4.63636 15 1 8 1 8Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M11 10.625C12.5062 10.625 13.7273 9.44975 13.7273 8C13.7273 6.55025 12.5062 5.375 11 5.375C9.49375 5.375 8.27271 6.55025 8.27271 8C8.27271 9.44975 9.49375 10.625 11 10.625Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                    <button type="button" onClick={handleAddToCart} className="btn btn-secondary dark flex items-center justify-center gap-[10px] py-[10px] px-[20px] group/btn2 transition-all hover:bg-gray-800">
                        <svg className="z-1" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path className="transition-colors group-hover/btn2:stroke-white" d="M3.66667 1L1 4.6V17.2C1 17.6774 1.1873 18.1352 1.5207 18.4728C1.8541 18.8104 2.30628 19 2.77778 19H15.2222C15.6937 19 16.1459 18.8104 16.4793 18.4728C16.8127 18.1352 17 17.6774 17 17.2V4.6L14.3333 1H3.66667Z" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path className="transition-colors group-hover/btn2:stroke-white" d="M1 4.6001H17" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path className="transition-colors group-hover/btn2:stroke-white" d="M12.5556 8.19995C12.5556 9.15473 12.181 10.0704 11.5142 10.7455C10.8474 11.4207 9.94301 11.8 9.00001 11.8C8.05702 11.8 7.15265 11.4207 6.48586 10.7455C5.81906 10.0704 5.44446 9.15473 5.44446 8.19995" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span>Add to Cart</span>
                    </button>
                </div>
                {message && (
                    <div className="mt-3 text-[14px] text-[#60B246]">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodCard;
