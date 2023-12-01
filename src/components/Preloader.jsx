import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Preloader = () => {
  return (
    <div className="h-screen w-screen p-16 flex items-center justify-center flex-col animate-pulse">
      <div className="flex items-center gap-2 justify-center mb-1">
        <div className="bg-blue-500 p-2 rounded-full animate-bounce text-blue-500 duration-100 delay-50"></div>
        <div className="bg-blue-500 p-2 rounded-full animate-bounce text-blue-500 duration-300 delay-150"></div>
        <div className="bg-blue-500 p-2 rounded-full animate-bounce text-blue-500"></div>
      </div>
      <h1 className="text-md text-blue-500 font-bold">Loading</h1>
    </div>
  );
};

export default Preloader;
