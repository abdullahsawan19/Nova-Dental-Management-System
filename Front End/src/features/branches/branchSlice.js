import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import branchServices from "../../services/branchServices";

export const getAllBranches = createAsyncThunk(
  "branches/all",
  async (_, thunkAPI) => {
    try {
      return await branchServices.getAllBranches();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getBranch = createAsyncThunk(
  "branches/single",
  async (_, thunkAPI) => {
    try {
      return await branchServices.getBranch();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createBranch = createAsyncThunk(
  "branches/create",
  async (branchData, thunkAPI) => {
    try {
      return await branchServices.createBranch(branchData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateBranch = createAsyncThunk(
  "branches/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await branchServices.updateBranch(id, data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const removeBranch = createAsyncThunk(
  "branches/delete",
  async (id, thunkAPI) => {
    try {
      return await branchServices.deleteBranch(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error deleting branch",
      );
    }
  },
);

const initialState = {
  branches: [],
  activeBranch: null,
  isLoading: false,
  error: null,
};

const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      // ================= GET ALL =================
      .addCase(getAllBranches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branches = action.payload.data.branches;
      })
      .addCase(getAllBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ================= GET Active Branch =================
      .addCase(getBranch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeBranch = action.payload.data.branch;
      })
      .addCase(getBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ================= CREATE =================
      .addCase(createBranch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branches.push(action.payload.data.branch);
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ================= UPDATE =================
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.branches.findIndex(
          (branch) => branch._id === action.payload.data.branch._id,
        );
        if (index !== -1) {
          state.branches[index] = action.payload.data.branch;
        }
      })

      // ================= DELETE =================
      .addCase(removeBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branches = state.branches.filter(
          (branch) => branch._id !== action.payload,
        );
      })
      .addCase(removeBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default branchSlice.reducer;
