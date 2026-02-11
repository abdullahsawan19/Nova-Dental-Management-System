import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../features/admin/Pages/AdminDashboard";
import MangeBranches from "../pages/admin/MangeBranches";
import { branchesLoader } from "../features/branches/branchesLoader";
import { branchAction } from "../features/branches/branch.action";
import ManageDoctors from "../pages/admin/MangeDoctors";
import { doctorsLoader } from "../features/doctors/doctorsLoader";
import { doctorAction } from "../features/doctors/doctorAction";
import ManageUsers from "../pages/admin/MangeUsers";
import { usersLoader } from "../features/users/userLoader";
import { manageUsersAction } from "../features/users/userAction";
import ServicesTable from "../pages/admin/MangeServices";
import { adminServicesLoader } from "../features/services/servicesLoader";
import { serviceAction } from "../features/services/serviceAction";

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
        element: <ManageUsers />,
        loader: usersLoader,
        action: manageUsersAction,
      },
      {
        path: "doctors",
        element: <ManageDoctors />,
        loader: doctorsLoader,
        action: doctorAction,
      },
      {
        path: "services",
        element: <ServicesTable />,
        loader: adminServicesLoader,
        action: serviceAction,
      },
      {
        path: "reviews",
        element: <div>Reviews Page</div>,
      },
    ],
  },
];

export default adminRoutes;
