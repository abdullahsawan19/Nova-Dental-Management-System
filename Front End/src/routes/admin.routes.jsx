import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../features/admin/Pages/AdminDashboard";
import MangeBranches from "../pages/admin/MangeBranches";
import { branchesLoader } from "../features/branches/branchesLoader";
import { branchAction } from "../features/branches/branch.action";
import ManageDoctors from "../pages/admin/MangeDoctors";
import { doctorsLoader } from "../features/doctors/doctorsLoader";
import { doctorsAction } from "../features/doctors/doctorsAction";
import ManageUsers from "../pages/admin/MangeUsers";
import { usersLoader } from "../features/users/userLoader";
import { manageUsersAction } from "../features/users/userAction";
import ServicesTable from "../pages/admin/MangeServices";
import { adminServicesLoader } from "../features/services/servicesLoader";
import { serviceAction } from "../features/services/serviceAction";
import { adminReviewsLoader } from "../features/reviews/reviewLoader";
import { reviewAction } from "../features/reviews/reviewAction";
import ManageReviews from "../pages/admin/ManageReviews";
import { adminDashboardLoader } from "../features/admin/adminLoader.js";
import ManageAppointments from "../pages/admin/ManageAppointments.jsx";
import { adminAppointmentsLoader } from "../features/appointments/admin/adminAppointmentsLoader.js";
import { adminAppointmentsAction } from "../features/appointments/admin/adminAppointmentsAction.js";

const adminRoutes = [
  {
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
        loader: adminDashboardLoader,
      },
      {
        path: "appointments",
        element: <ManageAppointments />,
        loader: adminAppointmentsLoader,
        action: adminAppointmentsAction,
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
        action: doctorsAction,
      },
      {
        path: "services",
        element: <ServicesTable />,
        loader: adminServicesLoader,
        action: serviceAction,
      },
      {
        path: "reviews",
        element: <ManageReviews />,
        loader: adminReviewsLoader,
        action: reviewAction,
      },
    ],
  },
];

export default adminRoutes;
