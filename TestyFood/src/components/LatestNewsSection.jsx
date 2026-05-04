import React, { useEffect, useState } from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';
import { getLatestFoodNews } from '../api/themealdb';

const LatestNewsSection = ({
    sectionTitle = "Our Latest Foods",
    sectionTitleRed = "News",
    contentPera = "Aliquam quam pellentesque diam tincidunt eget purus. Faucibus eu nulla in \namet varius risus sed morbi cras.",
    limit = 3
}) => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const dataToDisplay = limit ? newsData.slice(0, limit) : newsData;

    useEffect(() => {
        const controller = new AbortController();

        const loadNews = async () => {
            setIsLoading(true);
            setError('');

            try {
                const news = await getLatestFoodNews(limit || 9, controller.signal);
                setNewsData(news);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError('Food news load thata problem aavyo. Please thodi vaar pachi try karo.');
                    setNewsData([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        loadNews();

        return () => controller.abort();
    }, [limit]);

    return (
        <section className="latest-news-section py-[50px]">
            <Container>
                <div className="text-center px-4 mb-[45px]">
                    <h2 className="section-title text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] leading-[1.1] mb-[10px]">
                        {sectionTitle} <span className="text-[#E60000]">{sectionTitleRed}</span>
                    </h2>
                    <p className="content-pera text-[15px] sm:text-[16px] md:text-[18px] whitespace-pre-line mb-0">
                        {contentPera}
                    </p>
                </div>
                {isLoading && (
                    <div className="text-center text-[18px] text-[#636363] mb-8">
                        Loading food news...
                    </div>
                )}
                {!isLoading && error && (
                    <div className="text-center text-[18px] text-[#E60000] mb-8">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-[30px] w-full px-4">
                    {dataToDisplay.map((item, index) => (
                        <div key={index} className="w-full">
                            <div className="latest-news-item-wrap bg-white border border-[#E7E8E8] rounded-[20px] mb-[24px] h-[calc(100%-24px)] overflow-hidden transition-all duration-300 ease-in-out hover:shadow-[0px_0px_12px_rgba(0,0,0,0.14)] group/news">
                                <div className="latest-news-item-img relative z-1 overflow-hidden">
                                    <Link to={item.link || "/blog-details"} className="block">
                                        <img src={item.img} alt={item.title || "Latest News"} width="407" height="242" className="h-auto w-full transition-all duration-500 group-hover/news:scale-110" />
                                    </Link>
                                </div>
                                <div className="latest-news-item-content px-[20px] pt-[20px] pb-[30px]">
                                    <Link to={item.link || "/blog-details"} className="latest-news-title font-['Carter_One',cursive] text-[24px] md:text-[28px] font-normal leading-[1.2] text-[#131313] mb-[10px] hover:text-[#E60000] inline-block">{item.title}</Link>
                                    <p className="content-pera mb-[20px] text-[15px] sm:text-[16px] md:text-[18px]">{item.desc}</p>
                                    <Link to={item.link || "/blog-details"} className="latest-news-link text-[16px] sm:text-[18px] font-normal leading-none text-[#AFAFAF] underline group-hover/news:font-medium group-hover/news:text-[#E60000] transition-colors">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default LatestNewsSection;
