import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../../services/userServices";
import doctorServices from "../../services/doctorServices";

export const createDoctor = createAsyncThunk(
  "user/adddoctor",
  async (doctorData, thunkAPI) => {
    try {
      return await userServices.createDoctor(doctorData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getAllDoctors = createAsyncThunk(
  "doctor/all",
  async (_, thunkAPI) => {
    try {
      return await doctorServices.getAllDoctors();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getDoctorById = createAsyncThunk(
  "doctor/data",
  async (id, thunkAPI) => {
    try {
      return await doctorServices.getDoctorById(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const getDoctorProfile = createAsyncThunk(
  "doctor/mydata",
  async (_, thunkAPI) => {
    try {
      return await doctorServices.getDoctorProfile();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const updateDoctorProfile = createAsyncThunk(
  "doctor/update",
  async (formData, thunkAPI) => {
    try {
      return await doctorServices.updateDoctorProfile(formData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default doctorSlice.reducer;
