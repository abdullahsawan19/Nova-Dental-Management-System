import { Navigate } from "react-router-dom";
import Appointments from "../Appointments";
import DashboardLayout from "../layouts/DashboardLayout";
const adminRoutes = [
  {
    element: <DashboardLayout />,

    children: [
      {
        path: "dashboard",
        element: <Navigate to="appointments" replace />,
      },
      {
        path: "dashboard/appointments",
        element: <Appointments />,
      },
      {
        path: "users",
        // element: <Users />,
      },
      {
        path: "doctors",
        // element: <Doctors />,
      },
      {
        path: "branch",
        // element: <Branch />,
      },
      {
        path: "faq",
        // element: <Faq />,
        // loader: "#",
      },
      {
        path: "chat",
        // element: <Chat />,
        // loader: "#",
      },
      {
        path: "reviews",
        // element: <Reviews />,
        // loader: "#",
      },
      {
        path: "services",
        // element: <Services />,
        // loader: "#",
      },
    ],
  },
];

export default adminRoutes;
