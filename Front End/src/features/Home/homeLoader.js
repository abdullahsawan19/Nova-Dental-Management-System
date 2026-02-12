import { store } from "../../store/store";
import { fetchServices } from "../../features/services/serviceSlice";
// import { fetchDoctors } from "../../features/doctors/doctorSlice";

export const homeLoader = async ({ request }) => {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") || "en";

  const state = store.getState();

  const promises = [];

  
  if (state.services.services.length === 0) {
    promises.push(
      store.dispatch(fetchServices({ params: { lang }, isAdmin: false })),
    );
  }


  if (state.doctors.doctors.length === 0) {
    promises.push(
      store.dispatch(fetchDoctors({ params: { lang } }))
    );
  }
  */

  if (promises.length > 0) {
    await Promise.all(promises);
  }

  return null;
};
