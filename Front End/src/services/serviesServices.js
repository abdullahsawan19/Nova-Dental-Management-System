import axiosInstance from "./axiosInstance";

const serviceServices = {
  getAllServices: async (params) => {
    const response = await axiosInstance.get("/services", { params });
    return response.data;
  },

  getServiceById: async (id, params) => {
    const response = await axiosInstance.get(`/services/${id}`, { params });
    return response.data;
  },

  createService: async (serviceData) => {
    const response = await axiosInstance.post("/services", serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateService: async (id, serviceData) => {
    const response = await axiosInstance.patch(`/services/${id}`, serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default serviceServices;
