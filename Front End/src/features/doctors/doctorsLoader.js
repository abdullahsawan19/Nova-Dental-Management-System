import { store } from "../../store/store";
import { getAllDoctors } from "./doctorSlice";

export const doctorsLoader = async () => {
  await store.dispatch(getAllDoctors());
  return null;
};
