import React from "react";
import { Link } from "react-scroll";
import SesLogo from "../assets/ses-logo.jpg";

const links = [
  {
    path: "home",
    name: "Home",
  },
  {
    path: "about",
    name: "About",
  },
  {
    path: "contact",
    name: "Contact",
  },
];

const HeroHeader = (props) => {
  return (
    <div className="fixed left-0 right-0 top-0  z-20 bg-blue-500 shadow-md">
      <div className="m-auto flex items-center justify-between p-2">
        <div
          className="flex w-fit cursor-pointer select-none gap-2 rounded-md bg-blue-600 p-1 text-white"
          onClick={props.onMenuClick}
        >
          <img src={SesLogo} alt="logo" className="w-6 h-6 rounded-md" />
        </div>
        <div>
          <ul className="flex items-center gap-4 text-white [&>li]:cursor-pointer">
            {links.map((link, index) => (
              <li key={index} className="relative">
                <Link
                  activeClass="after:absolute after:left-0 after:right-0 after:-bottom-1 after:rounded-md after:h-1 after:bg-white after:transition-all after:duration-300"
                  to={link.path}
                  spy={true}
                  smooth={true}
                  offset={link.offset || 0}
                  duration={500}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
