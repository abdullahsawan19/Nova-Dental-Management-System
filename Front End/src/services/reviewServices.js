import axiosInstance from "./axiosInstance";

const reviewServices = {
  getAllReviews: async (params) => {
    const response = await axiosInstance.get("/reviews", { params });
    return response.data;
  },

  createReview: async (reviewData) => {
    const response = await axiosInstance.post("/reviews", reviewData);
    return response.data;
  },

  deleteReview: async (id) => {
    await axiosInstance.delete(`/reviews/admin/${id}`);
    return id;
  },
};

export default reviewServices;
