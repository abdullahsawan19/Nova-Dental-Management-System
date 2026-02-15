import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import branchSlice from "../features/branches/branchSlice";
import userSlice from "../features/users/userSlice";
import doctorSlice from "../features/doctors/doctorSlice";
import serviceSlice from "../features/services/serviceSlice";
import reviewSlice from "../features/reviews/reviewSlice";
import appointmentSlice from "../features/appointments/appointmentsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    branches: branchSlice,
    user: userSlice,
    doctor: doctorSlice,
    services: serviceSlice,
    reviews: reviewSlice,
    appointments: appointmentSlice,
  },
});
