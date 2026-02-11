import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import branchSlice from "../features/branches/branchSlice";
import userSlice from "../features/users/userSlice";
import doctorSlice from "../features/doctors/doctorSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    branches: branchSlice,
    users: userSlice,
    doctor: doctorSlice,
  },
});
