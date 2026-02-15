import { store } from "../../store/store";
import { updateDoctorProfile } from "../../features/doctors/doctorSlice";
import { markAppointmentCompleted } from "../../features/appointments/appointmentsSlice";

export const doctorProfileAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "updateProfile") {
    try {
      await store.dispatch(updateDoctorProfile(formData)).unwrap();
      return { success: true, message: "Profile updated successfully! ✅" };
    } catch (error) {
      return { error: error || "Update failed" };
    }
  }
  return null;
};

export const doctorAppointmentsAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "updateStatus") {
    const appointmentId = formData.get("id");
    try {
      await store.dispatch(markAppointmentCompleted(appointmentId)).unwrap();
      return { success: true, message: "Appointment marked as completed! 🎉" };
    } catch (error) {
      return { error: error || "Failed to update status" };
    }
  }
  return null;
};
