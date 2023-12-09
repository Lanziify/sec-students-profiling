import React from "react";
import { useAuth } from "../context/AuthContext";
import { MdEditDocument, MdFolder,  MdPerson, MdSettings } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import Portal from "./Portal";

const Menu = (props) => {
  const { user, logoutUser } = useAuth();
  const location = useLocation()

  const menu = [
    {
      name: "School Form",
      path: "/",
      icon: <MdEditDocument size={18} />,
    },
    {
      name: "Students Record",
      path: "records",
      icon: <MdFolder size={18} />,
    },
    {
      name: "Settings",
      path: "settings",
      icon: <MdSettings size={18} />,
    },
  ];
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {}
  };

  if (window.innerWidth <= 640 && props.showMenu) {
    document.body.classList.add("menu-shown");
  } else {
    document.body.classList.remove("menu-shown");
  }

  if (!props.showMenu) return;

  if (location.pathname.split("/").includes('print') && window.innerWidth > 640) return

  return (
    <div className="max:sm:bottom-0 sticky bottom-0 top-2 z-10 flex  max-h-[calc(100vh_-_16px)] flex-col justify-between overflow-hidden rounded-md border bg-white max-sm:fixed max-sm:left-0 max-sm:right-0 max-sm:top-12 max-sm:max-h-full max-sm:rounded-none max-sm:border-none">
      <div className="">
        <div className="bg-blue-500 p-4 text-white">
          <div className="mb-4">
            <h1 className="text-center text-xl font-bold">
              Sayon Elementary School
            </h1>
            <h2 className="text-center text-sm">Students Management System</h2>
          </div>
          <div className="m-auto mb-4 flex aspect-square w-24 items-center justify-center rounded-full bg-blue-600">
            <p className="text-xs">Logo</p>
          </div>
          <div className="m-auto flex w-fit items-center justify-center gap-1 ">
            <div className="rounded-md bg-green-500 p-1 text-white">
              <MdPerson size={14} />
            </div>
            <span className="font-bold">{user.displayName}</span>
          </div>
        </div>
        <div className="p-4 text-sm">
          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={props.onMenuClick}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-2 py-1 ${
                  isActive
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "hover:bg-black/10 hover:opacity-70"
                } `
              }
            >
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="p-4">
        <button
          className="w-full rounded-md bg-gray-700 px-2 py-1 text-sm font-semibold text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
