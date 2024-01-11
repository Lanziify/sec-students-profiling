import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeroHeader from "../components/HeroHeader";

const Public = () => {
  const { user } = useAuth();
  return !user ? ( 
    <div className="relative">
      <HeroHeader />
      <div className="bg-white pt-[48px]">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/form" />
  );
};

export default Public;
