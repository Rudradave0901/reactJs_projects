import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonBanner from '../components/CommonBanner';
import Container from '../components/Container';
import FoodCard from '../components/FoodCard';
import AddressCard from '../components/AddressCard';
import { PAST_ORDERS_DATA, ADDRESSES_DATA } from '../Constants';
import { getCurrentUser, logoutUser, getWishlistItems, WISHLIST_UPDATED_EVENT } from '../utils/localStorage';

const MyAccount = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const [activeTab, setActiveTab] = useState('account');
    const [savedFoods, setSavedFoods] = useState(() => getWishlistItems());

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        const syncWishlist = () => setSavedFoods(getWishlistItems());
        window.addEventListener(WISHLIST_UPDATED_EVENT, syncWishlist);
        return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, syncWishlist);
    }, []);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <>
            <CommonBanner
                sectionTitle='My Account'
                sectionTitleRed=''
                currentPage='My Account'
                classForStyle=''
            />

            <section className="my-account-section py-[50px] pb-[100px]">
                <Container>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-1/4 px-4">
                            <div className="flex lg:flex-col lg:space-y-2 nav-pills bg-[#E7E8E8] p-[10px] pl-[10px] pr-none rounded-[10px] lg:rounded-r-none lg:min-h-[432px] sticky top-[140px] max-[520px]:flex-wrap">
                                <button className={`nav-link w-full transition-colors duration-300 text-[16px] md:text-[18px] lg:text-[22px] font-medium leading-none tracking-[0.5px] bg-transparent text-center lg:text-left rounded-[10px] lg:rounded-r-none p-[14px] md:p-[18px] lg:p-[23px] relative cursor-pointer hover:bg-white hover:text-[#E60000] max-[520px]:w-1/2 ${activeTab === 'account' ? 'active bg-white text-[#E60000]' : 'text-[#131313]'}`} onClick={() => setActiveTab('account')}>My Account</button>
                                <button className={`nav-link w-full transition-colors duration-300 text-[16px] md:text-[18px] lg:text-[22px] font-medium leading-none tracking-[0.5px] bg-transparent text-center lg:text-left rounded-[10px] lg:rounded-r-none p-[14px] md:p-[18px] lg:p-[23px] relative cursor-pointer hover:bg-white hover:text-[#E60000] max-[520px]:w-1/2 ${activeTab === 'orders' ? 'active bg-white text-[#E60000]' : 'text-[#131313]'}`} onClick={() => setActiveTab('orders')}>My Orders</button>
                                <button className={`nav-link w-full transition-colors duration-300 text-[16px] md:text-[18px] lg:text-[22px] font-medium leading-none tracking-[0.5px] bg-transparent text-center lg:text-left rounded-[10px] lg:rounded-r-none p-[14px] md:p-[18px] lg:p-[23px] relative cursor-pointer hover:bg-white hover:text-[#E60000] max-[520px]:w-1/2 ${activeTab === 'address' ? 'active bg-white text-[#E60000]' : 'text-[#131313]'}`} onClick={() => setActiveTab('address')}>Address</button>
                                <button className={`nav-link w-full transition-colors duration-300 text-[16px] md:text-[18px] lg:text-[22px] font-medium leading-none tracking-[0.5px] bg-transparent text-center lg:text-left rounded-[10px] lg:rounded-r-none p-[14px] md:p-[18px] lg:p-[23px] relative cursor-pointer hover:bg-white hover:text-[#E60000] max-[520px]:w-1/2 ${activeTab === 'bookmark' ? 'active bg-white text-[#E60000]' : 'text-[#131313]'}`} onClick={() => setActiveTab('bookmark')}>Book Mark</button>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/4 px-4 mt-6 lg:mt-0">
                            <div className="tab-content pl-0 lg:pl-[25px] h-full">
                                {activeTab === 'account' && (
                                    <div>
                                        <h3 className="tab-pane-title shadow-sm z-3 font-['Outfit',sans-serif] text-[22px] font-medium leading-none text-[#131313] tracking-[0.5px] border-b border-[rgba(19,19,19,0.10)] pb-[17px] mb-[20px]">My Account</h3>
                                        <form className="editaccountinfo">
                                            <div className="flex flex-wrap -mx-4">
                                                <div className="w-full px-4">
                                                    <div className="input-group-wrap">
                                                        <label htmlFor="fname" className='mr-4'>First Name</label>
                                                        <input type="text" id="fname" className="form-control max-[500px]:w-full" name="fname" value={currentUser?.fname || ''} readOnly />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4">
                                                    <div className="input-group-wrap">
                                                        <label htmlFor="lname" className='mr-4'>Last Name</label>
                                                        <input type="text" id="lname" className="form-control max-[500px]:w-full" name="lname" value={currentUser?.lname || ''} readOnly />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4">
                                                    <div className="input-group-wrap">
                                                        <label htmlFor="number" className='mr-4'>Phone Number</label>
                                                        <input type="text" id="number" className="form-control max-[500px]:w-full" name="number" value={currentUser?.phone || ''} readOnly />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4">
                                                    <div className="input-group-wrap">
                                                        <label htmlFor="email" className='mr-4'>Email Address</label>
                                                        <input type="text" id="email" className="form-control max-[500px]:w-full" name="email" value={currentUser?.email || ''} readOnly />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4">
                                                    <div className="input-group-wrap mt-4 mb-0">
                                                        <button type="button" className="btn btn-danger" onClick={handleLogout}><span>Logout</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                                {activeTab === 'orders' && (
                                    <div>
                                        <h3 className="tab-pane-title shadow-sm z-3 font-['Outfit',sans-serif] text-[22px] font-medium leading-none text-[#131313] tracking-[0.5px] border-b border-[rgba(19,19,19,0.10)] pb-[17px] mb-[20px]">Past Orders</h3>
                                        <div className="flex flex-wrap -mx-4">
                                            {PAST_ORDERS_DATA.map((order) => (
                                                <div key={order.id} className="w-full px-4">
                                                    <div className="past-orders-box-wrap p-[30px] rounded-[10px] border border-[#E7E8E8] bg-[#F9F9F9] mb-[20px]">
                                                        <div className="orders-delivered flex flex-col sm:flex-row sm:items-center justify-between border-b border-dashed border-[rgba(19,19,19,0.3)] pb-[20px] mb-[20px]">
                                                            <div className="delivered-pera flex flex-col sm:flex-row items-baseline sm:items-center gap-1 text-[18px] sm:text-[20px] font-semibold leading-none text-[#60B246] tracking-[0.5px] mr-[10px]">
                                                                <div className='flex items-center gap-2'>
                                                                    <img src="/icons/check-icon-green.svg" alt="Orders Delivered" className="max-sm:w-6" />{order.status}
                                                                </div>
                                                                <span className="text-[14px] sm:text-[16px] font-light text-[#989898] tracking-[0.2px] ml-[10px] leading-normal">{order.statusDate}</span>
                                                            </div>
                                                            <div className="delivered-ammount text-[16px] font-light leading-none text-[#989898] tracking-[0.2px] ml-[10px]">Total:<span className="text-[20px] font-semibold leading-none text-[#131313] tracking-[0.5px] ml-[10px]">{order.total}</span></div>
                                                        </div>
                                                        <div className="delivered-orders-info flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4">
                                                            <div className="orders-info-inner flex items-center mr-[10px] max-[520px]:flex-col max-[520px]:items-baseline max-[520px]:gap-3">
                                                                <img src={order.image} alt="Orders Info" width="70" height="70" className="min-w-[70px] rounded-[5px] overflow-hidden mr-[15px]" />
                                                                <div className="order-information">
                                                                    <div className="order-title text-[18px] font-medium leading-normal text-[#131313] tracking-[0.5px] mb-0">{order.title}</div>
                                                                    <p className="order-pera text-[16px] font-normal leading-none text-[#131313] tracking-[0.2px] my-[5px] mb-[8px]">{order.qtyText}</p>
                                                                    <div className="order-number text-[14px] font-normal leading-normal text-[#474747] tracking-[0.2px] mb-0">{order.orderInfo}</div>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-primary ml-[10px] flex items-center justify-center"><span>Reorder</span></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'address' && (
                                    <div>
                                        <h3 className="tab-pane-title shadow-sm z-3 font-['Outfit',sans-serif] text-[22px] font-medium leading-none text-[#131313] tracking-[0.5px] border-b border-[rgba(19,19,19,0.10)] pb-[17px] mb-[20px]">Manage Addresses</h3>
                                        <div className="flex flex-wrap -mx-4">
                                            {ADDRESSES_DATA.map((address) => (
                                                <div key={address.id} className="w-full lg:w-1/2 px-4">
                                                    <AddressCard address={address} selectable={false} />
                                                </div>
                                            ))}
                                            <div className="w-full px-4">
                                                <button className="btn btn-danger mt-4"><span>Add New</span></button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                 {activeTab === 'bookmark' && (
                                    <div>
                                        <h3 className="tab-pane-title shadow-sm z-3 font-['Outfit',sans-serif] text-[22px] font-medium leading-none text-[#131313] tracking-[0.5px] border-b border-[rgba(19,19,19,0.10)] pb-[17px] mb-[20px]">Your Saved Foods</h3>
                                        {!savedFoods.length && (
                                            <div className="text-center text-[18px] text-[#636363] py-10">
                                                You haven't bookmarked any items yet.
                                            </div>
                                        )}
                                        <div className="flex flex-wrap -mx-4 p-0 popular-foods-section [&_.foods-box-content-wrap]:px-[20px]">
                                            {savedFoods.map((food, index) => (
                                                <div key={food.id} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/3 px-4">
                                                    <FoodCard food={food} index={index} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default MyAccount;
