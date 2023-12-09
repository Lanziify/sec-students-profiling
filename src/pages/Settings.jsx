import React from "react";
import { NavLink } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { logoutUser } = useAuth();
  const settingsItems = [
    {
      option: "Edit Profile",
      path: null,
    },
    {
      option: "Change Password",
      path: "change_password",
    },
  ];
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Settings</h1>
      <div className="mb-2 flex flex-col gap-2">
        {settingsItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="group inline-flex cursor-pointer items-center gap-2"
          >
            <p className="text-sm group-hover:opacity-50">{item.option}</p>
          </NavLink>
        ))}
      </div>
      <div
        className="cursor-pointer text-sm hover:opacity-50"
        onClick={logoutUser}
      >
        Logout
      </div>
    </div>
  );
};

export default Settings;
