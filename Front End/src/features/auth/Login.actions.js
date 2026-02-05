import { redirect } from "react-router-dom";
import { store } from "../../store/store";
import { loginUser } from "./authSlice";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await store.dispatch(loginUser(data)).unwrap();
    return redirect("/");
  } catch (error) {
    return error;
  }
};
