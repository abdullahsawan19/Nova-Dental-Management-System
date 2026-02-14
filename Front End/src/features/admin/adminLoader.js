import { store } from "../../store/store";
import { getAllUsers } from "../users/userSlice";
import { getAllDoctors } from "../doctors/doctorSlice";

export const adminDashboardLoader = async () => {
  try {
    const [usersResponse, doctorsResponse] = await Promise.all([
      store.dispatch(getAllUsers({ role: "patient" })).unwrap(),
      store.dispatch(getAllDoctors()).unwrap(),
    ]);

    const patientsCount =
      usersResponse?.metadata?.totalDocs ||
      usersResponse?.results ||
      usersResponse?.data?.users?.length ||
      0;

    const doctorsCount =
      doctorsResponse?.metadata?.totalDocs ||
      doctorsResponse?.results ||
      doctorsResponse?.data?.doctors?.length ||
      0;

    console.log("Admin Stats Loaded:", { patientsCount, doctorsCount });

    return {
      patientsCount,
      doctorsCount,
      appointmentsToday: 0,
    };
  } catch (error) {
    console.error("Failed to load admin stats", error);
    return {
      patientsCount: 0,
      doctorsCount: 0,
      appointmentsToday: 0,
    };
  }
};
