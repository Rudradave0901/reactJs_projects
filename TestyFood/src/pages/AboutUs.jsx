import React from 'react'
import CommonBanner from '../components/CommonBanner'
import Container from '../components/Container'
import FastDeliverySection from '../components/FastDeliverySection'
import CustomerFeedbacksSection from '../components/CustomerFeedbacksSection'
import FoodsGallerySection from '../components/FoodsGallerySection'

const whyChooseFeatures = [
    { img: "/healthy-foods.svg", title: "Delicious & Healthy Foods" },
    { img: "/fresh-ingredients.svg", title: "Fresh Ingredients" },
    { img: "/price-offers.svg", title: "Best Price & Offers" }
];

const sponsors = [
    "/sponsors-1.png",
    "/sponsors-2.png",
    "/sponsors-3.png",
    "/sponsors-4.png",
    "/sponsors-5.png"
];

const AboutUs = () => {
    return (
        <>
            <CommonBanner
                sectionTitle='About'
                sectionTitleRed='Us'
                currentPage='About Us'
                classForStyle=''
            />

            <section className="about-tasty-foods-section py-12 lg:py-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="about-foods-img-wrap flex justify-center lg:justify-start">
                            <img src="/about-tasty-foods.png" alt="About Tasty Foods" width="535" height="458" className="max-w-full h-auto object-contain" />
                        </div>
                        <div className="about-foods-content-wrap text-center lg:text-left">
                            <h2 className="section-title text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] mb-4">About Tasty <span>Foods</span></h2>
                            <p className="content-pera text-[16px] md:text-[18px] mb-4">Egestas amet facilisis cras suspendisse orci volutpat. Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                            <p className="content-pera text-[16px] md:text-[18px] mb-4">Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                            <p className="content-pera text-[16px] md:text-[18px] mb-4">Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis. Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                            <a href="/foodlisting" className="btn btn-primary mt-4 inline-block">
                                <span>Order Now</span>
                            </a>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="about-video-section py-[100px] md:py-[150px]">
                <Container>
                    <div className="flex flex-col items-center text-center">
                        <button type="button" className="btn btn-danger mb-[25px] flex items-center justify-center w-full max-w-[90px] h-[90px] rounded-full p-0 pl-[5px] transition-all duration-300 ease-in-out hover:bg-[#E60000] focus:bg-[#E60000] active:bg-[#E60000]">
                            <img src="/icons/video-play.svg" alt="Play Video" width="24" height="28" />
                        </button>
                        <h2 className="section-title text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] mb-[10px] text-white">Watch The Video</h2>
                        <p className="content-pera text-[16px] md:text-[18px] text-white mb-0">Enim ut et amet vitae facilisi vel odio nisl. Pellentesque <br className="hidden lg:block" />malesuada massa proin cursus elit amet iaculis.</p>
                    </div>
                </Container>
            </section>

            <section className="choose-our-foods-section py-[45px] lg:py-[80px]">
                <Container>
                    <div className="text-center mb-[50px]">
                        <h2 className="section-title text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] mb-4">Why Choose <span>Our Foods</span></h2>
                        <p className="content-pera text-[16px] md:text-[18px] mb-0">Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada <br className="hidden lg:block" />massa proin cursus elit amet iaculis.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                        {whyChooseFeatures.map((feature, index) => (
                            <div key={index} className="choose-box-wrap h-[calc(100%-24px)] mb-[24px] relative text-center max-w-sm">
                                <img src={feature.img} alt={feature.title} width="122" height="111" className="mx-auto mb-[20px]" />
                                <h2 className="section-title text-[20px] md:text-[24px] mb-[15px]">{feature.title}</h2>
                                <p className="content-pera text-[16px] md:text-[18px] mb-0">Senectus amet lobortis metus convallis etiam dignissim parturient tincidunt. Neque enim in cursus eu.</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="fast-delivery-section happy-sponsors-section py-12 lg:py-20 relative">
                <Container>
                    <div className="text-center">
                        <h2 className="happy-sponsors-title text-[20px] md:text-[24px] lg:text-[32px] mb-10 max-w-4xl mx-auto">
                            A distinctive, well-preserved and comfortable space, high-quality products, authentic cuisine, food & drinks are done flawlessly.
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center mb-8">
                            {sponsors.map((src, index) => (
                                <div key={index}>
                                    <img src={src} alt="Sponsors" width="210" height="150" className="max-w-full h-auto object-contain" />
                                </div>
                            ))}
                        </div>
                        <p className="content-pera text-[18px] md:text-[22px] mb-0 mt-6 lg:mt-8 tracking-[0.5px]">1000+ Happy Sponsors With us</p>
                    </div>
                </Container>
            </section>

            <section className="award-winning-section quality-foods-section py-12 lg:py-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="award-winning-content-wrap order-2 lg:order-1 text-center lg:text-left">
                            <h2 className="section-title text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] mb-4">We Deliver Quality <span>Foods</span></h2>
                            <p className="content-pera text-[16px] md:text-[18px] mb-4">Egestas amet facilisis cras suspendisse orci volutpat. Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                            <p className="content-pera text-[16px] md:text-[18px] mb-4">Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                            <p className="content-pera text-[16px] md:text-[18px] mb-4">Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis. Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                            <a href="/foodlisting" className="btn btn-primary mt-4 inline-block btn-hover-1">
                                <span>Order Now</span>
                            </a>
                        </div>
                        <div className="award-winning-img-wrap flex justify-center lg:justify-start order-1 lg:order-2">
                            <img src="/quality-food.png" alt="Deliver Quality Foods" width="638" height="518" className="max-w-full h-auto object-contain" />
                        </div>
                    </div>
                </Container>
            </section>

            <FastDeliverySection />

            <section className="award-winning-section py-12 lg:py-20">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="award-winning-img-wrap flex justify-center lg:justify-start">
                            <img src="/about-chef.png" alt="Award Winning Chef" width="617" height="579" className="max-w-full h-auto object-contain" />
                        </div>
                        <div className="award-winning-content-wrap text-center lg:text-left">
                            <h2 className="section-title text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] mb-4">Award Winning <span>Chef</span></h2>
                            <p className="content-pera text-[16px] md:text-[18px] mb-4">Egestas amet facilisis cras suspendisse orci volutpat. Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                            <p className="content-pera text-[16px] md:text-[18px] mb-4">Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                            <p className="content-pera text-[16px] md:text-[18px] mb-4">Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis. Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada massa proin cursus elit amet iaculis.</p>
                            <a href="/foodlisting" className="btn btn-primary mt-4 inline-block btn-hover-1">
                                <span>Order Now</span>
                            </a>
                        </div>
                    </div>
                </Container>
            </section>

            <CustomerFeedbacksSection />
            <FoodsGallerySection />
        </>
    )
}

export default AboutUs