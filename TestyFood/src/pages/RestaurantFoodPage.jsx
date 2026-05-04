import React from 'react'
import PopularFoods from '../components/PopularFoods'
import CommonBanner from '../components/CommonBanner'
import FastDeliverySection from '../components/FastDeliverySection'
import FoodsGallerySection from '../components/FoodsGallerySection'

const RestaurantFoodPage = () => {
    return (
        <>
            <CommonBanner
                sectionTitle='Foods'
                sectionTitleRed=''
                currentPage='Foods List'
                classForStyle=''
            />

            <div className="restaurant-food-menu-section">
                <PopularFoods />
            </div>

            <FastDeliverySection />
            <FoodsGallerySection />
        </>
    )
}

export default RestaurantFoodPage