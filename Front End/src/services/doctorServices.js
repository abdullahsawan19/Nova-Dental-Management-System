import axiosInstance from "./axiosInstance";

const doctorServices = {
  getAllDoctors: async (params) => {
    const response = await axiosInstance.get("/doctors", { params });
    return response.data;
  },

  getDoctorById: async (id) => {
    const response = await axiosInstance.get(`/doctors/${id}`);
    return response.data;
  },

  getDoctorProfile: async () => {
    const response = await axiosInstance.get("/doctors/me");
    return response.data;
  },

  updateDoctorProfile: async (formData) => {
    const response = await axiosInstance.patch("/doctors/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

export default doctorServices;
