import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceServices from "../../services/serviesServices";

// 1.fetchServices
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async ({ params, isAdmin } = {}, thunkAPI) => {
    try {
      return await serviceServices.getAllServices(params, isAdmin);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// 2. Create
export const createNewService = createAsyncThunk(
  "services/create",
  async (formData, thunkAPI) => {
    try {
      return await serviceServices.createService(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

// 3. Update Status (Toggle)
export const updateServiceStatus = createAsyncThunk(
  "services/updateStatus",
  async ({ id, data }, thunkAPI) => {
    try {
      return await serviceServices.updateService(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

// 4. Update Details
export const updateServiceDetails = createAsyncThunk(
  "services/updateDetails",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await serviceServices.updateService(id, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

// 5. Get By Id
export const fetchServiceById = createAsyncThunk(
  "services/fetchById",
  async ({ id, lang }, thunkAPI) => {
    try {
      return await serviceServices.getServiceById(id, { lang });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetServiceState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearCurrentService: (state) => {
      state.currentService = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data?.services || [];
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createNewService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services.push(action.payload.data.service);
        state.successMessage = "Service created successfully!";
      })
      .addCase(updateServiceStatus.fulfilled, (state, action) => {
        const updatedService = action.payload.data?.service;
        if (!updatedService) return;

        const index = state.services.findIndex(
          (s) => s._id === updatedService._id,
        );
        if (index !== -1) {
          state.services[index] = updatedService;
        }
      })
      .addCase(updateServiceDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedService = action.payload.data.service;
        const index = state.services.findIndex(
          (s) => s._id === updatedService._id,
        );
        if (index !== -1) {
          state.services[index] = updatedService;
        }
        state.successMessage = "Service updated successfully!";
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentService = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentService = action.payload.data.service;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetServiceState, clearCurrentService } = serviceSlice.actions;
export default serviceSlice.reducer;
