import React from 'react';
import Container from './Container';
import { images } from '../Constants';
import '../css/header-footer.css';

const quickLinks = [
    { name: "About Us", path: "/aboutus" },
    { name: "Terms & Conditions", path: "/privacy-policy" },
    { name: "Testimonial", path: "/" },
    { name: "Blog", path: "/Blogs" },
    { name: "Contact Us", path: "/contactus" }
];

const menuLinks = [
    { name: "Burgers" },
    { name: "Desserts" },
    { name: "Pizza" },
    { name: "Pasta" },
    { name: "Cold Drinks" }
];

const contactDetails = [
    {
        icon: images.emailIcon,
        content: "3847 Hummingbird Way\nQuincy, MA 02169",
        link: "https://goo.gl/maps/"
    },
    {
        icon: images.phoneIcon,
        content: "+1-555-157-5651",
        link: "tel:+15551575651"
    },
    {
        icon: images.locationIcon,
        content: "tastyfoods@gmail.com",
        link: "mailto:tastyfoods@gmail.com"
    }
];

const Footer = () => {
    return (
        <footer className="footer-section">
            <Container className="relative z-10">

                {/* Top Section */}
                <div className="w-full border-b-2 border-black/10 pb-[50px] mb-[50px] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
                    <div className="flex-shrink-0 text-center lg:text-left w-full lg:w-[16%]">
                        <a href="/" className="inline-block">
                            <img src={images.brandLogo} alt="Tasty Foods" width="150" height="70" className="object-contain" />
                        </a>
                    </div>
                    <div className="flex w-full lg:w-[84%] flex-col lg:flex-row items-center lg:justify-between lg:border-l border-black/10 py-[6px] md:px-8 lg:px-0 lg:pl-[40px] xl:pl-[45px] gap-6 lg:gap-8">
                        <div className="text-center lg:text-left w-full lg:w-auto">
                            <h2 className="font-['Carter_One'] text-[24px] md:text-[28px] leading-[32px] text-black">Subscription News</h2>
                            <p className="font-['Outfit'] font-light text-[14px] md:text-[16px] leading-[20px] tracking-[0.5px] text-black mt-1">Subscribe to the weekly newsletter.</p>
                        </div>
                        <form className="flex w-full lg:w-auto flex-col sm:flex-row gap-4 items-center" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                className="font-['Outfit'] text-[16px] md:text-[18px] font-light text-[#979393] px-[20px] md:px-[30px] py-[13px] bg-white border border-white rounded-[50px] w-full sm:flex-1 lg:w-[300px] xl:w-[480px] transition-colors outline-none focus:border-(--accent) hover:border-(--accent)"
                                placeholder="Enter Email Address"
                                required
                            />
                            <button type="submit" className="font-['Outfit'] text-[18px] md:text-[20px] font-normal bg-[#131313] text-white rounded-[50px] px-[24px] md:px-[30px] h-[50px] whitespace-nowrap transition-colors hover:bg-(--primary) w-full sm:w-auto">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="w-full pb-12 lg:pb-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
                    {/* Column 1: Info */}
                    <div className="flex flex-col gap-6 lg:col-span-4 lg:pr-6">
                        <p className="font-['Outfit'] font-light text-[18px] leading-[26px] tracking-[0.5px] text-black">
                            Senectus amet lobortis metus <br className="hidden xl:block" />
                            convallis etiam dignissim parturient <br className="hidden xl:block" />
                            tincidunt. Neque enim in cursus eu.
                        </p>
                        <div className="flex flex-col gap-[8px]">
                            <h3 className="font-['Carter_One'] text-[20px] text-[#131313]">Book A Table</h3>
                            <a href="tel:+15551575651" className="font-['Outfit'] font-bold text-[20px] text-[#E60000] transition-colors hover:underline hover:text-[#CC0000]">+1-555-157-5651</a>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <h3 className="font-['Carter_One'] text-[20px] text-[#131313]">Opening Hours</h3>
                            <span className="font-['Outfit'] font-bold text-[20px] text-[#E60000] transition-colors hover:underline hover:text-[#CC0000]">08:00 AM - 12:00 PM</span>
                        </div>
                    </div>

                    {/* Column 2 & 3: Links */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-full">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-['Carter_One'] text-[20px] text-[#131313]">Quick Links</h3>
                            <ul className="flex flex-col gap-[12px]">
                                {quickLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.path} className="font-['Outfit'] text-[18px] font-light text-(--text-main) tracking-[0.5px] transition-colors hover:text-(--primary)">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-['Carter_One'] text-[20px] text-[#131313]">Our Menu</h3>
                            <ul className="flex flex-col gap-[12px]">
                                {menuLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <span className="font-['Outfit'] text-[18px] font-light text-(--text-main) tracking-[0.5px] transition-colors hover:text-(--primary)">{link.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="lg:col-span-3 flex flex-col gap-5">
                        <h3 className="font-['Carter_One'] text-[20px] text-[#131313]">Get In Touch</h3>
                        <div className="flex flex-col gap-[20px]">
                            {contactDetails.map((contact, idx) => (
                                <div key={idx} className={`flex ${idx === 0 ? 'items-start' : 'items-center'} gap-[15px]`}>
                                    <div className="bg-(--primary) w-[30px] h-[30px] rounded-full flex justify-center items-center shrink-0 contact-icon-wrapper">
                                        <img src={contact.icon} alt="Icon" width="16" height="16" />
                                    </div>
                                    <a
                                        href={contact.link}
                                        target={idx === 0 ? "_blank" : undefined}
                                        rel={idx === 0 ? "noreferrer" : undefined}
                                        className="font-['Outfit'] text-[18px] font-light text-(--text-main) tracking-[0.5px] transition-colors hover:text-(--primary) whitespace-pre-line leading-[1.6]"
                                    >
                                        {contact.content}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            {/* Bottom Section */}
            <div className="w-full bg-[#F3F4F6]/40 py-[20px] mt-6 lg:mt-0 relative z-10">
                <Container className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                    <p className="font-['Outfit'] font-light text-[16px] tracking-[0.5px] text-[#131313] transition-colors m-0 text-center md:text-left">
                        Copyright 2023 Tasty Foods. All Rights Reserved.
                    </p>
                    <div className="flex items-center justify-center md:justify-end gap-3">
                        <a href="/privacy-policy" className="font-['Outfit'] font-light text-[16px] tracking-[0.5px] text-[#131313] transition-colors hover:text-(--primary)">
                            Privacy Policy
                            <span className="font-['Outfit'] font-light text-[16px] tracking-[0.5px] text-[#131313] transition-colors"> | </span>
                            Terms of Use
                        </a>
                    </div>
                </Container>
            </div>
        </footer>
    );
};
export default Footer;