import api from "./api.js";

const CART_STORAGE_KEY = "clicklanka_basket";
const WISHLIST_STORAGE_KEY = "clicklanka_wishlist";

export const cartService = {
  getStoredCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveCart(cartItems) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  },

  getStoredWishlist() {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveWishlist(wishlistItems) {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (e) {
      console.error("Failed to save wishlist to storage", e);
    }
  },

  async validateCoupon(code, subtotal) {
    return api.post("/coupons/validate", { code, subtotal });
  },

  async getCoupons() {
    return api.get("/coupons");
  },

  async createCoupon(data) {
    return api.post("/coupons", data);
  },

  async updateCoupon(id, data) {
    return api.put(`/coupons/${id}`, data);
  },

  async deleteCoupon(id) {
    return api.delete(`/coupons/${id}`);
  },
};

export default cartService;
