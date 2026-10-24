import api from "./api.js";

export const reviewService = {
  async getProductReviews(productId) {
    return api.get(`/reviews/product/${productId}`);
  },

  async createReview(productId, reviewData) {
    return api.post(`/reviews/product/${productId}`, reviewData);
  },

  async getAllReviews() {
    return api.get("/reviews/admin");
  },

  async toggleApproval(reviewId) {
    return api.patch(`/reviews/admin/${reviewId}/toggle-approval`);
  },

  async deleteReview(reviewId) {
    return api.delete(`/reviews/admin/${reviewId}`);
  },
};

export default reviewService;
