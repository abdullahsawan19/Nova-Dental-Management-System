import { store } from "../../store/store";
import {
  createNewService,
  updateServiceDetails,
  updateServiceStatus,
} from "./serviceSlice";

export const serviceAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    if (intent === "create") {
      await store.dispatch(createNewService(formData)).unwrap();
      return { success: true };
    }

    if (intent === "update") {
      const id = formData.get("id");
      await store.dispatch(updateServiceDetails({ id, formData })).unwrap();
      return { success: true };
    }

    if (intent === "toggle") {
      const id = formData.get("id");
      const isActive = formData.get("isActive") === "true";
      const data = { isActive: !isActive };
      await store.dispatch(updateServiceStatus({ id, data })).unwrap();
      return { success: true };
    }
    return null;
  } catch (error) {
    return { error: error.message || "Operation failed" };
  }
};
