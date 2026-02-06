import DocDashboard from "../layouts/DocDashboard";
import DoctorAppointment from "../DoctorAppointment";
import { Navigate } from "react-router-dom";
const doctorRoutes = [
  {
    element: <DocDashboard />,
    children: [
      {
        path: "dashboard",
        element: <Navigate to="appointments" replace />,
      },
      {
        path: "dashboard/appointments",
        element: <DoctorAppointment />,
        // loader: "#",
      },
      {
        path: "my-profile",
        // element: <DoctorProfile />,
        // loader: "#",
      },
    ],
  },
];

export default doctorRoutes;
