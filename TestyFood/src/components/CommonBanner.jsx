import { Link } from 'react-router-dom'
import Container from './Container'

const CommonBanner = ({ sectionTitle, sectionTitleRed, currentPage, classForStyle }) => {
    return (
        <>
            <section className={`inner-banner-section pt-[120px] pb-[60px] md:pt-[180px] md:pb-[80px] lg:pt-[200px] lg:pb-[110px] ${classForStyle}`}>
                <Container>
                    <div className="text-center">
                        <h1 className="section-title text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px] mb-[10px]">{sectionTitle} <span className="text-[#E60000]">{sectionTitleRed}</span></h1>
                        <ol className="breadcrumb flex justify-center items-center mb-0 text-[#131313] text-[14px] md:text-[16px] font-light leading-[20px] tracking-[0.2px]">
                            <li className="breadcrumb-item">
                                <Link to="/" className='pr-1 transition-colors duration-300 hover:text-[#E60000]'>Home</Link> <span className="mx-1">/</span>
                            </li>
                            <li className="breadcrumb-item active pl-1">{currentPage}</li>
                        </ol>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default CommonBanner