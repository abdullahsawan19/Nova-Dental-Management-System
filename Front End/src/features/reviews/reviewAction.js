import { store } from "../../store/store";
import { deleteReview } from "./reviewSlice";

export const reviewAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const reviewId = formData.get("reviewId");

  if (intent === "delete") {
    try {
      await store.dispatch(deleteReview(reviewId)).unwrap();
      return { success: true };
    } catch (error) {
      return { error: error };
    }
  }
  return null;
};
