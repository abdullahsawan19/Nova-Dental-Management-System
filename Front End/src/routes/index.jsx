import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Error from "../components/Error";

import ProtectedRoute from "./guards/ProtectedRoute";
import RoleGuard from "./guards/RoleGuard";

import adminRoutes from "./admin.routes";
import doctorRoutes from "./doctor.routes";
import patientRoutes from "./patient.routes";
import publicRoutes from "./public.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      ...publicRoutes,

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <RoleGuard allowedRoles={["patient"]} />,
            children: patientRoutes,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={["admin"]}>
          <DashboardLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: adminRoutes,
  },
  {
    path: "/doctor",
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={["doctor"]}>
          <DashboardLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: doctorRoutes,
  },
]);

export default router;
