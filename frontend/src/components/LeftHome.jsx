import React from "react";
import logo from "../assets/Pixoverse-u.png";
import emptyImage from "../assets/Empty-Image.png";
import { FaRegHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";

function LeftHome() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh] bg-gradient-to-b from-black to-gray-900 border-r-2 border-gray-800">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
        <img
          src={logo}
          alt="Logo of PixoVerse"
          className="w-[20%]"
        />
        <div>
          <FaRegHeart className="text-white w-[30px] h-[30px]" />
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <div className="w-[70px] h-[70px] border-2 border-gray-800 rounded-full cursor-pointer overflow-hidden">
          <img
            src={userData.profileImage || emptyImage}
            alt="Default Profile Image"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default LeftHome;
