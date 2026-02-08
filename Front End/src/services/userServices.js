import axiosInstance from "./axiosInstance";

const userServices = {
  getMe: async () => {
    const response = await axiosInstance.get("/users/me");
    return response.data.data.user;
  },
  updateMe: async (userData) => {
    const response = await axiosInstance.patch("/users/me", userData);
    return response.data.data.user;
  },
  getAllUsers: async (params) => {
    const response = await axiosInstance.get("/users", { params });
    return response.data;
  },
  createDoctor: async (doctorData) => {
    const response = await axiosInstance.post("/users/doctor", doctorData);
    return response.data;
  },
  deactivateUser: async (id) => {
    const response = await axiosInstance.patch(`/users/deactivate/${id}`);
    return response.data;
  },
  deleteUser: async (id) => {
    await axiosInstance.delete(`/users/${id}`);
    return id;
  },
};
export default userServices;
