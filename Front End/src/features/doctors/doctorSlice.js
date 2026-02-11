import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../../services/userServices";
import doctorServices from "../../services/doctorServices";

import { deactivateUser, deleteUser } from "../users/userSlice";

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

const initialState = {
  doctors: [],
  isLoading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      // ============ Get All Doctors ============
      .addCase(getAllDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload.data.doctors || action.payload;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ============ Create Doctor ============
      .addCase(createDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDoctor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ============ Handle Deactivate User (Doctor) ============
      .addCase(deactivateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data?.user || action.payload;

        const doctorIndex = state.doctors.findIndex(
          (doc) => doc.user?._id === updatedUser._id,
        );

        if (doctorIndex !== -1) {
          state.doctors[doctorIndex].user.isActive = updatedUser.isActive;
        }
      })

      // ============ Handle Delete User (Doctor) ============
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserId = action.payload;

        state.doctors = state.doctors.filter(
          (doc) => doc.user?._id !== deletedUserId,
        );
      });
  },
});

export default doctorSlice.reducer;
