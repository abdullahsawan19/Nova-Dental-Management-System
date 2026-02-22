import axiosInstance from "./axiosInstance";

const faqServices = {
  getPublicFaqs: async (params) => {
    const response = await axiosInstance.get("/faqs", { params });
    return response.data;
  },

  getAdminFaqs: async (params) => {
    const response = await axiosInstance.get("/faqs/admin/all", { params });
    return response.data;
  },

  getFaqById: async (id) => {
    const response = await axiosInstance.get(`/faqs/${id}`);
    return response.data;
  },

  createFaq: async (faqData) => {
    const response = await axiosInstance.post("/faqs", faqData);
    return response.data;
  },

  updateFaq: async (id, updateData) => {
    const response = await axiosInstance.patch(`/faqs/${id}`, updateData);
    return response.data;
  },

  deleteFaq: async (id) => {
    const response = await axiosInstance.delete(`/faqs/${id}`);
    return response.data;
  },
};

export default faqServices;
