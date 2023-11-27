import React from "react";
import { MdMenu } from "react-icons/md";

const Header = (props) => {
  return (
    <div className="invisible left-0 right-0 top-0 z-20 hidden bg-blue-500 max-sm:visible max-sm:fixed max-sm:block">
      <div className="m-auto max-w-7xl p-2">
        <div className="p-1 text-white rounded-md bg-blue-600 w-fit" onClick={props.onMenuClick}>
            <MdMenu size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
