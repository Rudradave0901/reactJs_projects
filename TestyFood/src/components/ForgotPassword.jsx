import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = {};

        if (!email.trim()) {
            nextErrors.email = 'Please enter your email address.';
        } else if (!isValidEmail(email)) {
            nextErrors.email = 'Please enter a valid email address.';
        }

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            setMessage('');
            return;
        }

        setErrors({});
        setMessage(`Password reset link sent to ${email}.`);
    };

    return (
        <form className="pt-6 max-w-[450px] mx-auto" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-4 text-left">
                <div className="col-span-1">
                    <div className="flex flex-col">
                        <label htmlFor="emailadd" className="text-[20px] font-medium text-[#131313] mb-1">Email*</label>
                        <input type="text" id="emailadd" className="w-full p-[16px_30px] border border-[#D4D4D4] bg-[#E7E8E8] rounded-md focus:outline-none focus:border-[#E60000] transition-colors" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        {errors.email && <span className="mt-1 text-[14px] text-[#E60000]">{errors.email}</span>}
                    </div>
                </div>
                {message && (
                    <div className="col-span-1 text-center text-[16px] text-[#60B246]">
                        {message}
                    </div>
                )}
                <div className="col-span-1 border-0">
                    <div className="mb-0 text-center flex justify-center">
                        <button className="btn btn-primary btn-hover-1 w-full max-w-[450px]">
                            <span>Reset Password</span>
                        </button>
                    </div>
                </div>
                <div className="col-span-1 mt-3">
                    <div className="mb-0 text-center flex justify-center">
                        <Link to="/login" className="btn btn-primary bg-white border border-[#131313] hover:bg-black group transition-all duration-300 inline-flex items-center justify-center w-full max-w-[450px] py-[15px] rounded-full">
                            <span className="flex items-center text-[#131313] group-hover:text-white transition-colors">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 inline-block">
                                    <path d="M16 9C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7L16 9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928933C7.68054 0.538409 7.04738 0.538409 6.65685 0.928933L0.292892 7.29289ZM16 7L0.999999 7L0.999999 9L16 9L16 7Z" fill="currentColor"></path>
                                </svg>
                                Back to Login
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="col-span-1 text-center mt-5 mb-5">
                    <div className="mb-0">
                        <p className="text-[18px] mb-0">You don't have an account then <Link to="/register" className="font-medium text-[#E60000] underline hover:text-black">Register</Link> now</p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ForgotPassword;
