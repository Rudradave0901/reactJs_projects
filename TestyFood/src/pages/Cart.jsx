import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import CommonBanner from '../components/CommonBanner';
import CartCalculation from '../components/CartCalculation';
import {
    CART_UPDATED_EVENT,
    formatCurrency,
    getCartItems,
    getCartTotals,
    removeCartItem,
    updateCartQuantity
} from '../utils/localStorage';

const Cart = () => {
    const [items, setItems] = useState(() => getCartItems());

    useEffect(() => {
        const syncCart = () => setItems(getCartItems());

        window.addEventListener(CART_UPDATED_EVENT, syncCart);
        window.addEventListener('storage', syncCart);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, syncCart);
            window.removeEventListener('storage', syncCart);
        };
    }, []);

    const handleQuantityChange = (id, change) => {
        setItems(updateCartQuantity(id, change));
    };

    const handleRemoveItem = (id) => {
        setItems(removeCartItem(id));
    };

    const { itemTotal, deliveryFee, taxes, grandTotal } = getCartTotals(items);

    const dynamicCartSummary = [
        { label: "Item Total", value: formatCurrency(itemTotal) },
        { label: "Delivery Fee", value: formatCurrency(deliveryFee) },
        { label: "Govt Taxes & Other Charges", value: formatCurrency(taxes) }
    ];

    return (
        <>

            <CommonBanner
                sectionTitle='Cart'
                sectionTitleRed=''
                currentPage='Cart'
                classForStyle=''
            />


            <section className="added-cart-section py-[50px] pb-[149px]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                        <div className="lg:col-span-8">
                            <div className="cart-list-items-wrap mb-6 lg:mb-4 overflow-x-auto border border-[#E7E8E8] rounded-[10px] overflow-hidden">
                                <ul className="inner-cartlist">
                                    <li className="cart-header flex items-center">
                                        <div className="product-heading product-name min-w-full md:min-w-[50%] text-[18px] font-medium leading-none text-[#131313] tracking-[0.2px] py-[20px] px-[30px] bg-[#E7E8E8]">Product</div>
                                        <div className="product-heading product-qty min-w-full hidden md:block md:min-w-[30%] text-[18px] font-medium leading-none text-[#131313] tracking-[0.2px] py-[20px] px-[30px] bg-[#E7E8E8]">Qty</div>
                                        <div className="product-heading product-price min-w-full hidden md:block md:min-w-[20%] text-[18px] font-medium leading-none text-[#131313] tracking-[0.2px] py-[20px] px-[30px] bg-[#E7E8E8]">Price</div>
                                    </li>
                                    {!items.length && (
                                        <li className="cart-row py-[30px] px-[30px] text-center text-[18px] text-[#747474]">
                                            Your cart is empty.
                                        </li>
                                    )}
                                    {items.map((item) => (
                                        <li className="cart-row flex items-center border-b border-[#E7E8E8] last:border-b-0 flex-wrap md:flex-nowrap" key={item.id}>
                                            <div className="product-body product-name min-w-full md:min-w-[50%] py-[20px] px-[30px]">
                                                <div className="products-details flex items-center">
                                                    <div className="product-img min-w-[60px] mr-[15px]">
                                                        <img src={item.img} alt="Cart Product Image" width="70" height="70" className="object-cover max-w-[60px] h-auto" />
                                                    </div>
                                                    <div className="product-desc">
                                                        <div className="product-title text-[18px] font-medium leading-none text-[#131313] tracking-[0.5px] mb-[2px]">{item.title}</div>
                                                        <button type="button" onClick={() => handleRemoveItem(item.id)} className="customize-option inline-flex items-center text-[16px] font-light leading-[1.5] text-[#747474] tracking-[0.2px] hover:text-[#E60000] transition-colors">
                                                            Remove
                                                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                                                <path d="M1 9L5 5L1 1" stroke="#E60000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-body product-qty max-[400px]:pr-[0px] min-w-[50%] md:min-w-[30%] text-right md:text-left py-[20px] px-[30px]">
                                                <div className="quantity-wrap flex items-center">
                                                    <button 
                                                        className="quantity-minus flex items-center justify-center bg-transparent border border-[#E7E8E8] border-r-0 rounded-l-[50px] p-0 h-[38px] min-w-[40px] hover:bg-gray-50 transition-colors"
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                    >
                                                        <img src="/icons/quantity-minus.svg" alt="Quantity Button" className="max-w-[10px]" width="12" height="2" />
                                                    </button>
                                                    <input type="text" name="productquantity" id={item.id} value={item.qty} className="border border-[#E7E8E8] bg-white text-black h-[38px] p-[10px] w-[43px] text-center" disabled />
                                                    <button 
                                                        className="quantity-plus flex items-center justify-center bg-transparent border border-[#E7E8E8] border-l-0 rounded-r-[50px] p-0 h-[38px] min-w-[40px] hover:bg-gray-50 transition-colors"
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                    >
                                                        <img src="/icons/quantity-plus.svg" alt="Quantity Button" className="max-w-[10px]" width="12" height="12" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="product-body product-price max-[400px]:pl-[0px] min-w-[50%] md:min-w-[20%] text-right md:text-left py-[20px] px-[30px] text-[18px] font-medium leading-none text-[#131313] tracking-[0.5px]">{formatCurrency(item.price * item.qty)}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <form className="couponupdatecart mt-6">
                                <div className="coupon-update-cart-wrap flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="coupon-code-wrap input-group-wrap flex items-center w-full md:w-auto mb-0 flex-col min-[440px]:flex-row gap-3">
                                        <input type="text" className="form-control min-w-[440px]:max-w-[220px] py-[6px] px-[30px] placeholder:text-[#BBBBBB] w-full" name="couponcode" placeholder="Coupon code" />
                                        <button type="submit" className="btn btn-danger ml-2 whitespace-nowrap min-w-[180px] text-[18px] py-[9px] px-[30px] w-full"><span>Apply Coupon</span></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="lg:col-span-4 mt-8 lg:mt-0">
                            <CartCalculation
                                title="Cart Totals"
                                summaryItems={dynamicCartSummary}
                                total={formatCurrency(grandTotal)}
                                buttonText="Proceed to checkout"
                                buttonLink="/checkout"
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Cart;
