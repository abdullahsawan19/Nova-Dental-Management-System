import { store } from "../../store/store";
import { getAllDoctors } from "../doctors/doctorSlice";
import { fetchWorkingDays } from "./appointmentsSlice";

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
