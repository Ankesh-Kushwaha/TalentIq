import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorised" replace />;
  }

  return <Outlet />; // ✅ ONLY outlet
}
