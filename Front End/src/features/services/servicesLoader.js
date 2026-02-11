import { store } from "../../store/store";
import { fetchServices } from "../../features/services/serviceSlice";

export const adminServicesLoader = async () => {
  await store.dispatch(fetchServices({ isAdmin: true }));
  return null;
};

export const publicServicesLoader = async ({ request }) => {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") || "en";

  await store.dispatch(fetchServices({ params: { lang }, isAdmin: false }));
  return null;
};
