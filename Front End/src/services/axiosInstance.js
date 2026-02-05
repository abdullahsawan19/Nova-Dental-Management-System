import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("❌ Error Status:", error.response?.status); // 👈 جاسوس 1
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔄 Starting Refresh Process..."); // 👈 جاسوس 2
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.get("/users/refresh-token");
        console.log("✅ Refresh Success! New Token:", res.data.accessToken); // 👈 جاسوس 3
        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("💀 Refresh Failed:", refreshError); // 👈 جاسوس 4
        console.error("Refresh token expired or invalid", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
