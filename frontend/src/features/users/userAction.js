import { store } from "../../store/store";
import { updateMe, deactivateUser, deleteUser } from "./userSlice";

export const updateMeAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const userData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
  };
  try {
    await store.dispatch(updateMe(userData)).unwrap();
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    return { error: error };
  }
};

export const manageUsersAction = async ({ request, params }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "deactivate") {
    try {
      const userId = params.id || formData.get("userId");
      await store.dispatch(deactivateUser(userId)).unwrap();
      return { success: true, message: "User status updated" };
    } catch (error) {
      return { error };
    }
  }

  if (intent === "delete") {
    try {
      const userId = params.id || formData.get("userId");
      await store.dispatch(deleteUser(userId)).unwrap();
      return { success: true, message: "User deleted successfully" };
    } catch (error) {
      return { error };
    }
  }

  return null;
};
