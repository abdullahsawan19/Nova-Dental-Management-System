import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../features/admin/Pages/AdminDashboard";

const adminRoutes = [
  {
    element: <DashboardLayout />,

    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "appointments",
        element: <div>Appointments Page</div>,
      },
      {
        path: "branches",
        element: <div>Branches Page</div>,
      },
      {
        path: "users",
        element: <div>Users Page</div>,
      },
      {
        path: "doctors",
        element: <div>Doctors Page</div>,
      },
      {
        path: "services",
        element: <div>Services Page</div>,
      },
      {
        path: "reviews",
        element: <div>Reviews Page</div>,
      },
    ],
  },
];

export default adminRoutes;
