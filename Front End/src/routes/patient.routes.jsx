import { updateMeAction } from "../features/users/userAction";
import { meLoader } from "../features/users/userLoader";
import { myAppointmentsLoader } from "../features/appointments/appointmentsLoader";
import { myAppointmentsAction } from "../features/appointments/appointmentsAction";
import SuspenseLoader from "../components/ui/SuspenseLoader.jsx";
import { lazy, Suspense } from "react";
const UpdatePatientData = lazy(
  () => import("../pages/General/UpdatePatientData"),
);
const AppointmentsDeatils = lazy(
  () => import("../pages/General/AppointmentsDeatils"),
);
const Appointment = lazy(() => import("../pages/General/appointment"));

const patientRoutes = [
  {
    path: "profile/update",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <UpdatePatientData />
      </Suspense>
    ),
    loader: meLoader,
    action: updateMeAction,
  },
  {
    path: "appointment",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <Appointment />
      </Suspense>
    ),
  },
  {
    path: "my-appointments",
    element: (
      <Suspense fallback={<SuspenseLoader />}>
        <AppointmentsDeatils />
      </Suspense>
    ),
    loader: myAppointmentsLoader,
    action: myAppointmentsAction,
  },
];

export default patientRoutes;
