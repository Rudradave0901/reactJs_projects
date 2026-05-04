import React, { useState, useEffect, useCallback } from 'react';
import Container from './Container';
import { images, navLinks } from '../Constants';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AUTH_UPDATED_EVENT, CART_UPDATED_EVENT, getCartCount, getCurrentUser, logoutUser } from '../utils/localStorage';

// ==========================================
// Header Component (TopBar + Navbar Combined)
// ==========================================
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [cartCount, setCartCount] = useState(() => getCartCount());
    const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
    const navigate = useNavigate();

    const handleHamburger = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add("menuopen");
        } else {
            document.body.classList.remove("menuopen");
        }

        return () => document.body.classList.remove("menuopen");
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 90);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        // initial check
        handleScroll();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const syncHeaderState = () => {
            setCartCount(getCartCount());
            setCurrentUser(getCurrentUser());
        };

        window.addEventListener(CART_UPDATED_EVENT, syncHeaderState);
        window.addEventListener(AUTH_UPDATED_EVENT, syncHeaderState);
        window.addEventListener('storage', syncHeaderState);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, syncHeaderState);
            window.removeEventListener(AUTH_UPDATED_EVENT, syncHeaderState);
            window.removeEventListener('storage', syncHeaderState);
        };
    }, []);

    const handleAccountClick = () => {
        navigate('/myaccount');
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    // Determine specific styling based on scroll and mobile-menu states
    const headerBgClasses = isMobileMenuOpen || scrolled
        ? 'bg-(--bg-main) shadow-md'
        : 'bg-transparent';

    const headerFixedClasses = scrolled
        ? 'fixed top-0 animate-[slideDown_0.4s_ease-in-out_forwards]'
        : 'absolute top-0';

    return (
        <header className={`header-section flex flex-col z-50 w-full transition-all duration-300 ${headerBgClasses} ${headerFixedClasses}`}>
            {/* Top Bar Segment */}
            <div className="w-full transition-colors duration-300 border-b border-(--border-light) top-header hidden sm:block">
                <Container className="flex flex-col lg:flex-row justify-between items-center py-2 h-auto lg:h-[40px]">
                    {/* Left Side: Hours */}
                    <div className="flex items-center gap-2 mb-2 lg:mb-0">
                        <img src={images.clockIcon} alt="Clock" className="w-[15px] h-[16px] md:w-[17px] md:h-[18px]" />
                        <span className="font-light text-[14px] md:text-[16px] leading-[20px] tracking-[0.2px] text-(--text-main) opacity-90"> Mon-Fri:8am - 11pm, Sat-Sun:8am-12pm </span>
                    </div>

                    {/* Right Side: Links */}
                    <div className="flex items-center gap-[10px] md:gap-[15px]">
                        <Link to="/contactus" className="font-light text-[14px] md:text-[16px] leading-[20px] tracking-[0.2px] text-(--text-main) transition-colors duration-300 hover:text-(--primary)">Contact Us</Link>
                        <span className="font-light text-(--text-main) text-[14px] md:text-[16px]">|</span>
                        
                        {!currentUser ? (
                            <Link to="/login" className="font-light text-[14px] md:text-[16px] leading-[20px] tracking-[0.2px] text-(--text-main) transition-colors duration-300 hover:text-(--primary)">Login</Link>
                        ) : (
                            <button onClick={handleLogout} className="font-light text-[14px] md:text-[16px] leading-[20px] tracking-[0.2px] text-(--text-main) transition-colors duration-300 hover:text-(--primary) bg-transparent cursor-pointer">Logout</button>
                        )}
                        
                        <span className="font-light text-(--text-main) text-[14px] md:text-[16px]">|</span>
                        <Link to="/faqs" className="font-light text-[14px] md:text-[16px] leading-[20px] tracking-[0.2px] text-(--text-main) transition-colors duration-300 hover:text-(--primary)">FAQ</Link>
                    </div>
                </Container>
            </div>

            {/* Main Navbar Segment */}
            <div className="w-full transition-colors duration-300 relative">
                <Container className="flex justify-between items-center py-[15px] md:py-[20px]">
                    {/* Left: Logo */}
                    <Link to={'/'} className="shrink-0 cursor-pointer">
                        <img src={images.brandLogo} alt="Tasty Foods Logo" className="object-contain w-[120px] h-[55px] md:w-[150px] md:h-[70px]" />
                    </Link>

                    {/* Center: Nav links */}
                    <nav aria-label="Main Navigation">
                        <ul className={`site-navigation lg:flex flex-row items-center gap-[20px] xl:gap-[30px] ${isMobileMenuOpen ? 'open' : ''}`}>
                            {navLinks.map((link, idx) => (
                                <li className="nav-item relative group flex items-center" key={idx}>
                                    <Link
                                        to={link.link}
                                        onClick={closeMobileMenu}
                                        className="nav-link flex items-center lg:justify-center gap-[6px] text-[18px] xl:text-[20px] py-3 lg:py-4 font-light text-(--text-main) w-full"
                                    >
                                        <span className="transition-colors duration-300 group-hover:text-(--primary) text-(--text-main)">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right: Phone, Cart, Order Button & Mobile Toggle */}
                    <div className="flex items-center gap-[12px]">

                        {/* Phone Section */}
                        <Link to="tel:+15551575651" className="hidden xl:flex items-center gap-[12px] group">
                            <div className="nav-phone-icon">
                                <img src={images.phoneIcon} alt="Phone Icon" width="35" height="36" />
                            </div>
                            <div className="flex flex-col justify-center gap-[2px]">
                                <span className="text-[14px] font-normal text-(--text-subtle) leading-[1.2]">Call us for Order</span>
                                <span className="text-[20px] xl:text-[22px] font-bold text-(--accent) leading-[20px] drop-shadow-[0_0_4px_rgba(255,255,255,0.8)] transition-all duration-300 group-hover:text-[#E60000]">
                                    +1-555-157-5651
                                </span>
                            </div>
                        </Link>

                        {/* Cart Icon */}
                        <button
                            className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center cursor-pointer border border-[#BEBEBE] rounded-full transition-all duration-300 bg-transparent hover:bg-[#FEC223]"
                            onClick={() => navigate('/cart')}
                            aria-label="View Cart"
                        >
                            <img src={images.cartIcon} alt="Cart Icon" className="w-[14px] h-[16px] md:w-[18px] md:h-[20px]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-[#E60000] text-white text-[12px] font-bold flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Profile Icon (Only if logged in) */}
                        {currentUser && (
                            <button
                                className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center cursor-pointer border border-[#BEBEBE] rounded-full transition-all duration-300 bg-transparent hover:bg-[#FEC223]"
                                onClick={handleAccountClick}
                                aria-label="My Account"
                                title="My Account"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /> </svg>
                            </button>
                        )}

                        {/* Order button */}
                        <button className="btn btn-danger text-[14px] md:text-[16px] px-3 max-[430px]:hidden md:px-5 py-1.5 md:py-2" onClick={() => navigate("/foodlisting")}>
                            <span>Order Online</span>
                        </button>

                        {/* Mobile menu toggle */}
                        <button
                            className={`hamburger-menu lg:hidden ${isMobileMenuOpen ? 'open' : ''}`}
                            onClick={handleHamburger}
                            aria-expanded={isMobileMenuOpen}
                            aria-label="Toggle navigation menu"
                            type="button"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </Container>
            </div>
        </header>
    );
};

export default Header;
