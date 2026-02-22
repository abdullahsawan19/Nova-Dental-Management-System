import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../../services/userServices";

export const getMe = createAsyncThunk("users/getme", async (_, thunkAPI) => {
  try {
    return await userServices.getMe();
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});
export const updateMe = createAsyncThunk(
  "users/update",
  async (userData, thunkAPI) => {
    try {
      return await userServices.updateMe(userData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getAllUsers = createAsyncThunk(
  "users/getall",
  async (params, thunkAPI) => {
    try {
      return await userServices.getAllUsers(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const deactivateUser = createAsyncThunk(
  "users/deactive",
  async (id, thunkAPI) => {
    try {
      return await userServices.deactivateUser(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const deleteUser = createAsyncThunk(
  "users/delelet",
  async (id, thunkAPI) => {
    try {
      return await userServices.deleteUser(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      // ============ Get All Users ============
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data.users || action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ============ Update Me  ============
      .addCase(updateMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ============ Deactivate User ============
      .addCase(deactivateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload.data?.user || action.payload;

        const index = state.users.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) {
          state.users[index].isActive = updatedUser.isActive;
        }
      })

      // ============ Delete User ============
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })

      // ============ Get Me (Profile) ============
      .addCase(getMe.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export default userSlice.reducer;
