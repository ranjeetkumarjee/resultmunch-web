import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Guards routes by authentication and (optionally) role.
// Usage: <Route element={<ProtectedRoute role="admin" />}> ... </Route>
const ProtectedRoute = ({ role }) => {
  const { isAuthenticated, role: currentRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Admin may access employee areas; employees may not access admin areas.
  if (role && currentRole !== role && currentRole !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
