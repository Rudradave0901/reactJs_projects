import React from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';

const HomeBannerSection = () => {
    return (
        <section className="banner-section pt-[120px] sm:pt-[200px] pb-[60px] lg:pb-[90px] overflow-hidden">
            <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6">
                    {/* Content Section */}
                    <div className="banner-content-wrap relative w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
                        <h1 className="section-title relative mb-4 sm:mb-6 lg:mb-8 text-[36px] sm:text-[44px] md:text-[56px] lg:text-[70px] leading-[1.1] font-bold">
                            Welcome To Our Tasty <span className="relative">Foods</span>
                        </h1>
                        <p className="content-pera mb-6 lg:mb-8 text-[15px] sm:text-[16px] md:text-[18px] max-w-[600px] lg:max-w-full text-gray-600">
                            Egestas amet facilisis cras suspendisse orci volutpat. Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.
                        </p>
                        <div className="flex flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
                            <Link to="/foodlisting" className="btn btn-primary w-full sm:w-auto text-[15px] md:text-[16px] px-6 py-3"> <span>Order Now</span> </Link>
                            <Link to="/contactus" className="btn btn-secondary w-full sm:w-auto text-[15px] md:text-[16px] px-6 py-3"> <span>Book a Table</span> </Link>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="banner-img-wrap relative w-full lg:w-1/2 flex justify-center mt-6 lg:mt-0 xl:pl-10">
                        <img
                            src="/banner-food.png"
                            className="main-img relative max-w-[85%] sm:max-w-[70%] lg:max-w-[120%] xl:max-w-[140%] w-auto h-auto z-10 lg:-ml-12"
                            alt="Banner Food"
                            width="640"
                            height="472"
                        />
                        {/* Decorative Icons with responsive scaling and safe spacing */}
                        <img
                            src="/backgrounds/tomato-icon.png"
                            className="icon-1 absolute top-0 left-2 md:left-10 animate-[jittery_6s_infinite] w-[60px] sm:w-[90px] md:w-[120px] lg:w-[148px]"
                            alt="Tomato Outline"
                        />
                        <img
                            src="/backgrounds/seek-icon.png"
                            className="icon-2 absolute -bottom-4 md:-bottom-6 left-2 md:left-10 animate-[jittery_6s_infinite] z-20 w-[80px] sm:w-[130px] md:w-[180px] lg:w-[209px]"
                            alt="Seek Background"
                        />
                        <img
                            src="/backgrounds/chilli-green-icon.png"
                            className="icon-3 absolute top-0 right-4 md:right-12 animate-[jittery_6s_infinite] w-[40px] sm:w-[70px] md:w-[90px] lg:w-[118px]"
                            alt="Green Chilli Graphic"
                        />
                        <img
                            src="/backgrounds/chilli-red-icon-dbl.png"
                            className="icon-4 absolute -bottom-2 md:bottom-10 -right-6 md:-right-16 lg:-right-24 xl:-right-36 animate-[jittery_6s_infinite] z-20 w-[100px] sm:w-[150px] md:w-[180px] lg:w-[221px]"
                            alt="Red Chillies Pair"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HomeBannerSection;
