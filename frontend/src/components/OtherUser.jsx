import React from "react";
import { useSelector } from "react-redux";
import emptyImage from "../assets/Empty-Image.png";

function OtherUser({ user }) {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-full h-[80px] flex items-center justify-between border-b-2 border-gray-800">
      <div className="flex items-center gap-[10px]">
        <div className="w-[60px] h-[60px] border-2 border-gray-800 rounded-full cursor-pointer overflow-hidden">
          <img
            src={user.profileImage || emptyImage}
            alt="Default Profile Image"
            className="w-full object-cover"
          />
        </div>
        <div>
          <div className="text-[18px] text-gray-100 font-semibold">
            {user.userName}
          </div>
          <div className="text-[15px] text-gray-200 font-semibold">
            {user.name}
          </div>
        </div>
      </div>
      <button className="px-[10px] w-[100px] py-[5px] h-[35px] bg-[white] rounded-2xl hover:text-gray-700 transition-colors cursor-pointer">
        Follow
      </button>
    </div>
  );
}

export default OtherUser;
