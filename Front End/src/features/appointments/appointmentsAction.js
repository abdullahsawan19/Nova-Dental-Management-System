import { redirect } from "react-router-dom";
import { store } from "../../store/store";
import {
  cancelPatientAppointment,
  createCheckoutSession,
  updatePatientAppointment,
} from "./appointmentsSlice";

export const appointmentAction = async ({ request }) => {
  const formData = await request.formData();
  const bookingData = Object.fromEntries(formData);

  const user = store.getState().auth.user;

  if (!user) {
    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));

    const currentUrl = new URL(request.url).pathname;
    return redirect(`/login?redirectTo=${currentUrl}`);
  }

  try {
    const payload = {
      doctor: bookingData.doctorId,
      service: bookingData.serviceId,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
    };

    const response = await store
      .dispatch(createCheckoutSession(payload))
      .unwrap();

    if (response.sessionUrl) {
      window.location.href = response.sessionUrl;
    }

    return null;
  } catch (error) {
    return { error: error || "Failed to process booking. Please try again." };
  }
};

export const myAppointmentsAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = formData.get("id");

  if (intent === "cancel") {
    try {
      await store.dispatch(cancelPatientAppointment(id)).unwrap();
      return { success: true, message: "Appointment cancelled successfully." };
    } catch (error) {
      return { error: error || "Failed to cancel appointment." };
    }
  }

  if (intent === "reschedule") {
    const date = formData.get("date");
    const timeSlot = formData.get("timeSlot");

    try {
      await store
        .dispatch(
          updatePatientAppointment({ id, updateData: { date, timeSlot } }),
        )
        .unwrap();
      return {
        success: true,
        message: "Appointment rescheduled successfully.",
      };
    } catch (error) {
      return { error: error || "Failed to reschedule appointment." };
    }
  }

  return null;
};
