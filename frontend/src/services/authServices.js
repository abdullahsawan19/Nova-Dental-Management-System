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
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
  },
};

export default authService;
