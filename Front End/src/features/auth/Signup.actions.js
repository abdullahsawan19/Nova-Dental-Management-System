import { redirect } from "react-router-dom";
import { store } from "../../store/store";
import { signupUser } from "./authSlice";

export const signUpAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await store.dispatch(signupUser(data)).unwrap();
    return redirect("/");
  } catch (error) {
    return error;
  }
};
