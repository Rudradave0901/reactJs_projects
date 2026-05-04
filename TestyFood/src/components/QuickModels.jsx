import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../Constants';
import { addToCart } from '../utils/localStorage';

/**
 * Reusable Quick View Modal component refactored from Bootstrap to Tailwind CSS.
 * Handles both Pizza (with variations) and other food items.
 */
export const QuickViewModal = ({ isOpen, onClose, food }) => {
    const [quantityState, setQuantityState] = useState({ foodKey: null, value: 1 });
    const [cartMessage, setCartMessage] = useState('');
    const navigate = useNavigate();

    // Handle body scroll locking and Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !food) return null;

    const isPizza = food.category?.includes('pizza') || food.name?.toLowerCase().includes('pizza');
    const foodKey = food.id || food.name || food.title;
    const quantity = quantityState.foodKey === foodKey ? quantityState.value : 1;
    const updateQuantity = (value) => {
        setQuantityState({
            foodKey,
            value: Math.max(1, value),
        });
    };
    const handleAddToCart = () => {
        addToCart(food, quantity);
        setCartMessage('Added to cart');
        setTimeout(() => setCartMessage(''), 1200);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="relative w-full max-w-[1170px] max-h-[95vh] bg-white rounded-[20px] shadow-2xl overflow-y-auto animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 p-2 text-gray-500 hover:text-[#E60000] transition-colors rounded-full hover:bg-gray-100"
                    aria-label="Close modal"
                >
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="p-6 md:p-[30px]">
                    <div className="flex flex-wrap -mx-4">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                            <div className="bg-[#E7E8E8] rounded-[20px] p-10 flex items-center justify-center min-h-[350px] md:min-h-[470px]">
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="max-w-full h-auto object-contain transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="h-full flex flex-col">
                                <h2 className="text-[32px] md:text-[46px] font-['Carter_One',cursive] leading-tight text-[#131313] mb-4">
                                    {food.name || food.title}
                                </h2>

                                <div className="flex items-center gap-3 mb-[18px]">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4].map(star => (
                                            <img key={star} src="/icons/yellow-star.svg" alt="Star" width="18" height="17" />
                                        ))}
                                        <img src="/icons/gray-star.svg" alt="Star" width="18" height="17" />
                                    </div>
                                    <span className="text-[#131313] text-[16px] font-light leading-none tracking-[0.2px]">(123 reviews)</span>
                                </div>

                                <div className="text-[30px] font-extrabold text-[#E60000] flex items-center gap-4 mb-[18px] leading-none">
                                    {food.price}
                                    <span className="text-[20px] font-light text-[#B8B8B8] line-through decoration-1">$130.00</span>
                                </div>

                                <p className="text-[18px] font-light leading-[1.4] text-black mb-6">
                                    {food.description || "Neque ultricies nunc faucibus est lorem magnis nisl id massa. Amet eget sagittis malesuada pharetra. Imperdiet nisl vitae pellentesque varius."}
                                </p>

                                {/* Conditional Variations for Pizza */}
                                {isPizza && (
                                    <div className="space-y-6 mb-8">
                                        {/* Size Options */}
                                        <div className="flex items-center gap-4">
                                            <span className="text-[18px] font-medium text-black min-w-[60px] tracking-[0.5px]">Size:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {['Small', 'Regular', 'Medium', 'Large', 'XL'].map(size => (
                                                    <label key={size} className="cursor-pointer">
                                                        <input type="radio" name="size" value={size.toLowerCase()} className="peer hidden" />
                                                        <span className="px-[13px] py-[6px] border border-[#D9D9D9] rounded-full text-[16px] font-light text-[#131313] transition-all peer-checked:bg-[#E60000] peer-checked:border-[#E60000] peer-checked:text-white hover:border-[#E60000]">
                                                            {size}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Toppings Section */}
                                        <div>
                                            <span className="block text-[18px] font-medium text-black mb-4 tracking-[0.5px]">More Topping:</span>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                                {[
                                                    { name: 'Cheese', price: 2.00 },
                                                    { name: 'American sausage', price: 2.00 },
                                                    { name: 'Bacon', price: 2.00 },
                                                    { name: 'Chicken', price: 4.00 },
                                                    { name: 'Pineapple', price: 4.00 },
                                                    { name: 'German sausage', price: 3.00 },
                                                    { name: 'Ham', price: 2.00 },
                                                    { name: 'Black olives', price: 2.00 }
                                                ].map(topping => (
                                                    <label key={topping.name} className="flex items-center gap-3 cursor-pointer group">
                                                        <input
                                                            type="checkbox"
                                                            className="w-5 h-5 rounded border-[#D9D9D9] text-[#E60000] focus:ring-[#E60000] cursor-pointer accent-[#E60000]"
                                                        />
                                                        <span className="text-[16px] font-light text-[#131313] tracking-[0.2px] group-hover:text-[#E60000] transition-colors">
                                                            {topping.name} (+${topping.price.toFixed(2)})
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Quantity and Actions */}
                                <div className="mt-auto pt-6 flex flex-wrap items-center gap-4 border-t border-gray-100">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => updateQuantity(quantity - 1)}
                                            className="w-[60px] h-[50px] flex items-center justify-center border border-[#E7E8E8] border-r-0 rounded-l-full hover:bg-gray-50 transition-colors"
                                        >
                                            <img src="/icons/quantity-minus.svg" alt="Minus" width="12" height="2" />
                                        </button>
                                        <input
                                            type="text"
                                            value={quantity}
                                            readOnly
                                            className="w-[68px] h-[50px] border border-[#E7E8E8] bg-white text-center text-black font-medium focus:outline-none"
                                        />
                                        <button
                                            onClick={() => updateQuantity(quantity + 1)}
                                            className="w-[60px] h-[50px] flex items-center justify-center border border-[#E7E8E8] border-l-0 rounded-r-full hover:bg-gray-50 transition-colors"
                                        >
                                            <img src="/icons/quantity-plus.svg" alt="Plus" width="12" height="12" />
                                        </button>
                                    </div>

                                    <button onClick={handleAddToCart} className="flex-1 min-w-[160px] h-[50px] bg-[#E60000] text-white rounded-full font-medium text-[18px] transition-all hover:bg-red-700 active:scale-95 shadow-md hover:shadow-lg">
                                        Add to Cart
                                    </button>

                                    <button
                                        className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center cursor-pointer border border-[#BEBEBE] rounded-full transition-all duration-300 bg-transparent hover:bg-[#FEC223]"
                                        onClick={() => navigate('/cart')}
                                        aria-label="View Cart"
                                    >
                                        <img src={images.cartIcon} alt="Cart Icon" className="w-[14px] h-[16px] md:w-[18px] md:h-[20px]" />
                                    </button>
                                </div>
                                {cartMessage && (
                                    <div className="mt-3 text-[16px] text-[#60B246]">
                                        {cartMessage}
                                    </div>
                                )}

                                {/* Extra Info */}
                                <ul className="mt-8 pt-6 border-t border-gray-100 space-y-2 text-[18px] font-light text-black tracking-[0.2px]">
                                    <li><strong className="font-medium">SKU: </strong>B6837</li>
                                    <li><strong className="font-medium">Category: </strong>{isPizza ? 'Pizza' : (food.category?.[0] || 'Food')}</li>
                                    <li><strong className="font-medium">Tags: </strong>Fast Food, Hot, Grill, Trend</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
