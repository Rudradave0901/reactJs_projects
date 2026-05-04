import React from 'react';
import CommonBanner from '../components/CommonBanner';
import Container from '../components/Container';
import { TERMS_AND_CONDITIONS_DATA } from '../Constants';

const TermsAndConditions = () => {
    return (
        <>
            <CommonBanner
                sectionTitle='Terms &'
                sectionTitleRed='Conditions'
                currentPage='Terms & Conditions'
                classForStyle=''
            />

            <section className="terms-conditions-section">
                <Container>
                    <div className="w-full flex flex-col">
                        {TERMS_AND_CONDITIONS_DATA.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h2 className={`section-title ${index !== 0 ? 'mt-4' : ''}`}>{section.title}</h2>
                                {section.paragraphs.map((p, i) => (
                                    <p key={i} className="content-pera">{p}</p>
                                ))}
                                {section.list && (
                                    <ul className="conditions-points">
                                        {section.list.map((li, i) => (
                                            <li key={i}>{li}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
};

export default TermsAndConditions;