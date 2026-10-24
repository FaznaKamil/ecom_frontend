import api from "./api.js";

export const contactService = {
  async submitMessage(data) {
    return api.post("/contact", data);
  },

  async getMessages() {
    return api.get("/contact/messages");
  },

  async updateMessageStatus(id, statusData) {
    return api.patch(`/contact/messages/${id}`, statusData);
  },

  async getSettings() {
    return api.get("/contact/settings");
  },

  async updateSettings(data) {
    return api.put("/contact/settings", data);
  },

  async getDashboardStats() {
    return api.get("/reports/dashboard");
  },

  async getSalesReport() {
    return api.get("/reports/sales");
  },
};

export default contactService;
