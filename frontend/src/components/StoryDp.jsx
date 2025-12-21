import React from "react";
import emptyImage from "../assets/Empty-Image.png";

function StoryDp({ ProfileImage, userName }) {
  return (
    <div className="flex flex-col w-[80px]">
      <div className="w-[80px] h-[80px] bg-gradient-to-b from-slate-600 to-gray-900 rounded-full flex justify-center items-center flex-shrink-0 ">
        <div className="w-[70px] h-[70px] border-2 border-gray-800 rounded-full cursor-pointer overflow-hidden ">
          <img
            src={ProfileImage || emptyImage}
            alt={`${userName}'s Profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="text-[14px] text-center truncate w-full text-white">
        {userName}
      </div>
    </div>
  );
}

export default StoryDp;
