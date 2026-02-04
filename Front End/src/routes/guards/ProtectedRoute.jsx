import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth); // bring token from store
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
