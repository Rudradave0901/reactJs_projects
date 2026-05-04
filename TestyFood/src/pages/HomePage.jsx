import React from 'react';
import FoodSlider from '../components/FoodSlider';
import PopularFoods from '../components/PopularFoods';
import DiscountSection from '../components/DiscountSection';
import HomeAboutSection from '../components/HomeAboutSection';
import FastDeliverySection from '../components/FastDeliverySection';
import CustomerFeedbacksSection from '../components/CustomerFeedbacksSection';
import LatestNewsSection from '../components/LatestNewsSection';
import FoodsGallerySection from '../components/FoodsGallerySection';
import HomeBannerSection from '../components/BannerSection';

const HomePage = () => {
  return (
    <>
      <HomeBannerSection />
      <FoodSlider />
      <DiscountSection />
      <HomeAboutSection />
      <FastDeliverySection />
      <PopularFoods />
      <CustomerFeedbacksSection />
      <LatestNewsSection />
      <FoodsGallerySection />
    </>
  )
}

export default HomePage