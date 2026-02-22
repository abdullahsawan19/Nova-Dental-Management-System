import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Error from "../components/common/Error";

import ProtectedRoute from "./guards/ProtectedRoute";
import RoleGuard from "./guards/RoleGuard";

import adminRoutes from "./admin.routes";
import doctorRoutes from "./doctor.routes";
import patientRoutes from "./patient.routes";
import publicRoutes from "./public.routes";

import { loginAction } from "../features/auth/Login.actions";
import { loginLoader } from "../features/auth/login.Loader";
import { signUpLoader } from "../features/auth/SignUp.Loader.js";
import { signUpAction } from "../features/auth/Signup.actions.js";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../features/auth/LoginForm.jsx";
import Signup from "../features/auth/SignupForm.jsx";
import { store } from "../store/store.js";
import { getBranch } from "../features/branches/branchSlice.js";

const rootLoader = async () => {
  const state = store.getState();
  if (!state.branches.activeBranch) {
    await store.dispatch(getBranch());
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    loader: rootLoader,
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
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
      },
      {
        path: "/signup",
        element: <Signup />,
        loader: signUpLoader,
        action: signUpAction,
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
