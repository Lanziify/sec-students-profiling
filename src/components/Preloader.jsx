import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Preloader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-16 gap-2 animate-pulse">
      <div className="bg-blue-500 p-2 rounded-full animate-bounce text-blue-500 delay-100"></div>
      <div className="bg-blue-500 p-2 rounded-full animate-bounce text-blue-500 delay-200"></div>
      <div className="bg-blue-500 p-2 rounded-full animate-bounce text-blue-500"></div>
    </div>
  );
};

export default Preloader;
