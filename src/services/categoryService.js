import api from "./api.js";

export const categoryService = {
  async getCategories() {
    return api.get("/categories");
  },

  async getCategoryBySlug(slug) {
    return api.get(`/categories/${slug}`);
  },

  async createCategory(data) {
    return api.post("/categories", data);
  },

  async updateCategory(id, data) {
    return api.put(`/categories/${id}`, data);
  },

  async deleteCategory(id) {
    return api.delete(`/categories/${id}`);
  },
};

export default categoryService;
