import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewServices from "../../services/reviewServices";

// 1. Fetch All Reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchAll",
  async (params = {}, thunkAPI) => {
    try {
      return await reviewServices.getAllReviews(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// 2. Delete Review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id, thunkAPI) => {
    try {
      await reviewServices.deleteReview(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// 3. Create New Review
export const createNewReview = createAsyncThunk(
  "reviews/create",
  async (reviewData, thunkAPI) => {
    try {
      return await reviewServices.createReview(reviewData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data.reviews;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload,
        );
      })
      .addCase(createNewReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload.data.review);
      });
  },
});

export default reviewSlice.reducer;
