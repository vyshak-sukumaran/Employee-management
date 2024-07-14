import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../lib/AuthContext";

const AuthContainer = () => {
    const {user} = useAuthContext()
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="text-black bg-stone-300 w-full h-screen overflow-y-auto relative">
      <Outlet />
    </div>
  );
};

export default AuthContainer;
