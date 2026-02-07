import axiosInstance from "./axiosInstance";

const authService = {
  signup: async (userData) => {
    const response = await axiosInstance.post("/users/signup", userData);
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response.data;
  },
  login: async (credentials) => {
    const response = await axiosInstance.post("/users/login", credentials);
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response.data;
  },
  logout: async () => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
  },
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

export default authService;
