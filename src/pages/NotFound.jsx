import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-center text-gray-500">
      <div>
        <h1 className="text-2xl font-black">Oops! Page Not Found.</h1>
        <p>The page you are trying to access could not be found.</p>
      </div>
    </div>
  );
};

export default NotFound;
