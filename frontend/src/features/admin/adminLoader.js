import { store } from "../../store/store";
import { getAllUsers } from "../users/userSlice";
import { fetchAdminDoctors } from "../doctors/doctorSlice";
import { fetchAllAppointments } from "../appointments/appointmentsSlice";

export const adminDashboardLoader = async () => {
  try {
    const [usersResponse, doctorsResponse, appointmentsResponse] =
      await Promise.all([
        store.dispatch(getAllUsers({ role: "patient" })).unwrap(),
        store.dispatch(fetchAdminDoctors()).unwrap(),
        store.dispatch(fetchAllAppointments()).unwrap(),
      ]);

    const patientsCount =
      usersResponse?.metadata?.totalDocs ||
      usersResponse?.results ||
      usersResponse?.data?.users?.length ||
      0;

    const doctorsCount =
      doctorsResponse?.results || doctorsResponse?.data?.doctors?.length || 0;

    const allAppointments = appointmentsResponse?.data?.appointments || [];

    const todayObj = new Date();
    const year = todayObj.getFullYear();
    const month = String(todayObj.getMonth() + 1).padStart(2, "0");
    const day = String(todayObj.getDate()).padStart(2, "0");
    const todayFormatted = `${year}-${month}-${day}`;

    const appointmentsToday = allAppointments.filter((app) => {
      if (!app.date) return false;
      const appDateOnly = app.date.split("T")[0];
      return appDateOnly === todayFormatted;
    }).length;

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
