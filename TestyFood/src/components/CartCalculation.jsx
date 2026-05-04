import React from 'react';

const CartCalculationRow = ({ label, value, isBold = false, isHeader = false, marginBottom = "mb-2" }) => (
    <div className={`cart-total-items flex items-center justify-between ${marginBottom}`}>
        <p className={`content-pera mb-0 text-[16px] tracking-[0.2px] w-[68%] mr-[2%] font-['Outfit',sans-serif] ${isBold ? 'font-medium' : (isHeader ? 'font-normal' : 'font-light')}`}>
            {label}
        </p>
        <span className={`cart-ammount w-[30%] text-[16px] leading-normal text-[#131313] text-right tracking-[0.2px] font-normal`}>
            {value}
        </span>
    </div>
);

const CartCalculation = ({
    title,
    detailedItems,
    summaryItems,
    total,
    buttonText,
    buttonLink,
    buttonAction,
    isCheckout = false,
    children
}) => {
    return (
        <div className="cart-calculation-wrap bg-[#E7E8E8] rounded-[10px]">
            <h2 className="calculation-title font-['Outfit',sans-serif] text-[18px] font-medium leading-none text-[#131313] tracking-[0.5px] py-[22px] px-[30px] border-b-2 border-white m-0">
                {title}
            </h2>
            <div className="cart-calculation-info p-[30px] min-h-[380px]">

                {/* Always show Product and Subtotal heading */}
                <CartCalculationRow label="Product" value="Subtotal" isHeader={true} marginBottom="mb-4" />
                <hr className="my-4 border-b border-gray-300" />

                {/* Detailed Products List for Checkout */}
                {detailedItems && detailedItems.length > 0 && (
                    <>
                        {detailedItems.map((item, idx) => (
                            <CartCalculationRow
                                key={idx}
                                label={item.title}
                                value={item.price}
                                isBold={false}
                                marginBottom="mb-3"
                            />
                        ))}
                        <hr className="my-4 border-b border-gray-300" />
                    </>
                )}

                {/* Summary Lines */}
                {summaryItems && summaryItems.map((item, idx) => (
                    <CartCalculationRow
                        key={idx}
                        label={item.label}
                        value={item.value}
                        isBold={false}
                        marginBottom={isCheckout ? "mb-3" : "mb-2"}
                    />
                ))}

                {/* Final Total */}
                {total && (
                    <>
                        <hr className={isCheckout ? "my-[25px] border-t-2 border-black opacity-100 darkline" : "my-[25px] border-t border-[#131313] opacity-100"} />
                        <div className="cart-total-items final-ammount flex items-center justify-between mb-6">
                            <p className="content-pera mb-0 text-[20px] tracking-[0.2px] w-[68%] mr-[2%]">Total</p>
                            <span className="cart-ammount w-[30%] text-[22px] font-semibold leading-normal text-[#131313] text-right tracking-[0.2px]">{total}</span>
                        </div>
                    </>
                )}

                {/* Payment Options or Custom Content */}
                {children}

                {/* Action Button */}
                {buttonText && (
                    <div className={`cart-total-items ${isCheckout ? 'text-center' : ''}`}>
                        {buttonLink ? (
                            <a href={buttonLink} className={`btn btn-danger block text-center w-full ${isCheckout ? 'mb-4' : ''}`}>
                                <span>{buttonText}</span>
                            </a>
                        ) : (
                            <button onClick={buttonAction} className="btn btn-danger mb-4 w-full">
                                <span>{buttonText}</span>
                            </button>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default CartCalculation;
