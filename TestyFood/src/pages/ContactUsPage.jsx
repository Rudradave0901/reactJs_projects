import React, { useState } from 'react';
import CommonBanner from '../components/CommonBanner';
import Container from '../components/Container';
import { images } from '../Constants';

const contactDetails = [
    {
        id: "email",
        icon: images.emailIcon,
        iconWidth: "30",
        iconHeight: "24",
        title: "Email",
        pera: "Our friendly team is here to help.",
        linkText: "tastyfoods@gmail.com",
        linkHref: "mailto:tastyfoods@gmail.com"
    },
    {
        id: "office",
        icon: images.locationIcon,
        iconWidth: "24",
        iconHeight: "28",
        title: "Office",
        pera: "Come say hello at our office HQ.",
        linkText: <>3847 Hummingbird Way <br />Quincy, MA 02169</>,
        linkHref: "#"
    },
    {
        id: "phone",
        icon: images.phoneIcon,
        iconWidth: "29",
        iconHeight: "29",
        title: "Phone",
        pera: "Faucibus neque vel risus turpis.",
        linkText: "+1-555-157-5651",
        linkHref: "tel:+15551575651"
    }
];

const formFields = [
    { id: "fname", label: "First Name", type: "text", name: "fname" },
    { id: "lname", label: "Last Name", type: "text", name: "lname" },
    { id: "email", label: "Email Address", type: "text", name: "email" },
    { id: "number", label: "Phone Number", type: "tel", name: "number" }
];

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        number: '',
        message: '',
    });
    const [submitMessage, setSubmitMessage] = useState('');
    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = {};

        if (!formData.fname.trim()) {
            nextErrors.fname = 'Please enter your first name.';
        }

        if (!formData.lname.trim()) {
            nextErrors.lname = 'Please enter your last name.';
        }

        if (!formData.email.trim()) {
            nextErrors.email = 'Please enter your email address.';
        } else if (!isValidEmail(formData.email)) {
            nextErrors.email = 'Please enter a valid email address.';
        }

        if (!formData.number.trim()) {
            nextErrors.number = 'Please enter your phone number.';
        }

        if (!formData.message.trim()) {
            nextErrors.message = 'Please enter your message.';
        }

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            setSubmitMessage('');
            return;
        }

        setErrors({});
        setSubmitMessage(`Thanks ${formData.fname}, your message has been submitted.`);
        setFormData({
            fname: '',
            lname: '',
            email: '',
            number: '',
            message: '',
        });
    };

    return (
        <>
            <CommonBanner
                sectionTitle='Contact'
                sectionTitleRed='Us'
                currentPage='Contact Us'
                classForStyle=''
            />

            <section className="contact-us-section">
                <Container>
                    <div className="w-full text-center">
                        <h2 className="section-title">We’d love to hear from you</h2>
                        <p className="content-pera">Porta enim vitae volutpat donec dictumst eu mi gravida sit.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                        {contactDetails.map((contact) => (
                            <div key={contact.id} className="text-center p-4 flex flex-col items-center">
                                <div className="img-wrapper flex items-center justify-center">
                                    <img src={contact.icon} className="img-black" alt={`${contact.title} Icon`} width={contact.iconWidth} height={contact.iconHeight} />
                                </div>
                                <div className="contact-title">{contact.title}</div>
                                <p className="contact-pera">{contact.pera}</p>
                                <a href={contact.linkHref} className="contact-link" target="_blank" rel="noreferrer">
                                    {contact.linkText}
                                </a>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="contact-form-section">
                <Container>
                    <div className="w-full text-center">
                        <h2 className="section-title">Get in touch</h2>
                        <p className="content-pera">We'd love to hear from you. Please fill out this form.</p>
                    </div>
                    <div>
                        <form className="Contactusform" onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {formFields.map((field) => (
                                    <div key={field.id} className="col-span-1">
                                        <div className="input-group-wrap flex flex-col">
                                            <label htmlFor={field.id} className="mb-2 block">{field.label}</label>
                                            <input type={field.type} id={field.id} className="form-control w-full" name={field.name} value={formData[field.name]} onChange={handleChange} />
                                            {errors[field.name] && <span className="mt-1 text-[14px] text-[#E60000]">{errors[field.name]}</span>}
                                        </div>
                                    </div>
                                ))}
                                <div className="col-span-1 md:col-span-2">
                                    <div className="input-group-wrap flex flex-col">
                                        <label htmlFor="message" className="mb-2 block">Message</label>
                                        <textarea id="message" className="form-control w-full min-h-[120px]" name="message" value={formData.message} onChange={handleChange}></textarea>
                                        {errors.message && <span className="mt-1 text-[14px] text-[#E60000]">{errors.message}</span>}
                                    </div>
                                </div>
                                {submitMessage && (
                                    <div className="col-span-1 md:col-span-2 text-center text-[16px] text-[#60B246]">
                                        {submitMessage}
                                    </div>
                                )}
                                <div className="col-span-1 md:col-span-2">
                                    <div className="input-group-wrap text-center mt-4 mb-0">
                                        <button type="submit" className="btn btn-primary red-button btn-hover-1">
                                            <span>Send Message</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Container>
            </section>
        </>
    );
}

export default ContactUsPage;
