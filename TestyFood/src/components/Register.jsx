import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveUser } from '../utils/localStorage';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
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
        setMessage('');
        const nextErrors = {};

        if (!formData.fname.trim()) {
            nextErrors.fname = 'Please enter your first name.';
        }

        if (!formData.lname.trim()) {
            nextErrors.lname = 'Please enter your last name.';
        }

        if (!formData.phone.trim()) {
            nextErrors.phone = 'Please enter your phone number.';
        }

        if (!formData.email.trim()) {
            nextErrors.email = 'Please enter your email address.';
        } else if (!isValidEmail(formData.email)) {
            nextErrors.email = 'Please enter a valid email address.';
        }

        if (formData.password.length < 6) {
            nextErrors.password = 'Password must be at least 6 characters.';
        }

        if (formData.password !== formData.confirmPassword) {
            nextErrors.confirmPassword = 'Password and confirm password must match.';
        }

        if (!formData.terms) {
            nextErrors.terms = 'Please accept the terms and conditions.';
        }

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const result = saveUser({
            fname: formData.fname.trim(),
            lname: formData.lname.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            password: formData.password,
        });

        if (!result.ok) {
            setErrors({ email: result.message });
            return;
        }

        setErrors({});
        setMessage(`Account request submitted for ${formData.fname} ${formData.lname}.`);
        setFormData({
            fname: '',
            lname: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        });
        setTimeout(() => navigate('/login'), 900);
    };

    return (
        <form className="pt-6 max-w-[580px] mx-auto" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="col-span-1">
                    <div className="flex flex-col">
                        <label htmlFor="fname" className="text-[20px] font-medium text-[#131313] mb-1">First Name*</label>
                        <input type="text" id="fname" className="w-full p-[16px_30px] border border-[#D4D4D4] bg-[#E7E8E8] rounded-md focus:outline-none focus:border-[#E60000] transition-colors" name="fname" value={formData.fname} onChange={handleChange} />
                        {errors.fname && <span className="mt-1 text-[14px] text-[#E60000]">{errors.fname}</span>}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-col">
                        <label htmlFor="lname" className="text-[20px] font-medium text-[#131313] mb-1">Last Name*</label>
                        <input type="text" id="lname" className="w-full p-[16px_30px] border border-[#D4D4D4] bg-[#E7E8E8] rounded-md focus:outline-none focus:border-[#E60000] transition-colors" name="lname" value={formData.lname} onChange={handleChange} />
                        {errors.lname && <span className="mt-1 text-[14px] text-[#E60000]">{errors.lname}</span>}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-col">
                        <label htmlFor="phoneno" className="text-[20px] font-medium text-[#131313] mb-1">Phone*</label>
                        <input type="tel" id="phoneno" className="w-full p-[16px_30px] border border-[#D4D4D4] bg-[#E7E8E8] rounded-md focus:outline-none focus:border-[#E60000] transition-colors" name="phone" value={formData.phone} onChange={handleChange} />
                        {errors.phone && <span className="mt-1 text-[14px] text-[#E60000]">{errors.phone}</span>}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-col">
                        <label htmlFor="emailadd" className="text-[20px] font-medium text-[#131313] mb-1">Email*</label>
                        <input type="text" id="emailadd" className="w-full p-[16px_30px] border border-[#D4D4D4] bg-[#E7E8E8] rounded-md focus:outline-none focus:border-[#E60000] transition-colors" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <span className="mt-1 text-[14px] text-[#E60000]">{errors.email}</span>}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-[20px] font-medium text-[#131313] mb-1">Password*</label>
                        <input type="password" id="password" className="w-full p-[16px_30px] border border-[#D4D4D4] bg-[#E7E8E8] rounded-md focus:outline-none focus:border-[#E60000] transition-colors" name="password" value={formData.password} onChange={handleChange} />
                        {errors.password && <span className="mt-1 text-[14px] text-[#E60000]">{errors.password}</span>}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex flex-col">
                        <label htmlFor="cmfpassword" className="text-[20px] font-medium text-[#131313] mb-1">Confirm Password*</label>
                        <input type="password" id="cmfpassword" className="w-full p-[16px_30px] border border-[#D4D4D4] bg-[#E7E8E8] rounded-md focus:outline-none focus:border-[#E60000] transition-colors" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        {errors.confirmPassword && <span className="mt-1 text-[14px] text-[#E60000]">{errors.confirmPassword}</span>}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center justify-center md:justify-start py-[10px] pb-[30px]">
                        <input className="w-[20px] h-[20px] border border-[#E7E8E8] bg-[#E7E8E8] rounded-[3px] cursor-pointer accent-[#E60000]" type="checkbox" id="flexCheckDefault" name="terms" checked={formData.terms} onChange={handleChange} />
                        <label className="text-[16px] font-light leading-[1.5] text-[#131313] ml-2 cursor-pointer" htmlFor="flexCheckDefault">
                            I've read and accept the <Link to="/terms-and-conditions" className="text-[#131313] underline hover:text-[#E60000]">Terms &amp; Conditions</Link>
                        </label>
                    </div>
                    {errors.terms && <span className="block -mt-6 pb-4 text-[14px] text-[#E60000]">{errors.terms}</span>}
                </div>
                {message && (
                    <div className="col-span-1 md:col-span-2 text-center text-[16px] text-[#60B246]">
                        {message}
                    </div>
                )}
                <div className="col-span-1 md:col-span-2">
                    <div className="mb-0 text-center flex justify-center">
                        <button className="btn btn-primary btn-hover-1 w-full max-w-[580px]">
                            <span>Create Account</span>
                        </button>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 text-center mt-4 mb-5">
                    <div className="mb-0">
                        <p className="text-[18px] mb-0">Already have an account? <Link to="/login" className="font-medium text-[#E60000] underline hover:text-black">Login</Link></p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;
