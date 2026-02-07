import { redirect } from "react-router-dom";
import { store } from "../../store/store";

export const signUpLoader = async () => {
  const state = await store.getState();
  if (state.auth.isAuthenticated) {
    return redirect("/");
  }
  return null;
};
