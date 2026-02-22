import DashboardLayout from "../layouts/DashboardLayout";
import { branchesLoader } from "../features/branches/branchesLoader";
import { branchAction } from "../features/branches/branch.action";
import { adminDoctorsLoader } from "../features/doctors/doctorsLoader";
import { doctorsAction } from "../features/doctors/doctorsAction";
import { usersLoader } from "../features/users/userLoader";
import { manageUsersAction } from "../features/users/userAction";
import { adminServicesLoader } from "../features/services/servicesLoader";
import { serviceAction } from "../features/services/serviceAction";
import { adminReviewsLoader } from "../features/reviews/reviewLoader";
import { reviewAction } from "../features/reviews/reviewAction";
import { adminDashboardLoader } from "../features/admin/adminLoader.js";
import { adminAppointmentsLoader } from "../features/appointments/admin/adminAppointmentsLoader.js";
import { adminAppointmentsAction } from "../features/appointments/admin/adminAppointmentsAction.js";
import { faqAction } from "../features/Faq/faqAction.js";
import { adminFaqLoader } from "../features/Faq/faqLoader.js";
import SuspenseLoader from "../components/ui/SuspenseLoader.jsx";
import { lazy, Suspense } from "react";

const AdminDashboard = lazy(
  () => import("../features/admin/Pages/AdminDashboard"),
);
const MangeBranches = lazy(() => import("../pages/admin/MangeBranches"));
const ManageDoctors = lazy(() => import("../pages/admin/MangeDoctors"));
const ManageUsers = lazy(() => import("../pages/admin/MangeUsers"));
const ServicesTable = lazy(() => import("../pages/admin/MangeServices"));
const ManageReviews = lazy(() => import("../pages/admin/ManageReviews"));
const ManageAppointments = lazy(
  () => import("../pages/admin/ManageAppointments.jsx"),
);
const ManageFaq = lazy(() => import("../pages/admin/ManageFaq.jsx"));

const adminRoutes = [
  {
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <AdminDashboard />
          </Suspense>
        ),
        loader: adminDashboardLoader,
      },
      {
        path: "appointments",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ManageAppointments />
          </Suspense>
        ),
        loader: adminAppointmentsLoader,
        action: adminAppointmentsAction,
      },
      {
        path: "branches",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <MangeBranches />
          </Suspense>
        ),
        loader: branchesLoader,
        action: branchAction,
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ManageUsers />
          </Suspense>
        ),
        loader: usersLoader,
        action: manageUsersAction,
      },
      {
        path: "doctors",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ManageDoctors />
          </Suspense>
        ),
        loader: adminDoctorsLoader,
        action: doctorsAction,
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ServicesTable />
          </Suspense>
        ),
        loader: adminServicesLoader,
        action: serviceAction,
      },
      {
        path: "reviews",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ManageReviews />
          </Suspense>
        ),
        loader: adminReviewsLoader,
        action: reviewAction,
      },
      {
        path: "faq",
        element: (
          <Suspense fallback={<SuspenseLoader />}>
            <ManageFaq />
          </Suspense>
        ),
        loader: adminFaqLoader,
        action: faqAction,
      },
    ],
  },
];

export default adminRoutes;
