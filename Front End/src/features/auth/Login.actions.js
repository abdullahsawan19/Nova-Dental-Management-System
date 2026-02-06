import { redirect } from "react-router-dom";
import { store } from "../../store/store";
import { loginUser } from "./authSlice";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const result = await store.dispatch(loginUser(data)).unwrap();

    const role = result.data?.user?.role;

    if (role === "admin") {
      return redirect("/admin/dashboard/appointments");
    }

    if (role === "doctor") {
      return redirect("/doctor/dashboard/appointments");
    }

    return redirect("/");
  } catch (error) {
    return error;
  }
};
