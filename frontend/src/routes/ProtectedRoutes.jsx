import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  let isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
