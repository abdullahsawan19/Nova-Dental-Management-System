import { redirect } from "react-router-dom";
import { store } from "../../store/store";
import { loginUser } from "./authSlice";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await store.dispatch(loginUser(data)).unwrap();
    const role = store.getState().auth.user?.role;

    console.log(role);

    if (role === "admin") {
      return redirect("/admin");
    }

    if (role === "doctor") {
      return redirect("/doctor");
    }

    return redirect("/");
  } catch (error) {
    return error;
  }
};
