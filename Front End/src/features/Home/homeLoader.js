import { store } from "../../store/store";
import { fetchServices } from "../../features/services/serviceSlice";
import { fetchReviews } from "../../features/reviews/reviewSlice";
import { getAllDoctors } from "../../features/doctors/doctorSlice";

export const homeLoader = async ({ request }) => {
  console.log("Home loader started...");

  try {
    const url = new URL(request.url);
    const lang = url.searchParams.get("lang") || "en";

    const state = store.getState();

    if (state.services.services.length === 0) {
      await store.dispatch(fetchServices({ params: { lang }, isAdmin: false }));
    } else {
      store.dispatch(fetchServices({ params: { lang }, isAdmin: false }));
    }

    if (state.reviews.reviews.length === 0) {
      await store.dispatch(
        fetchReviews({ limit: 10, sort: "-rating,-createdAt" }),
      );
    } else {
      store.dispatch(fetchReviews({ limit: 20 }));
    }

    if (state.doctor.doctors.length === 0) {
      await store.dispatch(getAllDoctors({ params: { lang } }));
    } else {
      store.dispatch(getAllDoctors({ params: { lang } }));
    }

    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
