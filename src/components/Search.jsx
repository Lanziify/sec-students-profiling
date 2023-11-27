import React from "react";
import { IoSearch } from "react-icons/io5";

const Search = (props) => {
  return (
    <div className="w-full p-4">
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-md border py-2 pl-10"
          placeholder="Search"
          onChange={props.onChange}
        />
        <div className="absolute bottom-0 left-0 top-0 m-1.5 flex aspect-square items-center justify-center rounded-md border bg-blue-500 text-white">
          <IoSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
