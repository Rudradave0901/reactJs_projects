import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CartCalculation from '../components/CartCalculation';
import AddressCard from '../components/AddressCard';
import {
    CART_UPDATED_EVENT,
    formatCurrency,
    getCartItems,
    getCartTotals,
    getCurrentUser
} from '../utils/localStorage';


const addresses = [
    {
        id: "addresses",
        name: "Teodoro M. Mason",
        phone: "847-757-7838",
        street1: "1875 Rebecca StreetArlington Heights, IL",
        street2: "60004",
        checked: true
    },
    {
        id: "addresses2",
        name: "Teodoro M. Mason",
        phone: "847-757-7838",
        street1: "1875 Rebecca StreetArlington Heights, IL",
        street2: "60004",
        checked: false
    }
];

const paymentMethods = [
    {
        id: "flexRadioDefault1",
        label: "Direct bank transfer",
        desc: "Imperdiet lectus convallis mattis vestibulum condimentum morbi. Sit erat cras pharetra mauris convallis at ultrices morbi.",
        checked: true
    },
    {
        id: "flexRadioDefault2",
        label: "Cash on delivery",
        checked: false
    },
    {
        id: "flexRadioDefault3",
        label: "PayPal",
        icon: "/icons/paypal-cards.svg",
        link: "#",
        linkText: "What is PayPal?",
        checked: false,
        extraClass: "mb-0"
    }
];

