import { store } from "../../store/store";
import { fetchReviews } from "./reviewSlice";

export const adminReviewsLoader = async () => {
  await store.dispatch(fetchReviews({ limit: 100 }));
  return null;
};
