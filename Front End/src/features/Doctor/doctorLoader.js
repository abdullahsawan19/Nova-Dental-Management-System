import { store } from "../../store/store";
import { getDoctorProfile } from "../doctors/doctorSlice";
import { fetchServices } from "../services/serviceSlice";
import { fetchDoctorAppointments } from "../appointments/appointmentsSlice";

export const doctorProfileLoader = async () => {
  const state = store.getState();

  if (state.services.services.length === 0) {
    await store.dispatch(fetchServices());
  }

  try {
    const response = await store.dispatch(getDoctorProfile()).unwrap();
    return response;
  } catch (error) {
    console.error("Failed to load doctor profile:", error);
    return null;
  }
};

export const doctorAppointmentsLoader = async () => {
  try {
    const response = await store.dispatch(fetchDoctorAppointments()).unwrap();
    return response?.data?.appointments || [];
  } catch (error) {
    console.error("Failed to load doctor appointments:", error);
    return [];
  }
};
