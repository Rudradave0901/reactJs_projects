import React, { useEffect, useState } from 'react'
import CommonBanner from '../components/CommonBanner'
import FastDeliverySection from '../components/FastDeliverySection'
import FoodsGallerySection from '../components/FoodsGallerySection'
import Container from '../components/Container'
import { getFoodMenuSections } from '../api/themealdb'

const FastFoodMenuPage = () => {
  const [menuSections, setMenuSections] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadMenu = async () => {
      setIsLoading(true)
      setError('')

      try {
        const sections = await getFoodMenuSections(8, controller.signal)
        setMenuSections(sections)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Menu data load thata problem aavyo. Please thodi vaar pachi try karo.')
          setMenuSections([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadMenu()

    return () => controller.abort()
  }, [])

  return (
    <>
      <CommonBanner
        sectionTitle='Fast Food'
        sectionTitleRed='Menu'
        currentPage='Fast Food Menu'
        classForStyle=''
      />

      <section className="fast-food-menu-section py-10 md:py-[50px]">
        <Container>
          {isLoading && (
            <div className="text-center text-[18px] text-[#636363] py-8">
              Loading menu...
            </div>
          )}

          {!isLoading && error && (
            <div className="text-center text-[18px] text-[#E60000] py-4">
              {error}
            </div>
          )}

          {menuSections.map((section, index) => (
            <div key={index}>

              {/* Title */}
              <div className="flex flex-wrap">
                <div className="w-full text-center">
                  <div className="fast-food-title-wrap">
                    <h2 className="section-title mt-8 md:mt-10 mb-6 md:mb-8 text-[32px] sm:text-[38px] md:text-[42px] lg:text-[46px]">{section.category}</h2>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-wrap md:flex-nowrap ms:gap-8">
                {[0, 1].map((col) => {
                  const half = Math.ceil(section.items.length / 2);
                  const items =
                    col === 0
                      ? section.items.slice(0, half)
                      : section.items.slice(half);

                  return (
                    <div key={col} className={`w-full`} >
                      {items.map((item, i) => (
                        <div className="food-menu-item mb-6 md:mb-[30px]" key={i}>
                          <div className="food-menu-top-wrap flex justify-between items-end relative mb-2">
                            <div className="menu-item-name text-[18px] md:text-[20px] font-bold leading-none text-[#131313] bg-white pr-2.5">{item.name}</div>
                            <div className="menu-item-price text-[18px] md:text-[20px] font-black leading-none text-[#E60000] bg-white pl-2.5">{item.price}</div>
                          </div>
                          <p className="menu-item-description content-pera text-[14px] md:text-[16px] font-light leading-normal text-[#747474] tracking-[0.2px] mb-0">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </Container>
      </section>


      <FastDeliverySection />
      <FoodsGallerySection />
    </>
  )
}

export default FastFoodMenuPage
