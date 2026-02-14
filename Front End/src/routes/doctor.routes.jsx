import DocDashboard from "../layouts/DocDashboard";
import DoctorAppointment from "../DoctorAppointment";
import { Navigate } from "react-router-dom";

import { doctorProfileLoader } from "../features/Doctor/doctorLoader";
import { doctorProfileAction } from "../features/Doctor/doctorAction";

const doctorRoutes = [
  {
    element: <DocDashboard />,
    loader: doctorProfileLoader,
    id: "doctor-root",
    children: [
      {
        index: true,
        element: <Navigate to="appointments" replace />,
      },
      {
        path: "appointments",
        element: <DoctorAppointment />,
        // loader: appointmentsLoader,
      },
      {
        path: "my-profile",
        action: doctorProfileAction,
      },
    ],
  },
];

export default doctorRoutes;
