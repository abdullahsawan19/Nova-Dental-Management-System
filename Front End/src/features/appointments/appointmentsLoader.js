import { store } from "../../store/store";
import { getAllDoctors } from "../doctors/doctorSlice";
import { fetchWorkingDays, fetchMyAppointments } from "./appointmentsSlice";

export const appointmentLoader = async () => {
  try {
    await Promise.all([
      store.dispatch(getAllDoctors()).unwrap(),
      store.dispatch(fetchWorkingDays()).unwrap(),
    ]);
    return null;
  } catch (error) {
    console.error("Failed to load appointment data", error);
    return null;
  }
};

export const myAppointmentsLoader = async () => {
  try {
    const [response] = await Promise.all([
      store.dispatch(fetchMyAppointments()).unwrap(),
      store.dispatch(fetchWorkingDays()).unwrap(),
    ]);
    return response?.data?.appointments || [];
  } catch (error) {
    console.error("Failed to load patient appointments:", error);
    return [];
  }
};
