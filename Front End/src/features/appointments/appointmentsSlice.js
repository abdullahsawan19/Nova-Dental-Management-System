import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentServices from "../../services/appointmentServices";

// ==========================================
// 1. PUBLIC / BOOKING FLOW THUNKS
// ==========================================

export const fetchWorkingDays = createAsyncThunk(
  "appointment/getWorkingDays",
  async (_, thunkAPI) => {
    try {
      return await appointmentServices.getWorkingDays();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchAvailableSlots = createAsyncThunk(
  "appointment/getAvailableSlots",
  async ({ date, doctorId }, thunkAPI) => {
    try {
      return await appointmentServices.getAvailableSlots(date, doctorId);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createCheckoutSession = createAsyncThunk(
  "appointment/checkoutSession",
  async (bookingData, thunkAPI) => {
    try {
      return await appointmentServices.checkoutSession(bookingData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ==========================================
// 2. PATIENT THUNKS
// ==========================================

export const fetchMyAppointments = createAsyncThunk(
  "appointment/getMyAppointments",
  async (_, thunkAPI) => {
    try {
      return await appointmentServices.getMyAppointments();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updatePatientAppointment = createAsyncThunk(
  "appointment/updateAppointment",
  async ({ id, updateData }, thunkAPI) => {
    try {
      return await appointmentServices.updateAppointment(id, updateData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const cancelPatientAppointment = createAsyncThunk(
  "appointment/cancelAppointment",
  async (id, thunkAPI) => {
    try {
      return await appointmentServices.cancelAppointment(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ==========================================
// 3. DOCTOR & ADMIN THUNKS
// ==========================================

export const fetchDoctorAppointments = createAsyncThunk(
  "appointment/getDoctorAppointments",
  async (_, thunkAPI) => {
    try {
      return await appointmentServices.getDoctorAppointments();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const markAppointmentCompleted = createAsyncThunk(
  "appointment/completeAppointment",
  async (id, thunkAPI) => {
    try {
      return await appointmentServices.completeAppointment(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchAllAppointments = createAsyncThunk(
  "appointment/getAllAppointments",
  async (params, thunkAPI) => {
    try {
      return await appointmentServices.getAllAppointments(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const adminUpdateApptStatus = createAsyncThunk(
  "appointment/adminUpdateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      return await appointmentServices.adminUpdateStatus(id, status);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ==========================================
// SLICE INITIAL STATE & LOGIC
// ==========================================

const initialState = {
  workingDays: [],
  availableSlots: [],
  myAppointments: [],
  doctorAppointments: [],
  allAppointments: [],
  checkoutUrl: null,
  isLoading: false,
  isSlotLoading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAvailableSlots: (state) => {
      state.availableSlots = [];
    },
    clearCheckoutUrl: (state) => {
      state.checkoutUrl = null;
    },
    clearAppointmentErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Get Working Days ---
      .addCase(fetchWorkingDays.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWorkingDays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workingDays = action.payload.data?.days || [];
      })
      .addCase(fetchWorkingDays.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Get Available Slots ---
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.isSlotLoading = true;
        state.error = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.isSlotLoading = false;
        state.availableSlots = action.payload.data?.slots || [];
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.isSlotLoading = false;
        state.error = action.payload;
      })

      // --- Checkout Session ---
      .addCase(createCheckoutSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkoutUrl = action.payload.sessionUrl;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Get My Appointments (Patient) ---
      .addCase(fetchMyAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myAppointments = action.payload.data?.appointments || [];
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Cancel Appointment (Patient) ---
      .addCase(cancelPatientAppointment.fulfilled, (state, action) => {
        const cancelledAppt = action.payload.data?.appointment;
        if (cancelledAppt) {
          const index = state.myAppointments.findIndex(
            (app) => app._id === cancelledAppt._id,
          );
          if (index !== -1) {
            state.myAppointments[index].status = "cancelled";
          }
        }
      })

      // --- Get Doctor Appointments ---
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorAppointments = action.payload.data?.appointments || [];
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Admin: Get All Appointments ---
      .addCase(fetchAllAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allAppointments = action.payload.data?.appointments || [];
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAvailableSlots, clearCheckoutUrl, clearAppointmentErrors } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
