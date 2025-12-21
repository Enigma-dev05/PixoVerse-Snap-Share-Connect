import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import emptyImage from "../assets/Empty-Image.png";

function Nav() {
  return (
    //<div className="w-[90%] lg:w-[40%] h-[60px] bg-gray-800 border-2 border-gray-600 flex justify-around items-center fixed bottom-5 rounded-full shadow-2xl shadow-gray-800 z-[100]">
    <div className="w-[90%] lg:w-[40%] h-[60px] bg-gradient-to-b from-black to-gray-950 border-2 border-gray-500 flex justify-around items-center fixed bottom-5 left-1/2 -translate-x-1/2 rounded-full shadow-2xl shadow-gray-800 z-[100]">
      <div>
        <GoHomeFill className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <FiSearch className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <FiPlusSquare className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <RxVideo className="text-white w-[30px] h-[30px]" />
      </div>
      <div className="w-[45px] h-[45px] border-2 border-gray-800 rounded-full cursor-pointer overflow-hidden">
        <img
          src={emptyImage}
          alt="Default Profile Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Nav;
