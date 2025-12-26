import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import React from "react";

function Upload() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100vh] flex flex-col items-center bg-gradient-to-b from-black to-gray-900">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <h1 className="text-gray-50 text-[20px] font-semibold ml-[8px]">
          Upload Media
        </h1>
      </div>

      <div className="w-[75%] max-w-[600px] h-[50px] bg-gray-50 rounded-full flex justify-around items-center gap-[20px]">
        <div>Post</div>
        <div>Story</div>
        <div>Loop</div>
      </div>
    </div>
  );
}

export default Upload;
