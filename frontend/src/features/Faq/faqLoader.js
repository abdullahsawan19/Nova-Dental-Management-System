import { store } from "../../store/store";
import { fetchAdminFaqs, fetchPublicFaqs } from "./faqSlice";

export const adminFaqLoader = async () => {
  try {
    await store.dispatch(fetchAdminFaqs()).unwrap();
    return null;
  } catch (error) {
    console.error("Failed to load FAQs:", error);
    return null;
  }
};

export const publicFaqLoader = async () => {
  try {
    await store.dispatch(fetchPublicFaqs()).unwrap();
    return null;
  } catch (error) {
    console.error("Failed to load public FAQs:", error);
    return null;
  }
};
