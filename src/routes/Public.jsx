import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Public = () => {
  const { user } = useAuth();
  return !user ? (
    <div className="relative m-auto flex min-h-screen max-w-7xl gap-2 p-2">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Public;
