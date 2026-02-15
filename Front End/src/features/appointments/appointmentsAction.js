import { redirect } from "react-router-dom";
import { store } from "../../store/store";
import { createCheckoutSession } from "./appointmentsSlice";

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
