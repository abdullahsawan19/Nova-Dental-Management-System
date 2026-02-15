import { store } from "../../../store/store";
import { fetchAllAppointments } from "../appointmentsSlice";

export const adminAppointmentsLoader = async () => {
  try {
    await store.dispatch(fetchAllAppointments()).unwrap();
    return null;
  } catch (error) {
    console.error("Failed to load admin appointments", error);
    return null;
  }
};
