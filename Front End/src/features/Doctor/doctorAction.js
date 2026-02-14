import { store } from "../../store/store";
import { updateDoctorProfile } from "../../features/doctors/doctorSlice";

export const doctorProfileAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "updateProfile") {
    try {
      await store.dispatch(updateDoctorProfile(formData)).unwrap();
      return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
      return { error };
    }
  }
  return null;
};
