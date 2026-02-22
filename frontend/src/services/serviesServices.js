import axiosInstance from "./axiosInstance";

const serviceServices = {
  getAllServices: async (params = {}, isAdmin = false) => {
    const url = isAdmin ? "/services/admin/all" : "/services";
    const response = await axiosInstance.get(url, { params });
    return response.data;
  },

  createService: async (serviceData) => {
    const response = await axiosInstance.post("/services", serviceData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateService: async (id, serviceData) => {
    const isFormData = serviceData instanceof FormData;

    const response = await axiosInstance.patch(`/services/${id}`, serviceData, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  },
  getServiceById: async (id, params = {}) => {
    const response = await axiosInstance.get(`/services/${id}`, { params });
    return response.data;
  },
};

export default serviceServices;
