import axiosInstance from "./axiosInstance";
const branchServices = {
  getBranch: async () => {
    const response = await axiosInstance.get("/branches");
    return response.data;
  },
  getAllBranches: async () => {
    const response = await axiosInstance.get("/branches/all");
    return response.data;
  },
  createBranch: async (branchData) => {
    const response = await axiosInstance.post("/branches", branchData);
    return response.data;
  },
  updateBranch: async (id, branchData) => {
    const response = await axiosInstance.patch(`/branches/${id}`, branchData);
    return response.data;
  },
  deleteBranch: async (id) => {
    await axiosInstance.delete(`/branches/${id}`);
    return id;
  },
};

export default branchServices;
