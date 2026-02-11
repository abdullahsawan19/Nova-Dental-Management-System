import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ allowedRoles }) => {
  const { user, token, isLoading } = useSelector((state) => state.auth || {});

  if (isLoading) return <div>Security Checking...</div>;

  if (token && !user) return <div>Loading User Data...</div>;

  if (allowedRoles.includes(user?.role)) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default RoleGuard;
