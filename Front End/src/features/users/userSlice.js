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

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default userSlice.reducer;
