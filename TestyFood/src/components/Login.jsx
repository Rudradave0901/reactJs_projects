import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/localStorage';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = {};

        if (!formData.email.trim()) {
            nextErrors.email = 'Please enter your email address.';
        } else if (!isValidEmail(formData.email)) {
            nextErrors.email = 'Please enter a valid email address.';
        }

        if (!formData.password.trim()) {
            nextErrors.password = 'Please enter your password.';
        } else if (formData.password.length < 6) {
            nextErrors.password = 'Password must be at least 6 characters.';
        }

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            setMessage('');
            return;
        }

        const result = loginUser(formData.email, formData.password);

        if (!result.ok) {
            setErrors({ password: result.message });
            setMessage('');
            return;
        }

        setErrors({});
        setMessage(`Welcome back, ${result.user.fname}. Login submitted successfully.`);
        setTimeout(() => navigate('/myaccount'), 600);
    };

    return (
        <form className="pt-6 max-w-[450px] mx-auto" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="col-span-1 sm:col-span-2">
                    <div className="flex flex-col">
                        <label htmlFor="emailadd" className="text-[20px] font-medium text-[#131313] mb-1">Email*</label>
                        <input type="text" id="emailadd" className="w-full p-[16px_30px] border border-[#D4D4D4] bg-[#E7E8E8] rounded-md focus:outline-none focus:border-[#E60000] transition-colors" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <span className="mt-1 text-[14px] text-[#E60000]">{errors.email}</span>}
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2">
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-[20px] font-medium text-[#131313] mb-1">Password*</label>
                        <input type="password" id="password" className="w-full p-[16px_30px] border border-[#D4D4D4] bg-[#E7E8E8] rounded-md focus:outline-none focus:border-[#E60000] transition-colors" name="password" value={formData.password} onChange={handleChange} />
                        {errors.password && <span className="mt-1 text-[14px] text-[#E60000]">{errors.password}</span>}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex items-center justify-center sm:justify-start py-[10px] pb-[30px]">
                        <input className="w-[20px] h-[20px] border border-[#E7E8E8] bg-[#E7E8E8] rounded-[3px] cursor-pointer accent-[#E60000]" type="checkbox" id="flexCheckDefault" name="remember" checked={formData.remember} onChange={handleChange} />
                        <label className="text-[16px] font-light leading-normal text-[#131313] ml-2 cursor-pointer" htmlFor="flexCheckDefault">Remember me</label>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex items-center justify-center sm:justify-end py-[10px] pb-[30px]">
                        <Link to="/forgot-password" title="Recovery Password" className="text-[16px] font-normal leading-none text-[#131313] tracking-[0.2px] hover:text-[#E60000] hover:underline">Recovery Password</Link>
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2">
                    <div className="mb-0 text-center flex justify-center">
                        <button className="btn btn-primary btn-hover-1 w-full max-w-[450px]">
                            <span>Login</span>
                        </button>
                    </div>
                </div>
                {message && (
                    <div className="col-span-1 sm:col-span-2 text-center text-[16px] text-[#60B246]">
                        {message}
                    </div>
                )}
                <div className="col-span-1 sm:col-span-2 text-center mt-4 mb-5">
                    <div className="mb-0">
                        <p className="text-[18px] mb-0">You don't have an account then <Link to="/register" className="font-medium text-[#E60000] underline hover:text-black">Register</Link> now</p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
