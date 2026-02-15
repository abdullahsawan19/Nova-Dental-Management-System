import { redirect } from "react-router-dom";
import { store } from "../../store/store";
import { loginUser } from "./authSlice";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const redirectTo = formData.get("redirectTo") || "/";

  try {
    await store.dispatch(loginUser(data)).unwrap();
    const role = store.getState().auth.user?.role;

    if (role === "admin") {
      return redirect("/admin");
    }

    if (role === "doctor") {
      return redirect("/doctor");
    }

    return redirect(redirectTo);
  } catch (error) {
    return error;
  }
};
