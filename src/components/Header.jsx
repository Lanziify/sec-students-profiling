import React from "react";
import { MdMenu, MdPerson } from "react-icons/md";
import { useLocation } from "react-router-dom";
import SesLogo from "../assets/ses-logo.jpg";

const Header = (props) => {
  const location = useLocation();

  return (
    <div className="left-0 right-0 top-0 z-20  bg-blue-500 fixed">
      <div className="m-auto flex items-center justify-between p-2">
        <div
          className="w-fit rounded-md bg-blue-600 select-none cursor-pointer p-1 text-white"
          onClick={props.onMenuClick}
        >
          <MdMenu size={24} />
        </div>
        <div>
          <h1 className="font-bold text-white uppercase lg:hidden">
            {location.pathname.split("/")[1] === "" ? "home" : location.pathname.split("/")[1]}
          </h1>
        </div>
        <div className="w-fit rounded-full bg-blue-600 p-1 text-white">
          <img src={SesLogo} alt="logo" className="w-6 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
