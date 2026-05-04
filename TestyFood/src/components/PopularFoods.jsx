import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { QuickViewModal } from "./QuickModels";
import { getMeals } from "../api/themealdb";

const filters = [
    { label: "All Food", value: "all" },
    { label: "Chicken", value: "chicken" },
    { label: "Seafood", value: "seafood" },
    { label: "Beef", value: "beef" },
    { label: "Dessert", value: "dessert" },
    { label: "Pasta", value: "pasta" },
    { label: "Vegetarian", value: "vegetarian" },
];

export default function PopularFoods() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [foodsData, setFoodsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedFood, setSelectedFood] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const loadMeals = async () => {
            setIsLoading(true);
            setError("");

            try {
                const meals = await getMeals(activeFilter, 8, controller.signal);
                setFoodsData(meals);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError("Food data load thata problem aavyo. Please thodi vaar pachi try karo.");
                    setFoodsData([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        loadMeals();

        return () => controller.abort();
    }, [activeFilter]);

    const openQuickView = (food) => {
        setSelectedFood(food);
        setIsModalOpen(true);
    };

    const closeQuickView = () => {
        setIsModalOpen(false);
        setSelectedFood(null);
    };

    return (
        <section className="popular-foods-section pt-[55px] pb-[45px]">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full text-center px-4">
                        <h2 className="section-title">
                            Our Popular Tasty <span>Foods</span>
                        </h2>
                        <p className="content-pera">
                            Enim ut et amet vitae facilisi vel odio nisl. Pellentesque malesuada
                            massa
                            <br className="hidden lg:block" /> proin cursus elit amet iaculis.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap -mx-4 mt-8">
                    <div className="w-full px-4">
                        <ul className="foods-filters flex flex-wrap items-center justify-center mb-12 gap-3">
                            {filters.map((filter) => (
                                <li
                                    key={filter.value}
                                    className={`text-[18px] font-light leading-[20px] text-[#131313] rounded-[50px] py-[9px] px-[20px] m-[5px] transition-all duration-300 ease-in-out cursor-pointer btn btn-danger reverse ${activeFilter === filter.value ? "active text-white! border border-[#E60000]" : ""}`}
                                    onClick={() => setActiveFilter(filter.value)}
                                >
                                    <span>{filter.label}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Content */}
                        <div className="foods-filters-content">
                            <div className="flex flex-wrap -mx-4">
                                {isLoading && (
                                    <div className="w-full px-4 text-center text-[18px] text-[#636363] mb-8">
                                        Loading foods...
                                    </div>
                                )}

                                {!isLoading && error && (
                                    <div className="w-full px-4 text-center text-[18px] text-[#E60000] mb-8">
                                        {error}
                                    </div>
                                )}

                                {!isLoading && !error && foodsData.map((food, index) => (
                                    <div
                                        key={food.id}
                                        className={`w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 all ${food.category.join(
                                            " "
                                        )}`}
                                    >
                                        <FoodCard 
                                            food={food} 
                                            index={index} 
                                            onOpenQuickView={openQuickView} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* View All */}
                    <div className="w-full px-4">
                        <div className="view-all-btn-wrap text-center mt-2">
                            <a
                                href="#"
                                className="btn btn-primary red-button btn-hover-1"
                            >
                                <span>View All Products</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <QuickViewModal 
                isOpen={isModalOpen} 
                onClose={closeQuickView} 
                food={selectedFood} 
            />
        </section>
    );
}
