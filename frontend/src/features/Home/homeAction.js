import { store } from "../../store/store";
import { createNewReview } from "../../features/reviews/reviewSlice";

export const homeAction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "create") {
    const reviewData = {
      review: formData.get("review"),
      rating: Number(formData.get("rating")),
      doctorName: formData.get("doctorName"),
    };

    try {
      await store.dispatch(createNewReview(reviewData)).unwrap();
      return { success: true };
    } catch (error) {
      return { error: error };
    }
  }

  return null;
};
