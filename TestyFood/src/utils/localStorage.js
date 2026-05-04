const USERS_KEY = 'testyfood_users';
const CURRENT_USER_KEY = 'testyfood_current_user';
const CART_KEY = 'testyfood_cart';
const WISHLIST_KEY = 'testyfood_wishlist';
export const CART_UPDATED_EVENT = 'testyfood-cart-updated';
export const WISHLIST_UPDATED_EVENT = 'testyfood-wishlist-updated';
export const AUTH_UPDATED_EVENT = 'testyfood-auth-updated';

const readJson = (key, fallback) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
};

const writeJson = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const emit = (eventName) => {
    window.dispatchEvent(new Event(eventName));
};

const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    return Number(String(price || '0').replace(/[^0-9.]/g, '')) || 0;
};

export const getUsers = () => readJson(USERS_KEY, []);

export const saveUser = (user) => {
    const users = getUsers();
    const exists = users.some((item) => item.email.toLowerCase() === user.email.toLowerCase());

    if (exists) {
        return { ok: false, message: 'This email is already registered.' };
    }

    writeJson(USERS_KEY, [...users, user]);
    return { ok: true };
};

export const loginUser = (email, password) => {
    const user = getUsers().find(
        (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
    );

    if (!user) {
        return { ok: false, message: 'Email or password does not match.' };
    }

    const currentUser = {
        fname: user.fname,
        lname: user.lname,
        phone: user.phone,
        email: user.email,
    };

    writeJson(CURRENT_USER_KEY, currentUser);
    emit(AUTH_UPDATED_EVENT);
    return { ok: true, user: currentUser };
};

export const getCurrentUser = () => readJson(CURRENT_USER_KEY, null);

export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    emit(AUTH_UPDATED_EVENT);
};

export const getCartItems = () => readJson(CART_KEY, []);

export const saveCartItems = (items) => {
    writeJson(CART_KEY, items);
    emit(CART_UPDATED_EVENT);
};

export const addToCart = (food, quantity = 1) => {
    const items = getCartItems();
    const id = String(food.id || food.name || food.title);
    const existingItem = items.find((item) => item.id === id);
    const qty = Math.max(1, Number(quantity) || 1);

    if (existingItem) {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, qty: item.qty + qty } : item
        );
        saveCartItems(updatedItems);
        return updatedItems;
    }

    const cartItem = {
        id,
        title: food.title || food.name,
        price: parsePrice(food.price || 10.9),
        qty,
        img: food.image || food.img || '/orders-info.png',
    };

    const updatedItems = [...items, cartItem];
    saveCartItems(updatedItems);
    return updatedItems;
};

export const updateCartQuantity = (id, change) => {
    const updatedItems = getCartItems().map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
    );

    saveCartItems(updatedItems);
    return updatedItems;
};

export const removeCartItem = (id) => {
    const updatedItems = getCartItems().filter((item) => item.id !== id);
    saveCartItems(updatedItems);
    return updatedItems;
};

export const getCartCount = () => getCartItems().reduce((total, item) => total + item.qty, 0);

export const getCartTotals = (items = getCartItems()) => {
    const itemTotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
    const deliveryFee = items.length ? 30 : 0;
    const taxes = items.length ? 16 : 0;

    return {
        itemTotal,
        deliveryFee,
        taxes,
        grandTotal: itemTotal + deliveryFee + taxes,
    };
};

export const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

// Wishlist Logic
export const getWishlistItems = () => readJson(WISHLIST_KEY, []);

export const toggleWishlistItem = (food) => {
    const items = getWishlistItems();
    const id = String(food.id || food.idMeal || food.name || food.title);
    const exists = items.find((item) => item.id === id);

    let updatedItems;
    if (exists) {
        updatedItems = items.filter((item) => item.id !== id);
    } else {
        const item = {
            id,
            title: food.title || food.name || food.strMeal,
            price: food.price || 10.9,
            img: food.image || food.img || food.strMealThumb || '/orders-info.png',
        };
        updatedItems = [...items, item];
    }

    writeJson(WISHLIST_KEY, updatedItems);
    emit(WISHLIST_UPDATED_EVENT);
    return updatedItems;
};

export const isItemInWishlist = (id) => {
    const items = getWishlistItems();
    return items.some((item) => item.id === String(id));
};
