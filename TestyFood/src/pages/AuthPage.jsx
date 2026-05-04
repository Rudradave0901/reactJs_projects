import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword';

const AuthPage = () => {
    const location = useLocation();

    let ContentComponent = Login;
    let title = "Welcome back, <span class='text-[#E60000]'>Login</span>";
    let subtitle = "Hey, Enter your details to get sign in to your account";

    if (location.pathname === '/register') {
        ContentComponent = Register;
        title = "Create <span class='text-[#E60000]'>Account</span>";
        subtitle = "Get access to exclusive features by creating account";
    } else if (location.pathname === '/forgot-password') {
        ContentComponent = ForgotPassword;
        title = "Password <span class='text-[#E60000]'>recovery</span>";
        subtitle = "No worries, we'll send you a password reset link.";
    }

    return (
        <section className="h-screen">
            <div className="w-full h-full">
                <div className="flex flex-wrap h-full">
                    <div className="hidden xl:block xl:w-1/2 p-0 h-full">
                        <div className="h-full bg-[url(/backgrounds/account-sidebar-background.png)] bg-cover bg-top"></div>
                    </div>
                    <div className="w-full xl:w-1/2 p-0 h-full">
                        <div className="h-full p-[30px] sm:p-[70px] bg-[url(/backgrounds/account-sidebar-background-2.png)] bg-cover bg-top flex flex-col justify-between overflow-y-auto">
                            <div className="login-content-part">
                                <div className="text-center">
                                    <div className="mb-[45px]">
                                        <Link to="/">
                                            <img src="/logo.svg" className="mx-auto" alt="Tasty Foods" width="150" height="70" />
                                        </Link>
                                    </div>
                                    <h2 className="text-[32px] sm:text-[46px] font-medium leading-tight mb-[15px] font-['Carter_One',cursive]" dangerouslySetInnerHTML={{ __html: title }}></h2>
                                    <p className="text-[18px] font-light text-[#131313] mb-[40px] tracking-[0.5px]">{subtitle}</p>
                                </div>
                                <ContentComponent />
                            </div>
                            <div className="mt-8">
                                <div className="text-center">
                                    <ul className="flex items-center justify-center mb-0 list-none p-0">
                                        <li className="relative mx-[15px] after:content-['|'] after:absolute after:text-[#131313] after:top-[4px] after:-right-[18px]">
                                            <Link to="/privacy-policy" className="text-[16px] font-light leading-normal text-[#131313] tracking-[0.5px] hover:text-[#E60000] transition-colors">Privacy Policy</Link>
                                        </li>
                                        <li className="relative mx-[15px]">
                                            <Link to="#" className="text-[16px] font-light leading-normal text-[#131313] tracking-[0.5px] hover:text-[#E60000] transition-colors">Terms of Use</Link>
                                        </li>
                                    </ul>
                                    <p className="text-[16px] font-light leading-normal text-[#131313] tracking-[0.5px] mt-[10px] mb-0">Copyright 2023 Tasty Foods. All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthPage;