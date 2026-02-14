import { store } from "../../store/store";
import { getDoctorProfile } from "../doctors/doctorSlice";
import { fetchServices } from "../services/serviceSlice";

export const doctorProfileLoader = async () => {
  const state = store.getState();

  if (state.services.services.length === 0) {
    await store.dispatch(fetchServices());
  }

  try {
    const response = await store.dispatch(getDoctorProfile()).unwrap();
    return response;
  } catch (error) {
    return null;
  }
};
