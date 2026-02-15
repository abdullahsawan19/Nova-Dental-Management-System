import { store } from "../../../store/store";
import { adminUpdateApptStatus } from "../appointmentsSlice";

export const adminAppointmentsAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "updateStatus") {
    const id = formData.get("id");
    const status = formData.get("status");

    try {
      await store.dispatch(adminUpdateApptStatus({ id, status })).unwrap();
      return { success: true };
    } catch (error) {
      return { error: error || "Failed to update appointment status" };
    }
  }
  return null;
};
