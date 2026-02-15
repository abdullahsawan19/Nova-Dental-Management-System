import { store } from "../../store/store";
import { getAllUsers } from "../users/userSlice";
import { getAllDoctors } from "../doctors/doctorSlice";
import { fetchAllAppointments } from "../appointments/appointmentsSlice";

export const adminDashboardLoader = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [usersResponse, doctorsResponse, appointmentsResponse] =
      await Promise.all([
        store.dispatch(getAllUsers({ role: "patient" })).unwrap(),
        store.dispatch(getAllDoctors()).unwrap(),
        store.dispatch(fetchAllAppointments({ date: today })).unwrap(),
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

    const appointmentsToday =
      appointmentsResponse?.results ||
      appointmentsResponse?.data?.appointments?.length ||
      0;

    console.log("Admin Stats Loaded:", {
      patientsCount,
      doctorsCount,
      appointmentsToday,
    });

    return {
      patientsCount,
      doctorsCount,
      appointmentsToday,
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
