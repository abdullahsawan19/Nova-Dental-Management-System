import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime + 60;
  } catch (error) {
    return true;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (
      config.url.includes("/login") ||
      config.url.includes("/refresh-token")
    ) {
      return config;
    }

    let token = localStorage.getItem("accessToken");

    if (token && isTokenExpired(token)) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/refresh-token`,
          { withCredentials: true },
        );

        const newAccessToken =
          res.data.accessToken || res.data.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          token = newAccessToken;
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

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

    if (
      originalRequest.url.includes("/login") ||
      originalRequest.url.includes("/refresh-token")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.get("/users/refresh-token");

        const newAccessToken =
          res.data.accessToken || res.data.data?.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
