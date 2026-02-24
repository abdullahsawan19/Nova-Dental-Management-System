import { store } from "../../store/store";
import { fetchServices } from "../../features/services/serviceSlice";
import { fetchReviews } from "../../features/reviews/reviewSlice";
import { getAllDoctors } from "../../features/doctors/doctorSlice";

export const homeLoader = ({ request }) => {
  try {
    const url = new URL(request.url);
    const lang = url.searchParams.get("lang") || "en";

    const state = store.getState();

    if (!state.services?.services?.length) {
      store.dispatch(fetchServices({ params: { lang }, isAdmin: false }));
    }

    if (!state.reviews?.reviews?.length) {
      store.dispatch(fetchReviews({ limit: 10, sort: "-rating,-createdAt" }));
    }

    if (!state.doctor?.doctors?.length) {
      store.dispatch(getAllDoctors({ params: { lang } }));
    }

    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
