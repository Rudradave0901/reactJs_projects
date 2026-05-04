import React from 'react';
import Container from './Container';

const DiscountSection = () => {
    return (
        <section className="discount-section py-[50px]">
            <Container>
                <div className="lg:flex flex-row items-center w-full">

                    <div className="discount-box-wrap w-full md:inline-block md:w-2/4 lg:w-full red px-[20px] py-[15px] md:py-[40px] relative transition-all duration-300 ease-in-out overflow-hidden">
                        <h2 className="section-title text-[38px] md:text-[46px] leading-[1.1] text-white md:mb-[15px]">Pasta</h2>
                        <p className="content-pera leading-normal text-white mb-[10px]">Get a <strong className="font-medium uppercase">20%</strong> Discount <br />On <strong className="font-medium uppercase">First Order</strong></p>
                        <span className="price text-[24px] md:text-[30px] font-extrabold leading-none text-white block">$10.90</span>
                    </div>

                    <div className="discount-box-wrap w-full md:inline-block md:w-2/4 lg:w-full black px-[20px] py-[15px] md:py-[40px] relative transition-all duration-300 ease-in-out overflow-hidden">
                        <h2 className="section-title text-[38px] md:text-[46px] leading-[1.1] text-white md:mb-[15px]">Burger</h2>
                        <p className="content-pera leading-normal text-white mb-[10px]">Get a <strong className="font-medium uppercase">20%</strong> Discount <br />On <strong className="font-medium uppercase">First Order</strong></p>
                        <span className="price text-[24px] md:text-[30px] font-extrabold leading-none text-white block">$12.90</span>
                    </div>

                    <div className="discount-box-wrap w-full yellow px-[20px] py-[15px] md:py-[40px] relative transition-all duration-300 ease-in-out overflow-hidden md:-mt-2 lg:mt-0">
                        <h2 className="section-title text-[38px] md:text-[46px] leading-[1.1] text-white md:mb-[15px]">Combo</h2>
                        <p className="content-pera leading-normal text-white mb-[10px]">Get a <strong className="font-medium uppercase">20%</strong> Discount <br />On <strong className="font-medium uppercase">First Order</strong></p>
                        <span className="price text-[24px] md:text-[30px] font-extrabold leading-none text-white block">$19.90</span>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default DiscountSection;
