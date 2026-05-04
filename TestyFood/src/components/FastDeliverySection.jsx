import React from 'react';
import Container from './Container';

const FastDeliverySection = () => {
    return (
        <section className="fast-delivery-section py-[90px] md:py-[105px] relative">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
                    <div className="w-full lg:w-1/3 text-center lg:text-left">
                        <h2 className="section-title text-[32px] sm:text-[38px] md:text-[46px] leading-[1.1] mb-[10px]">Choose your favourite food</h2>
                        <p className="content-pera text-[15px] sm:text-[16px] md:text-[18px] mb-0">Egestas amet facilisis cras suspendisse orci volutpat. Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                    </div>
                    <div className="w-full lg:w-1/3 flex justify-center">
                        <div className="delivery-img relative">
                            <img src="/fast-delivery-man.png" className="light-mode-image max-w-[200px] sm:max-w-[280px] md:max-w-[344px] h-auto" alt="Delivery Man" width="344" height="345" />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 text-center lg:text-left">
                        <h2 className="section-title text-[32px] sm:text-[38px] md:text-[46px] leading-[1.1] mb-[10px]">Order Online and Get Fast Delivery</h2>
                        <p className="content-pera text-[15px] sm:text-[16px] md:text-[18px] mb-0">Egestas amet facilisis cras suspendisse orci volutpat. Enim ut et amet vitae facilisi vel odio nisl.</p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FastDeliverySection;
