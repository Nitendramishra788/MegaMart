import { Navigate, Outlet } from "react-router-dom";

function GuestRoute() {
  const isAuthenticated = false;

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export default GuestRoute;