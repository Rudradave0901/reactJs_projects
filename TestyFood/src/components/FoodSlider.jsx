import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "./Container";

const FoodSlider = () => {
    const foodItems = [
        { img: "/slide-1.png", title: "Burger" },
        { img: "/slide-2.png", title: "French Fry" },
        { img: "/slide-3.png", title: "Pasta" },
        { img: "/slide-4.png", title: "Sandwich" },
        { img: "/slide-5.png", title: "Cold Drinks" },
        { img: "/slide-6.png", title: "Combo" },
        { img: "/slide-1.png", title: "Burger" },
        { img: "/slide-2.png", title: "French Fry" },
        { img: "/slide-3.png", title: "Pasta" },
    ];

    return (
        <section className="foods-preview-section bg-[#E7E8E8] relative mb-[60px] py-10">
            <Container>

                <div className="container mx-auto">
                    <div className="w-full">

                        <Swiper
                            modules={[Autoplay]}
                            loop={true}
                            autoplay={{ delay: 2000, disableOnInteraction: false }}
                            spaceBetween={20}
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                481: { slidesPerView: 3 },
                                768: { slidesPerView: 4 },
                                992: { slidesPerView: 5 },
                                1200: { slidesPerView: 6 },
                            }}
                        >
                            {foodItems.map((item, index) => (
                                <SwiperSlide key={index} className="px-0! py-[20px] pb-[10px] group/slide">
                                    <div className="text-center">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="mx-auto w-auto! h-[75px] object-contain mb-[10px] group-hover/slide:animate-[shake_2s]"
                                        />
                                        <h2 className="text-[20px] font-normal leading-none text-center group-hover/slide:text-[#E60000] transition-colors">
                                            {item.title}
                                        </h2>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>
            </Container>

        </section>
    );
};

export default FoodSlider;