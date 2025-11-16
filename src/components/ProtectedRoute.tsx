import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const havePermissions = !!(user && user.role !== "student");

  if (!user) return <Navigate to="/login" />;
  if (!havePermissions) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute;
