import React, { useState } from 'react';
import CommonBanner from "../components/CommonBanner";
import Container from "../components/Container";
import { images, FAQ_DATA } from '../Constants';

const FaqPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <CommonBanner
                sectionTitle='FAQ'
                sectionTitleRed='Questions'
                currentPage='Faqs'
                classForStyle=''
            />

            <section className="frequently-asked-questions-section">
                <Container>
                    <div className="w-full flex flex-col">
                        <div className="w-full">
                            <div className="frequently-asked-questions-wrap">
                                <div className="accordion">
                                    {FAQ_DATA.map((faq, index) => (
                                        <div key={index} className="accordion-item transition-all duration-300 overflow-hidden">
                                            <h2 className="m-0">
                                                <button
                                                    className={`accordion-button w-full flex items-center justify-between text-left ${activeIndex !== index ? "collapsed" : ""}`}
                                                    onClick={() => toggleAccordion(index)}
                                                    aria-expanded={activeIndex === index}
                                                    aria-controls={`faq-collapse-${index}`}
                                                >
                                                    <span>{faq.question}</span>
                                                    <img src={images.dropdownArrow} alt="" aria-hidden="true" height={6} width={10} />
                                                </button>
                                            </h2>
                                            <div
                                                id={`faq-collapse-${index}`}
                                                className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${activeIndex === index ? "max-h-[1000px]" : "max-h-0"}`}
                                            >
                                                <div className="accordion-body">
                                                    <p className="content-pera mb-0">{faq.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default FaqPage;