import { redirect } from "react-router-dom";
import { store } from "../../store/store";

export const loginLoader = async () => {
  const state = store.getState();
  if (state.auth.isAuthenticated) {
    return redirect("/");
  }
  return null;
};
