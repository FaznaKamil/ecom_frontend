import api from "./api.js";

export const authService = {
  async register(userData) {
    return api.post("/auth/register", userData);
  },

  async login(credentials) {
    return api.post("/auth/login", credentials);
  },

  async logout() {
    return api.post("/auth/logout");
  },

  async getMe() {
    return api.get("/auth/me");
  },

  async updateProfile(profileData) {
    return api.put("/auth/profile", profileData);
  },

  async forgotPassword(email) {
    return api.post("/auth/forgot-password", { email });
  },

  async resetPassword(token, password) {
    return api.post("/auth/reset-password", { token, password });
  },

  async addAddress(addressData) {
    return api.post("/users/addresses", addressData);
  },

  async deleteAddress(addressId) {
    return api.delete(`/users/addresses/${addressId}`);
  },

  async toggleWishlist(productId) {
    return api.post("/users/wishlist/toggle", { productId });
  },

  async getCustomers() {
    return api.get("/users/customers");
  },

  async getCustomerById(id) {
    return api.get(`/users/customers/${id}`);
  },
};

export default authService;
