// Local cart helper for non-authenticated users
// Stores cart in localStorage until user logs in

export interface LocalCartItem {
    id: string;
    courseId: string;
    courseSlug: string;
    title: string;
    price: number;
    salePrice?: number;
    thumbnail?: string;
    category?: string;
}

const LOCAL_CART_KEY = "monarkfx_guest_cart";

export const getLocalCart = (): LocalCartItem[] => {
    if (typeof window === "undefined") return [];
    try {
        const cart = localStorage.getItem(LOCAL_CART_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch {
        return [];
    }
};

export const addToLocalCart = (item: LocalCartItem): LocalCartItem[] => {
    const cart = getLocalCart();

    // Check if already in cart
    const exists = cart.some((i) => i.courseId === item.courseId);
    if (exists) {
        return cart;
    }

    const updatedCart = [...cart, { ...item, id: `local_${Date.now()}` }];
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));

    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent("localCartUpdated", { detail: updatedCart }));

    return updatedCart;
};

export const removeFromLocalCart = (courseId: string): LocalCartItem[] => {
    const cart = getLocalCart();
    const updatedCart = cart.filter((i) => i.courseId !== courseId);
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));

    window.dispatchEvent(new CustomEvent("localCartUpdated", { detail: updatedCart }));

    return updatedCart;
};

export const clearLocalCart = (): void => {
    localStorage.removeItem(LOCAL_CART_KEY);
    window.dispatchEvent(new CustomEvent("localCartUpdated", { detail: [] }));
};

export const getLocalCartCount = (): number => {
    return getLocalCart().length;
};

export const isInLocalCart = (courseId: string): boolean => {
    const cart = getLocalCart();
    return cart.some((i) => i.courseId === courseId);
};

export const getLocalCartTotal = (): { subtotal: number; total: number } => {
    const cart = getLocalCart();
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const total = cart.reduce((acc, item) => acc + (item.salePrice || item.price), 0);
    return { subtotal, total };
};
