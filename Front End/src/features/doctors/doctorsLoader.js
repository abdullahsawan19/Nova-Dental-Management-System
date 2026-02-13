import { store } from "../../store/store";
import { getAllDoctors, getDoctorById } from "./doctorSlice";

export const doctorsLoader = async () => {
  await store.dispatch(getAllDoctors());
  return null;
};

export const doctorDetailsLoader = async ({ params }) => {
  const response = await store.dispatch(getDoctorById(params.id)).unwrap();
  return response.data?.doctor || response.data;
};
