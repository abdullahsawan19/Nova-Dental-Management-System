import { lazy, Suspense } from "react";
import DocDashboard from "../layouts/DocDashboard";
import {
  doctorAppointmentsLoader,
  doctorProfileLoader,
} from "../features/Doctor/doctorLoader";
import {
  doctorAppointmentsAction,
  doctorProfileAction,
} from "../features/Doctor/doctorAction";
const DoctorAppointment = lazy(
  () => import("../pages/Doctor/DoctorAppointment"),
);
import SuspenseLoader from "../components/ui/SuspenseLoader.jsx";

const doctorRoutes = [
  {
    path: "/doctor",
    element: <DocDashboard />,
    loader: doctorProfileLoader,
    id: "doctor-root",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <DoctorAppointment />
          </Suspense>
        ),
        loader: doctorAppointmentsLoader,
        action: doctorAppointmentsAction,
      },
      {
        path: "appointments",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <DoctorAppointment />
          </Suspense>
        ),
        loader: doctorAppointmentsLoader,
        action: doctorAppointmentsAction,
      },
      {
        path: "my-profile",
        action: doctorProfileAction,
      },
    ],
  },
];

export default doctorRoutes;
