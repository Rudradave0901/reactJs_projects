const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const priceForIndex = (index, base = 8.9) => `$${(base + index * 1.25).toFixed(2)}`;

export const formatMealForCard = (meal, index = 0, fallbackCategory = "Food") => {
    const category = (meal.strCategory || fallbackCategory || "Food").toLowerCase();

    return {
        id: meal.idMeal,
        name: meal.strMeal,
        title: meal.strMeal,
        category: [category],
        image: meal.strMealThumb,
        price: priceForIndex(index),
        discount: `Fresh ${category} meal from TheMealDB`,
        description:
            meal.strInstructions ||
            "Fresh meal details loaded from TheMealDB API.",
    };
};

export const getMeals = async (category = "all", limit = 8, signal) => {
    const endpoint =
        category === "all"
            ? `${API_BASE_URL}/search.php?s=`
            : `${API_BASE_URL}/filter.php?c=${category}`;

    const response = await fetch(endpoint, { signal });

    if (!response.ok) {
        throw new Error("Unable to load meals.");
    }

    const data = await response.json();
    const meals = data.meals || [];

    return meals.slice(0, limit).map((meal, index) =>
        formatMealForCard(meal, index, category)
    );
};

export const getMealById = async (mealId, signal) => {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`, { signal });

    if (!response.ok) {
        throw new Error("Unable to load meal details.");
    }

    const data = await response.json();
    const meal = data.meals?.[0];

    if (!meal) {
        throw new Error("Meal not found.");
    }

    return formatMealForCard(meal);
};

export const getFoodMenuSections = async (limitPerCategory = 8, signal) => {
    const categories = ["Chicken", "Seafood", "Beef"];

    const sections = await Promise.all(
        categories.map(async (category) => {
            const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`, {
                signal,
            });

            if (!response.ok) {
                throw new Error("Unable to load menu.");
            }

            const data = await response.json();
            const meals = data.meals || [];

            return {
                category,
                items: meals.slice(0, limitPerCategory).map((meal, index) => ({
                    id: meal.idMeal,
                    name: meal.strMeal,
                    price: priceForIndex(index),
                    desc: `Fresh ${category.toLowerCase()} recipe loaded from TheMealDB.`,
                })),
            };
        })
    );

    return sections;
};

export const getLatestFoodNews = async (limit = 9, signal) => {
    const meals = await getMeals("all", limit, signal);

    return meals.map((meal) => ({
        id: meal.id,
        img: meal.image,
        title: meal.name,
        desc: meal.description.length > 110
            ? `${meal.description.slice(0, 110)}...`
            : meal.description,
        link: `/blogdetails/${meal.id}`,
    }));
};
