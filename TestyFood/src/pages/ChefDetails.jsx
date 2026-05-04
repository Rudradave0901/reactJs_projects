import Container from "../components/Container"
import FastDeliverySection from "../components/FastDeliverySection"
import CommonBanner from '../components/CommonBanner'
import ChefCard from '../components/ChefCard'
import { CHEFS_DATA } from '../Constants'

const ChefDetails = () => {
    return (
        <>
            <CommonBanner
                sectionTitle='Chef'
                sectionTitleRed='Details'
                currentPage='Chef Details'
                classForStyle=''
            />

            <section className="chef-detail-section py-10 md:pt-[50px] md:pb-[90px]">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-start">
                        <div className="lg:col-span-5 text-center lg:text-left mb-10 lg:mb-0">
                            <div className="chef-details-img-wrap flex justify-center lg:justify-start">
                                <img src="/chef-details.png" alt="Chef Details" className="w-full max-w-[470px] h-auto object-cover" width="470" height="470" />
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="chef-details-content-wrap pl-0 lg:pl-[20px]">
                                <h2 className="section-title text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] font-bold mt-4 lg:mt-[20px] mb-4 lg:mb-[25px]">Roy Hawkins</h2>
                                <p className="content-pera text-[16px] md:text-[18px] text-[#000000] mb-6 lg:mb-[30px]">Lorem cursus faucibus arcu netus imperdiet id faucibus urna odio. Nisi erat massa egestas praesent at odio dignissim. Bibendum egestas habitasse aliquam ultrices nunc vel tortor purus.</p>
                                <ul className="get-in-touch-menu flex flex-col gap-2 lg:gap-4 mb-6 lg:mb-[45px]">
                                    <li className="flex items-start gap-3 mb-[13px]">
                                        <div className="icon-wrap w-[30px] min-w-[30px] h-[30px] bg-[#E60000] rounded-full flex justify-center items-center mr-[15px]"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.5 7.54545C14.5 12.6364 8 17 8 17C8 17 1.5 12.6364 1.5 7.54545C1.5 5.80949 2.18482 4.14463 3.40381 2.91712C4.62279 1.68961 6.27609 1 8 1C9.72391 1 11.3772 1.68961 12.5962 2.91712C13.8152 4.14463 14.5 5.80949 14.5 7.54545Z" stroke="#E7E8E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M7.99999 9.72741C9.19661 9.72741 10.1667 8.75057 10.1667 7.54559C10.1667 6.3406 9.19661 5.36377 7.99999 5.36377C6.80338 5.36377 5.83333 6.3406 5.83333 7.54559C5.83333 8.75057 6.80338 9.72741 7.99999 9.72741Z" stroke="#E7E8E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg></div>
                                        <a href="https://goo.gl/maps/2vmaQHVUTEweUe3aA" target="_blank" rel="noreferrer" className="text-[16px] md:text-[18px] font-light leading-normal text-[#131313] tracking-[0.5px] hover:text-[#E60000] m-0 transition-colors">3847 Hummingbird Way Quincy, MA 02169</a>
                                    </li>
                                    <li className="flex items-center gap-3 mb-[13px]">
                                        <div className="icon-wrap w-[30px] min-w-[30px] h-[30px] bg-[#E60000] rounded-full flex justify-center items-center mr-[15px]"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.55221 3.9847C10.1601 4.10307 10.7188 4.3998 11.1567 4.83691C11.5946 5.27401 11.8919 5.83161 12.0105 6.43833M9.55221 1.5C10.8152 1.64004 11.9929 2.20452 12.892 3.10077C13.7911 3.99702 14.3581 5.17176 14.5 6.43212M13.8776 11.3891V13.2526C13.8783 13.4256 13.8428 13.5968 13.7734 13.7554C13.704 13.9139 13.6021 14.0562 13.4744 14.1731C13.3467 14.2901 13.1959 14.3791 13.0317 14.4345C12.8675 14.4899 12.6935 14.5105 12.5209 14.495C10.6058 14.2873 8.76617 13.6341 7.14989 12.588C5.64615 11.6342 4.37124 10.3618 3.41571 8.86091C2.3639 7.24039 1.70934 5.39538 1.50505 3.47533C1.4895 3.30356 1.50995 3.13043 1.56511 2.96698C1.62027 2.80353 1.70892 2.65333 1.82542 2.52594C1.94193 2.39856 2.08373 2.29679 2.2418 2.2271C2.39987 2.15741 2.57075 2.12134 2.74355 2.12117H4.61065C4.91268 2.11821 5.2055 2.22496 5.43451 2.42153C5.66352 2.6181 5.8131 2.89109 5.85537 3.18959C5.93418 3.78596 6.08033 4.37152 6.29103 4.93509C6.37476 5.15742 6.39288 5.39906 6.34325 5.63135C6.29361 5.86365 6.17829 6.07688 6.01096 6.24577L5.22056 7.03466C6.10653 8.5898 7.39663 9.87743 8.95474 10.7617L9.74514 9.97281C9.91436 9.8058 10.128 9.6907 10.3607 9.64116C10.5935 9.59162 10.8356 9.60971 11.0583 9.69328C11.623 9.90358 12.2097 10.0495 12.8072 10.1281C13.1095 10.1707 13.3856 10.3227 13.583 10.5552C13.7803 10.7877 13.8852 11.0844 13.8776 11.3891Z" stroke="#E7E8E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg></div>
                                        <a href="tel:+15551575651" className="text-[16px] md:text-[18px] font-light leading-normal text-[#131313] tracking-[0.5px] hover:text-[#E60000] m-0 transition-colors">+1-555-157-5651</a>
                                    </li>
                                    <li className="flex items-center gap-3 mb-[13px]">
                                        <div className="icon-wrap w-[30px] min-w-[30px] h-[30px] bg-[#E60000] rounded-full flex justify-center items-center mr-[15px]"><svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.6 1H15.4C16.28 1 17 1.675 17 2.5V11.5C17 12.325 16.28 13 15.4 13H2.6C1.72 13 1 12.325 1 11.5V2.5C1 1.675 1.72 1 2.6 1Z" stroke="#E7E8E8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M17 2.5L9 7.75L1 2.5" stroke="#E7E8E8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg></div>
                                        <a href="mailto:tastyfoods@gmail.com" className="text-[16px] md:text-[18px] font-light leading-normal text-[#131313] tracking-[0.5px] hover:text-[#E60000] m-0 transition-colors">tastyfoods@gmail.com</a>
                                    </li>
                                </ul>
                                <ul className="chef-social-profile flex gap-4">
                                    <li><a href="https://www.facebook.com/" target="_blank" className="social-links w-[49px] h-[49px] border border-[#7C7B7B] rounded-full flex items-center justify-center p-[10px] mr-[15px] hover:bg-[#E60000] hover:border-[#E60000] group transition-all duration-300">
                                        <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg"> <path className="group-hover:fill-white transition-colors" fill-rule="evenodd" clip-rule="evenodd" d="M7.51641 0C7.80793 0.0249539 8.09944 0.0489892 8.39095 0.0750147C8.59224 0.0930795 8.79353 0.114053 9 0.134261C9 1.1442 9 2.13715 9 3.15429C8.93551 3.15429 8.87564 3.15353 8.81578 3.15444C8.2175 3.16378 7.61811 3.15291 7.02095 3.18797C6.29119 3.23068 5.89113 3.65995 5.86203 4.45174C5.83238 5.26037 5.85042 6.07099 5.84832 6.88069C5.84818 6.89783 5.85685 6.91498 5.86651 6.95157C6.86694 6.95157 7.86933 6.95157 8.89761 6.95157C8.76402 8.08674 8.63323 9.19803 8.5002 10.3286C7.61727 10.3286 6.74454 10.3286 5.85951 10.3286C5.85406 10.4013 5.8465 10.4541 5.8465 10.5073C5.84594 13.2952 5.84594 16.0832 5.84636 18.8711C5.84636 18.914 5.85196 18.9571 5.8549 19C4.79235 19 3.73009 19 2.66769 19C2.66475 18.9199 2.65915 18.8399 2.65915 18.7598C2.6586 16.0394 2.65873 13.3191 2.65873 10.5987C2.65873 10.5194 2.65873 10.4402 2.65873 10.3376C1.76573 10.3376 0.88783 10.3376 0 10.3376C0 9.20354 0 8.09302 0 6.95922C0.877759 6.95922 1.75608 6.95922 2.65873 6.95922C2.65873 6.86431 2.65846 6.79251 2.65873 6.72055C2.66209 5.8366 2.64195 4.95128 2.6751 4.06871C2.71539 3.00442 3.0027 2.02831 3.68868 1.23315C4.21044 0.628286 4.86118 0.281994 5.59765 0.115125C5.79517 0.070422 5.99506 0.0381197 6.19397 0C6.63488 0 7.07565 0 7.51641 0Z" fill="#131313" /> </svg></a></li>
                                    <li><a href="https://twitter.com/" target="_blank" className="social-links w-[49px] h-[49px] border border-[#7C7B7B] rounded-full flex items-center justify-center p-[10px] mr-[15px] hover:bg-[#E60000] hover:border-[#E60000] group transition-all duration-300">
                                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path className="group-hover:fill-white transition-colors" d="M18 0.00784565C17.2165 0.534866 16.349 0.937952 15.4309 1.20158C14.9382 0.661287 14.2833 0.278341 13.5548 0.104535C12.8264 -0.0692709 12.0596 -0.0255511 11.3581 0.229782C10.6565 0.485114 10.0542 0.93974 9.63244 1.53217C9.2107 2.1246 8.98993 2.82626 9 3.54224V4.32246C7.56215 4.35801 6.13741 4.05392 4.85264 3.43726C3.56788 2.8206 2.46299 1.91052 1.63636 0.788065C1.63636 0.788065 -1.63636 7.81003 5.72727 10.9309C4.04225 12.0216 2.03495 12.5685 0 12.4913C7.36364 16.3924 16.3636 12.4913 16.3636 3.51883C16.3629 3.3015 16.341 3.08471 16.2982 2.87125C17.1332 2.08595 17.7225 1.09447 18 0.00784565Z" fill="#131313" /> </svg></a></li>
                                    <li><a href="https://www.instagram.com/" target="_blank" className="social-links insta w-[49px] h-[49px] border border-[#7C7B7B] rounded-full flex items-center justify-center p-[10px] mr-[15px] hover:bg-[#E60000] hover:border-[#E60000] group transition-all duration-300">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path className="group-hover:stroke-white transition-colors" d="M14.5 1H5.5C3.01472 1 1 3.01472 1 5.5V14.5C1 16.9853 3.01472 19 5.5 19H14.5C16.9853 19 19 16.9853 19 14.5V5.5C19 3.01472 16.9853 1 14.5 1Z" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path className="group-hover:fill-[#E60000] group-hover:stroke-white transition-colors" d="M13.5995 9.433C13.7106 10.182 13.5827 10.947 13.2339 11.6191C12.8852 12.2912 12.3334 12.8363 11.657 13.1767C10.9806 13.5171 10.2141 13.6356 9.46655 13.5153C8.71895 13.395 8.02833 13.0421 7.4929 12.5066C6.95747 11.9712 6.6045 11.2806 6.4842 10.533C6.3639 9.78539 6.4824 9.0189 6.82283 8.34253C7.16327 7.66617 7.70831 7.11436 8.38043 6.76561C9.05255 6.41686 9.81752 6.28893 10.5665 6.4C11.3306 6.51329 12.0379 6.86931 12.5841 7.41547C13.1302 7.96163 13.4862 8.66897 13.5995 9.433Z" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path className="group-hover:stroke-white transition-colors" d="M14.9502 5.04999H14.9592" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg></a></li>
                                    <li><a href="https://www.linkedin.com/" target="_blank" className="social-links w-[49px] h-[49px] border border-[#7C7B7B] rounded-full flex items-center justify-center p-[10px] mr-[15px] hover:bg-[#E60000] hover:border-[#E60000] group transition-all duration-300">
                                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path className="group-hover:fill-white transition-colors" d="M12.6002 5.36841C14.0324 5.36841 15.4059 5.93401 16.4186 6.94078C17.4313 7.94756 18.0002 9.31304 18.0002 10.7368V17H14.4002V10.7368C14.4002 10.2622 14.2106 9.80707 13.873 9.47148C13.5354 9.13589 13.0776 8.94736 12.6002 8.94736C12.1228 8.94736 11.665 9.13589 11.3274 9.47148C10.9898 9.80707 10.8002 10.2622 10.8002 10.7368V17H7.2002V10.7368C7.2002 9.31304 7.76912 7.94756 8.78182 6.94078C9.79452 5.93401 11.168 5.36841 12.6002 5.36841Z" fill="#131313" /> <path className="group-hover:fill-white transition-colors" d="M3.6 6.26315H0V17H3.6V6.26315Z" fill="#131313" /> <path className="group-hover:fill-white transition-colors" d="M1.8 3.57895C2.79411 3.57895 3.6 2.77777 3.6 1.78947C3.6 0.801175 2.79411 0 1.8 0C0.805887 0 0 0.801175 0 1.78947C0 2.77777 0.805887 3.57895 1.8 3.57895Z" fill="#131313" /> </svg></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <FastDeliverySection />

            <section className="chef-section py-10 md:py-[50px]">
                <Container>
                    <div className="text-center mb-10">
                        <h2 className="section-title">Others <span>Chefs</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                        {CHEFS_DATA.map((chef) => (
                            <ChefCard
                                key={chef.id}
                                name={chef.name}
                                title={chef.title}
                                image={chef.image}
                            />
                        ))}
                    </div>
                </Container>
            </section>

        </>
    )
}

export default ChefDetails