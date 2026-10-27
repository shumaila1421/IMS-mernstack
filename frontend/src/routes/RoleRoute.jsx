import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserStore } from "../context/UserContext";

export default function RoleRoute({ allowedRoles }) {
  const { user } = useContext(UserStore);

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard/products" replace />;
  }

  return <Outlet />;
}
