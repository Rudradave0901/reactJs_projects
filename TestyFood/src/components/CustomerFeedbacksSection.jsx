import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Container from './Container';

const CustomerFeedbacksSection = () => {
    return (
        <section className="customer-feedbacks-section pt-[120px] pb-[170px] relative">
            <Container>
                <div className="text-center px-4">
                    <h2 className="section-title text-[32px] sm:text-[38px] md:text-[46px] leading-[1.1]">Our Customer <span className="text-[#E60000]">Feedbacks</span></h2>
                    <p className="content-pera mb-[30px] md:mb-[40px] text-[15px] sm:text-[16px] md:text-[18px]">Magna sed sagittis non in mattis ultrices fermentum neque maecenas. Leo <br className="hidden lg:block" />diam justo ac vel eleifend placerat volutpat.</p>
                </div>
                <div className="w-full">
                    <Swiper
                        modules={[Autoplay]}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        spaceBetween={30}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            992: { slidesPerView: 2 },
                        }}
                        className="customer-feedbacks-slider pb-[50px] mb-[-50px]"
                    >
                        {[1, 2, 3].map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="customer-feedbacks-wrap bg-white border-0 rounded-[20px] p-[25px] sm:p-[40px] md:p-[50px] relative overflow-hidden shadow-[0px_0px_16px_rgba(0,0,0,0.08)] group/fbwrap mt-8">
                                    <ul className="customer-feedbacks-rating flex items-center justify-start mb-3">
                                        <li><img src="/icons/yellow-star.svg" alt="Star" width="18" height="17" /></li>
                                        <li><img src="/icons/yellow-star.svg" alt="Star" width="18" height="17" /></li>
                                        <li><img src="/icons/yellow-star.svg" alt="Star" width="18" height="17" /></li>
                                        <li><img src="/icons/yellow-star.svg" alt="Star" width="18" height="17" /></li>
                                        <li><img src="/icons/gray-star.svg" alt="Star" width="18" height="17" /></li>
                                    </ul>
                                    <p className="content-pera text-black mb-[20px] md:mb-[30px] text-[15px] sm:text-[16px] md:text-[18px]">Tellus ultrices egestas justo duis. Leo sit quam ultrices turpis libero facilisis faucibus. Nulla elementum sed senectus nunc dolor augue. Blandit hac tempus id blandit urna libero.</p>
                                    <h3 className="customer-title text-[18px] md:text-[20px] font-normal leading-none text-black mb-[5px]">Paul K. Selden</h3>
                                    <p className="customer-designation text-[15px] md:text-[18px] font-light leading-none text-[#8D8D8D] tracking-[0.5px] mb-0">Dignissim</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </section>
    );
};

export default CustomerFeedbacksSection;
