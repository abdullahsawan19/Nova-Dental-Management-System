import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import faqServices from "../../services/faqServies";

export const fetchPublicFaqs = createAsyncThunk(
  "faq/fetchPublicFaqs",
  async (params, thunkAPI) => {
    try {
      return await faqServices.getPublicFaqs(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchAdminFaqs = createAsyncThunk(
  "faq/fetchAdminFaqs",
  async (params, thunkAPI) => {
    try {
      return await faqServices.getAdminFaqs(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchFaqById = createAsyncThunk(
  "faq/fetchFaqById",
  async (id, thunkAPI) => {
    try {
      return await faqServices.getFaqById(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const createNewFaq = createAsyncThunk(
  "faq/createNewFaq",
  async (faqData, thunkAPI) => {
    try {
      return await faqServices.createFaq(faqData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const editFaq = createAsyncThunk(
  "faq/editFaq",
  async ({ id, updateData }, thunkAPI) => {
    try {
      return await faqServices.updateFaq(id, updateData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const removeFaq = createAsyncThunk(
  "faq/removeFaq",
  async (id, thunkAPI) => {
    try {
      await faqServices.deleteFaq(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ==========================================
// SLICE
// ==========================================

const initialState = {
  publicFaqs: [],
  adminFaqs: [],
  currentFaq: null,
  metadata: {},
  isLoading: false,
  error: null,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    clearFaqErrors: (state) => {
      state.error = null;
    },
    clearCurrentFaq: (state) => {
      state.currentFaq = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Get Public FAQs ---
      .addCase(fetchPublicFaqs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicFaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicFaqs = action.payload.data?.faqs || [];
        state.metadata = action.payload.metadata || {};
      })
      .addCase(fetchPublicFaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Get Admin FAQs ---
      .addCase(fetchAdminFaqs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminFaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminFaqs = action.payload.data?.faqs || [];
        state.metadata = action.payload.metadata || {};
      })
      .addCase(fetchAdminFaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Get FAQ By ID ---
      .addCase(fetchFaqById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFaqById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentFaq = action.payload.data?.faq;
      })
      .addCase(fetchFaqById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // --- Create FAQ ---
      .addCase(createNewFaq.fulfilled, (state, action) => {
        const newFaq = action.payload.data?.faq;
        if (newFaq) {
          state.adminFaqs.unshift(newFaq);
        }
      })

      // --- Edit FAQ ---
      .addCase(editFaq.fulfilled, (state, action) => {
        const updatedFaq = action.payload.data?.faq;
        if (updatedFaq) {
          const index = state.adminFaqs.findIndex(
            (f) => f._id === updatedFaq._id,
          );
          if (index !== -1) {
            state.adminFaqs[index] = updatedFaq;
          }
        }
      })

      // --- Delete FAQ ---
      .addCase(removeFaq.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.adminFaqs = state.adminFaqs.filter((f) => f._id !== deletedId);
      });
  },
});

export const { clearFaqErrors, clearCurrentFaq } = faqSlice.actions;
export default faqSlice.reducer;
