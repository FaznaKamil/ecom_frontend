import api from "./api.js";

export const productService = {
  async getProducts(params = {}) {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== "" && v !== null)
    );
    return api.get("/products", { params: cleanParams });
  },

  async getProductById(id) {
    return api.get(`/products/${id}`);
  },

  async getFeaturedProducts() {
    return api.get("/products/featured");
  },

  async getBestSellers() {
    return api.get("/products/best-sellers");
  },

  async getNewArrivals() {
    return api.get("/products/new-arrivals");
  },

  async getRelatedProducts(id) {
    return api.get(`/products/${id}/related`);
  },

  async createProduct(productData) {
    return api.post("/products", productData);
  },

  async updateProduct(id, productData) {
    return api.put(`/products/${id}`, productData);
  },

  async deleteProduct(id) {
    return api.delete(`/products/${id}`);
  },
};

export default productService;
