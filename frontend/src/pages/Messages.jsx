import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OnlineUser from "../components/onlineUser";

function Messages() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);
  return (
    <div className="w-full min-h-[100vh] flex flex-col bg-gradient-to-b from-black to-gray-900 gap-[20px] p-[20px]">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer lg:hidden "
          onClick={() => {
            navigate(`/`);
          }}
        />
        <h1 className="text-gray-50 text-[20px] font-semibold ml-[8px]">
          Message
        </h1>
      </div>

      <div className="w-full h-[80px] flex gap-[20px] justify-start items-center overflow-x-auto p-[20px] border-b-2 border-gray-800">
        {userData.following.map(
          (user, index) =>
            onlineUsers?.includes(user._id) && <OnlineUser user={user} />
        )}
      </div>
    </div>
  );
}

export default Messages;
