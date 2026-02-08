import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../features/admin/Pages/AdminDashboard";
import MangeBranches from "../pages/admin/MangeBranches";
import branchesLoader from "../features/branches/branchesLoader";
import { branchAction } from "../features/branches/branch.action";

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
        element: <MangeBranches />,
        loader: branchesLoader,
        action: branchAction,
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
