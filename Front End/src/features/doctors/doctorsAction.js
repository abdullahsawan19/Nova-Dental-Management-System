import { store } from "../../store/store";
import { createDoctor } from "./doctorSlice";

export const doctorsAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "create") {
    const data = Object.fromEntries(formData);

    const doctorPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      phone: data.phone,
      role: "doctor",
    };

    try {
      await store.dispatch(createDoctor(doctorPayload)).unwrap();
      return { success: true, message: "Doctor created successfully" };
    } catch (error) {
      return { error: error };
    }
  }

  return null;
};
