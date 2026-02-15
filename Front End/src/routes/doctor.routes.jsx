import DocDashboard from "../layouts/DocDashboard";
import {
  doctorAppointmentsLoader,
  doctorProfileLoader,
} from "../features/Doctor/doctorLoader";
import {
  doctorAppointmentsAction,
  doctorProfileAction,
} from "../features/Doctor/doctorAction";
import DoctorAppointment from "../pages/Doctor/DoctorAppointment";

const doctorRoutes = [
  {
    path: "/doctor",
    element: <DocDashboard />,
    loader: doctorProfileLoader,
    id: "doctor-root",
    children: [
      {
        index: true,
        element: <DoctorAppointment />,
        loader: doctorAppointmentsLoader,
        action: doctorAppointmentsAction,
      },
      {
        path: "appointments",
        element: <DoctorAppointment />,
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
