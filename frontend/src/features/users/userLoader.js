import { store } from "../../store/store";
import { getAllUsers, getMe } from "./userSlice";

export const usersLoader = async () => {
  await store.dispatch(getAllUsers());
  return null;
};

export const meLoader = async () => {
  await store.dispatch(getMe());
  return null;
};
