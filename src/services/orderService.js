import api from "./api.js";

export const orderService = {
  async createOrder(orderData) {
    return api.post("/orders", orderData);
  },

  async getMyOrders() {
    return api.get("/orders/my-orders");
  },

  async getOrderById(id) {
    return api.get(`/orders/${id}`);
  },

  async getAllOrders(params = {}) {
    return api.get("/orders", { params });
  },

  async updateOrderStatus(id, statusData) {
    return api.patch(`/orders/${id}/status`, statusData);
  },
};

export default orderService;