const Checkout = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const [cartItems, setCartItems] = useState(() => getCartItems());
    const [checkoutData, setCheckoutData] = useState({
        fname: currentUser?.fname || '',
        lname: currentUser?.lname || '',
        contact: currentUser?.phone || '',
        email: currentUser?.email || '',
        country: 'India',
        street: '',
        street2: '',
        townname: 'Ahmedabad',
        state: 'Gujarat',
        zipcode: '',
    });
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
    const [submitMessage, setSubmitMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        const syncCart = () => setCartItems(getCartItems());

        window.addEventListener(CART_UPDATED_EVENT, syncCart);
        window.addEventListener('storage', syncCart);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, syncCart);
            window.removeEventListener('storage', syncCart);
        };
    }, []);

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const validateCheckout = () => {
        const nextErrors = {};

        if (!checkoutData.fname.trim()) nextErrors.fname = 'Please enter your first name.';
        if (!checkoutData.lname.trim()) nextErrors.lname = 'Please enter your last name.';
        if (!checkoutData.contact.trim()) nextErrors.contact = 'Please enter your phone number.';
        if (!checkoutData.email.trim()) {
            nextErrors.email = 'Please enter your email address.';
        } else if (!isValidEmail(checkoutData.email)) {
            nextErrors.email = 'Please enter a valid email address.';
        }
        if (!checkoutData.street.trim()) nextErrors.street = 'Please enter your street address.';
        if (!checkoutData.zipcode.trim()) nextErrors.zipcode = 'Please enter your ZIP code.';

        return nextErrors;
    };

    const handleCheckoutChange = (event) => {
        const { name, value } = event.target;
        setCheckoutData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleCheckoutSubmit = (event) => {
        event.preventDefault();

        const nextErrors = validateCheckout();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            setSubmitMessage('');
            return;
        }

        setErrors({});
        setSubmitMessage(`Address saved for ${checkoutData.fname} ${checkoutData.lname}.`);
    };

    const handlePlaceOrder = () => {
        if (!cartItems.length) {
            setErrors({});
            setSubmitMessage('Your cart is empty. Please add items before checkout.');
            return;
        }

        const form = document.getElementById('checkoutform');

        if (form?.requestSubmit) {
            form.requestSubmit();
            return;
        }

        setSubmitMessage('Please complete the checkout form before placing your order.');
    };

    const { itemTotal, deliveryFee, taxes, grandTotal } = getCartTotals(cartItems);
    const detailedItems = cartItems.map((item) => ({
        title: `${item.title} x ${item.qty}`,
        price: formatCurrency(item.price * item.qty),
    }));

    return (
        <>
            <section className="checkout-section py-[100px] sm:pt-[190px] md:pb-[99px]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                            <div className="cart-list-items-wrap border border-[#E7E8E8] rounded-[10px] overflow-hidden">
                                <ul className="inner-cartlist">
                                    <li className="cart-header text-[18px] font-medium leading-none text-[#131313] tracking-[0.2px] py-[20px] px-[30px] bg-[#E7E8E8]">
                                        <div className="product-heading product-name">Delivery & Billing details</div>
                                    </li>
                                    <li className="cart-row px-[20px] py-[30px] md:px-[30px] md:pb-[50px] bg-white">
                                        <form id="checkoutform" className="checkoutform" onSubmit={handleCheckoutSubmit} noValidate>
                                            <div className="grid grid-cols-1 gap-8">
                                                <div className="col-span-1">
                                                    <div className="manage-addresses-section border-b border-[#E7E8E8] pb-[6px] mb-[30px]">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            {addresses.map((address) => (
                                                                <div key={address.id} className="col-span-1 border border-transparent">
                                                                    <AddressCard address={address} selectable={true} inputName="deliveryaddresses" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-1">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="col-span-1 md:col-span-2">
                                                            <div className="input-group-wrap">
                                                                <h2 className="section-title font-['Outfit',sans-serif] text-[20px] font-medium leading-none tracking-[0.5px] mb-2">Add New Address</h2>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1">
                                                            <div className="input-group-wrap flex flex-col">
                                                                <label htmlFor="fname" className="text-[16px] mb-2">First Name*</label>
                                                                <input type="text" id="fname" name="fname" className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] placeholder:font-light placeholder:text-[#ADADAD] w-full" value={checkoutData.fname} onChange={handleCheckoutChange} />
                                                                {errors.fname && <span className="mt-1 text-[14px] text-[#E60000]">{errors.fname}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1">
                                                            <div className="input-group-wrap flex flex-col">
                                                                <label htmlFor="lname" className="text-[16px] mb-2">Last Name*</label>
                                                                <input type="text" id="lname" name="lname" className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] placeholder:font-light placeholder:text-[#ADADAD] w-full" value={checkoutData.lname} onChange={handleCheckoutChange} />
                                                                {errors.lname && <span className="mt-1 text-[14px] text-[#E60000]">{errors.lname}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1">
                                                            <div className="input-group-wrap flex flex-col">
                                                                <label htmlFor="phoneno" className="text-[16px] mb-2">Phone Number*</label>
                                                                <input type="tel" id="phoneno" name="contact" className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] placeholder:font-light placeholder:text-[#ADADAD] w-full" value={checkoutData.contact} onChange={handleCheckoutChange} />
                                                                {errors.contact && <span className="mt-1 text-[14px] text-[#E60000]">{errors.contact}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1">
                                                            <div className="input-group-wrap flex flex-col">
                                                                <label htmlFor="emailadd" className="text-[16px] mb-2">Email Address*</label>
                                                                <input type="text" id="emailadd" name="email" className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] placeholder:font-light placeholder:text-[#ADADAD] w-full" value={checkoutData.email} onChange={handleCheckoutChange} />
                                                                {errors.email && <span className="mt-1 text-[14px] text-[#E60000]">{errors.email}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1 md:col-span-2">
                                                            <div className="input-group-wrap flex flex-col">
                                                                <label htmlFor="country" className="text-[16px] mb-2">Country*</label>
                                                                <select className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] bg-[url('/menu-arrow.svg')] bg-no-repeat bg-[right_20px_center] w-full appearance-none" id="country" name="country" value={checkoutData.country} onChange={handleCheckoutChange}>
                                                                    <option>India</option>
                                                                    <option>United States</option>
                                                                    <option>United Kingdom</option>
                                                                    <option>Nepal</option>
                                                                    <option>Morocco</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1 md:col-span-2">
                                                            <div className="input-group-wrap flex flex-col">
                                                                <label htmlFor="street" className="text-[16px] mb-2">Street address*</label>
                                                                <input type="text" id="street" className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] placeholder:font-light placeholder:text-[#ADADAD] w-full mb-4" name="street" placeholder="House number and street name" value={checkoutData.street} onChange={handleCheckoutChange} />
                                                                {errors.street && <span className="-mt-3 mb-3 text-[14px] text-[#E60000]">{errors.street}</span>}
                                                                <input type="text" id="street1" className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] placeholder:font-light placeholder:text-[#ADADAD] w-full" name="street2" placeholder="Apartment, suite, unit. etc.(optional)" value={checkoutData.street2} onChange={handleCheckoutChange} />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1 md:col-span-2">
                                                            <div className="input-group-wrap flex flex-col">
                                                                <label htmlFor="townname" className="text-[16px] mb-2">Town / City*</label>
                                                                <select className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] bg-[url('/menu-arrow.svg')] bg-no-repeat bg-[right_20px_center] w-full appearance-none" id="townname" name="townname" value={checkoutData.townname} onChange={handleCheckoutChange}>
                                                                    <option>Ahmedabad</option>
                                                                    <option>Chennai</option>
                                                                    <option>Kolkata</option>
                                                                    <option>Pune</option>
                                                                    <option>Mangalore</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1 md:col-span-2">
                                                            <div className="input-group-wrap flex flex-col">
                                                                <label htmlFor="state" className="text-[16px] mb-2">State*</label>
                                                                <select className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] bg-[url('/menu-arrow.svg')] bg-no-repeat bg-[right_20px_center] w-full appearance-none" name="state" id="state" value={checkoutData.state} onChange={handleCheckoutChange}>
                                                                    <option>Gujarat</option>
                                                                    <option>Uttar Pradesh</option>
                                                                    <option>Maharashtra</option>
                                                                    <option>Odisha</option>
                                                                    <option>Rajasthan</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1 md:col-span-2">
                                                            <div className="input-group-wrap flex flex-col">
                                                                <label htmlFor="zipcode" className="text-[16px] mb-2">ZIP Code</label>
                                                                <input type="text" id="zipcode" className="form-control text-[16px] py-[6px] pl-[20px] pr-[30px] bg-[#FAFAFA] placeholder:font-light placeholder:text-[#ADADAD] w-full" name="zipcode" placeholder="ZIP Code" value={checkoutData.zipcode} onChange={handleCheckoutChange} />
                                                                {errors.zipcode && <span className="mt-1 text-[14px] text-[#E60000]">{errors.zipcode}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1 md:col-span-2">
                                                            <div className="input-group-wrap mt-4">
                                                                <button type="submit" className="btn btn-danger newaddress text-[18px] py-[10px] px-[30px]"><span>Add New Address</span></button>
                                                            </div>
                                                        </div>
                                                        {submitMessage && (
                                                            <div className="col-span-1 md:col-span-2 text-[16px] text-[#60B246]">
                                                                {submitMessage}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="lg:col-span-4 mt-8 lg:mt-0">
                            <CartCalculation
                                title="Your order"
                                detailedItems={detailedItems}
                                isBold={false}
                                summaryItems={[
                                    { label: "Item Total", value: formatCurrency(itemTotal) },
                                    { label: "Delivery Fee", value: formatCurrency(deliveryFee) },
                                    { label: "Govt Taxes & Other Charges", value: formatCurrency(taxes) }
                                ]}
                                total={formatCurrency(grandTotal)}
                                isCheckout={true}
                                buttonText="Place Order"
                                buttonAction={handlePlaceOrder}
                            >
                                <div className="payment-method-wrap my-6 lg:my-8">
                                    {paymentMethods.map((method, idx) => (
                                        <div key={idx} className={`form-check relative pl-0 mb-[15px] ${method.extraClass || 'mb-4'}`}>
                                            <input className="form-check-input peer absolute opacity-0 w-full h-full cursor-pointer z-20" type="radio" name="paymentMethod" id={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} />
                                            <span className="check-mark absolute top-[3px] left-0 w-[22px] h-[22px] bg-white rounded-full border border-[#CBCBCB] peer-checked:border-[#E60000] after:content-[''] after:absolute after:left-[50%] after:top-[50%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-[8px] after:h-[8px] after:rounded-full after:bg-white peer-checked:after:bg-[#E60000] z-10 transition-colors"></span>
                                            <label className="form-check-label text-[18px] font-medium leading-[1.5] text-black tracking-[0.5px] pl-[35px] relative z-10 cursor-pointer block" htmlFor={method.id}>
                                                {method.label}
                                                {method.desc && <span className="block mt-2 text-[16px] font-light leading-[1.3] text-[#747474] tracking-[0.2px]">{method.desc}</span>}
                                                {method.icon && <img src={method.icon} alt={method.label} className="inline ml-2 my-0 mx-[5px]" />}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </CartCalculation>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Checkout;
