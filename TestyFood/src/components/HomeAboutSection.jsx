import React from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';

const HomeAboutSection = () => {
    return (
        <section className="home-about-section pt-[20px] pb-[50px]">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Left: Responsive Image Boundary */}
                    <div className="home-about-img relative w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
                        <img src="/about-food.png" alt="Tasty Food" className="max-w-[80%] md:max-w-[70%] lg:max-w-full h-auto" width="638" height="469" />
                    </div>
                    {/* Right: Content Section */}
                    <div className="home-about-content w-full lg:w-1/2">
                        <h2 className="section-title text-[38px] sm:text-[46px] lg:text-[60px] leading-[1.1] mb-[15px]">About Tasty <span className="text-(--primary)">Foods</span></h2>
                        <p className="content-pera mb-[15px] text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] lg:mx-0 max-w-[650px] lg:max-w-full">
                            Egestas amet facilisis cras suspendisse orci volutpat. Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.
                        </p>
                        <p className="content-pera mb-[15px] text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] lg:mx-0 max-w-[650px] lg:max-w-full">
                            Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.
                        </p>
                        <ul className="about-list-item mt-4 mb-4 text-left max-w-[320px] sm:max-w-[400px] lg:mx-0">
                            <li className="text-[18px] sm:text-[20px] md:text-[22px] font-medium text-[#131313] leading-[1.3] md:leading-[1.2] tracking-[0.5px] pl-[30px] md:pl-[35px] mb-[10px] md:mb-[15px] relative">Delicious &amp; Healthy Foods</li>
                            <li className="text-[18px] sm:text-[20px] md:text-[22px] font-medium text-[#131313] leading-[1.3] md:leading-[1.2] tracking-[0.5px] pl-[30px] md:pl-[35px] mb-[10px] md:mb-[15px] relative">Best Price &amp; Offers</li>
                            <li className="text-[18px] sm:text-[20px] md:text-[22px] font-medium text-[#131313] leading-[1.3] md:leading-[1.2] tracking-[0.5px] pl-[30px] md:pl-[35px] mb-[10px] md:mb-[15px] relative">Made By Fresh Ingredients</li>
                        </ul>
                        {/* Call to Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-start gap-4 lg:mx-0 max-w-[350px] sm:max-w-none w-full sm:w-auto mt-6">
                            <Link to="/foodlisting" className="btn btn-primary w-full sm:w-auto text-[15px] md:text-[16px] px-6 py-3"> <span>Order Now</span> </Link>
                            <Link to="/aboutus" className="btn btn-secondary w-full sm:w-auto text-[15px] md:text-[16px] px-6 py-3"> <span>Read More</span> </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default HomeAboutSection;
