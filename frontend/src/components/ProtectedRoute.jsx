import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../lib/AuthContext";

const ProtectedRoute = () => {
    const { user } = useAuthContext()
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
