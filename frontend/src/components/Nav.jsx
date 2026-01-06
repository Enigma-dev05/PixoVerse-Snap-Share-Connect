import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import emptyImage from "../assets/Empty-Image.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-[90%] lg:w-[40%] h-[60px] bg-gradient-to-b from-black to-gray-950 border-2 border-gray-500 flex justify-around items-center fixed bottom-5 left-1/2 -translate-x-1/2 rounded-full shadow-2xl shadow-gray-800 z-[100]">
      <div onClick={() => navigate("/")}>
        <GoHomeFill className="text-white w-[25px] h-[25px] cursor-pointer" />
      </div>
      <div>
        <FiSearch className="text-white w-[25px] h-[25px] cursor-pointer" />
      </div>
      <div onClick={() => navigate("/upload")}>
        <FiPlusSquare className="text-white w-[25px] h-[25px] cursor-pointer" />
      </div>
      <div onClick={() => navigate("/loops")}>
        <RxVideo className="text-white w-[30px] h-[30px] cursor-pointer" />
      </div>
      <div
        className="w-[45px] h-[45px] border-2 border-gray-800 rounded-full cursor-pointer overflow-hidden"
        onClick={() => navigate(`/profile/${userData.userName}`)}>
        <img
          src={userData.profileImage || emptyImage}
          alt="Default Profile Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Nav;
