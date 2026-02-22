import { store } from "../../store/store";
import { createNewFaq, editFaq, removeFaq } from "./faqSlice";

export const faqAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "createFaq") {
    const payload = {
      question: {
        en: formData.get("questionEn"),
        ar: formData.get("questionAr"),
      },
      answer: {
        en: formData.get("answerEn"),
        ar: formData.get("answerAr"),
      },
    };

    try {
      await store.dispatch(createNewFaq(payload)).unwrap();
      return { success: true, message: "FAQ added successfully!" };
    } catch (error) {
      return { error: error || "Failed to add FAQ" };
    }
  }

  if (intent === "toggleStatus") {
    const id = formData.get("id");
    const currentStatus = formData.get("isActive") === "true";

    try {
      await store
        .dispatch(editFaq({ id, updateData: { isActive: !currentStatus } }))
        .unwrap();
      return { success: true, message: "Status updated!" };
    } catch (error) {
      return { error: error || "Failed to update status" };
    }
  }

  if (intent === "deleteFaq") {
    const id = formData.get("id");
    try {
      await store.dispatch(removeFaq(id)).unwrap();
      return { success: true, message: "FAQ deleted successfully!" };
    } catch (error) {
      return { error: error || "Failed to delete FAQ" };
    }
  }

  return null;
};
