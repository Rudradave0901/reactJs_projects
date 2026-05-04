import React from 'react';

const AddressCard = ({ address, selectable = false, inputName = "deliveryaddresses" }) => {
    // Both addressLine1 (MyAccount) and street1 (Checkout) variable structures map perfectly
    const line1 = address.addressLine1 || address.street1;
    const line2 = address.addressLine2 || address.street2;

    const addressContent = (
        <>
            <div className={`address-name text-[20px] font-medium leading-none text-[#131313] tracking-[0.5px] mb-0`}>{address.name}</div>
            <div className="address-pera py-1 text-[16px] font-light leading-[1.3] text-[#979797] tracking-[0.2px] mb-0 transition-colors">{address.phone}</div>
            <div className="address-pera text-[16px] font-light leading-[1.3] text-[#979797] tracking-[0.2px] mb-0 transition-colors">
                {line1} <br className="hidden xl:inline-block" />{line2}
            </div>
            <div className="address-action mt-4 relative z-20 flex items-center">
                <a href="#" className="mr-3 inline-block group"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path className="group-hover:stroke-[#E60000] transition-colors" d="M1 4.20007H2.55556H15" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path className="group-hover:stroke-[#E60000] transition-colors" d="M4.88802 4.20008V2.60008C4.88802 2.17573 5.05191 1.76876 5.34363 1.46871C5.63536 1.16865 6.03102 1.00008 6.44358 1.00008H9.55469C9.96725 1.00008 10.3629 1.16865 10.6546 1.46871C10.9464 1.76876 11.1102 2.17573 11.1102 2.60008V4.20008M13.4436 4.20008V15.4001C13.4436 15.8244 13.2797 16.2314 12.988 16.5314C12.6962 16.8315 12.3006 17.0001 11.888 17.0001H4.11024C3.69768 17.0001 3.30202 16.8315 3.0103 16.5314C2.71858 16.2314 2.55469 15.8244 2.55469 15.4001V4.20008H13.4436Z" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path className="group-hover:stroke-[#E60000] transition-colors" d="M6.44531 8.20007V13.0001" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path className="group-hover:stroke-[#E60000] transition-colors" d="M9.55469 8.20007V13.0001" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </svg></a>
                <a href="#" className="mr-3 inline-block group"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path className="group-hover:stroke-[#E60000] transition-colors" d="M8.15659 2.68691H2.59035C2.16857 2.68691 1.76405 2.85447 1.4658 3.15272C1.16755 3.45096 1 3.85548 1 4.27726V15.4097C1 15.8315 1.16755 16.236 1.4658 16.5343C1.76405 16.8325 2.16857 17.0001 2.59035 17.0001H13.7228C14.1446 17.0001 14.5491 16.8325 14.8474 16.5343C15.1456 16.236 15.3132 15.8315 15.3132 15.4097V9.84349" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path className="group-hover:stroke-[#E60000] transition-colors" d="M14.1208 1.49414C14.4372 1.17779 14.8662 1.00008 15.3136 1.00008C15.761 1.00008 16.19 1.17779 16.5064 1.49414C16.8227 1.81048 17.0004 2.23953 17.0004 2.6869C17.0004 3.13427 16.8227 3.56332 16.5064 3.87966L8.95219 11.4338L5.77148 12.229L6.56666 9.0483L14.1208 1.49414Z" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </svg></a>
            </div>
        </>
    );

    if (selectable) {
        return (
            <div className="form-check p-0 m-0 relative h-full">
                <input className="form-check-input peer absolute opacity-0 inset-0 w-full cursor-pointer z-10" type="radio" name={inputName} id={address.id} defaultChecked={address.checked} />
                <label className="form-check-label block p-[25px] px-[20px] border border-[#494949] rounded-[10px] h-full cursor-pointer peer-checked:border-[#E60000] peer-checked:bg-white transition-colors peer-checked:[&_.address-pera]:text-[#131313]" htmlFor={address.id}>
                    {addressContent}
                </label>
            </div>
        );
    }

    return (
        <div className="manage-addresses-wrap transition-all duration-300 ease-in-out hover:shadow-[0px_4px_12px_rgba(0,0,0,0.1)] hover:border-[#E60000] p-[25px_30px] border border-[#E7E8E8] rounded-[10px] h-[calc(100%-24px)] mb-[24px]">
            {addressContent}
        </div>
    );
};

export default AddressCard;
