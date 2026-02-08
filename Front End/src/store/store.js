import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import branchSlice from "../features/branches/branchSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    branches: branchSlice,
  },
});
