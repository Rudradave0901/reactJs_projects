import React from 'react';
import Container from './Container';

const FoodsGallerySection = () => {
    return (
        <section className="foods-gallery-section">
            <Container>
                <div className="flex flex-wrap">
                    <div className="w-full text-center">
                        <h2 className="section-title text-[32px] sm:text-[38px] md:text-[46px] leading-[1.1]">Foods <span>Gallery</span></h2>
                    </div>
                </div>
            </Container>
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 instagram-feed-wrap px-4 lg:px-0">
                    <div className="w-full">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="instagram-img-wrap relative block w-full rounded-[10px] overflow-hidden">
                            <img src="/gallery-1.png" alt="Instagram Post" width="265" height="265" className="w-full h-auto object-cover" />
                        </a>
                    </div>
                    <div className="w-full">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="instagram-img-wrap relative block w-full rounded-[10px] overflow-hidden">
                            <img src="/gallery-2.png" alt="Instagram Post" width="265" height="265" className="w-full h-auto object-cover" />
                        </a>
                    </div>
                    <div className="w-full">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="instagram-img-wrap relative block w-full rounded-[10px] overflow-hidden">
                            <img src="/gallery-3.png" alt="Instagram Post" width="265" height="265" className="w-full h-auto object-cover" />
                        </a>
                    </div>
                    <div className="w-full">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="instagram-img-wrap relative block w-full rounded-[10px] overflow-hidden">
                            <img src="/gallery-4.png" alt="Instagram Post" width="265" height="265" className="w-full h-auto object-cover" />
                        </a>
                    </div>
                    <div className="w-full">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="instagram-img-wrap relative block w-full rounded-[10px] overflow-hidden">
                            <img src="/gallery-5.png" alt="Instagram Post" width="265" height="265" className="w-full h-auto object-cover" />
                        </a>
                    </div>
                    <div className="w-full block lg:hidden">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="instagram-img-wrap relative block w-full rounded-[10px] overflow-hidden">
                            <img src="/gallery-1.png" alt="Instagram Post" width="265" height="265" className="w-full h-auto object-cover" />
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FoodsGallerySection;
