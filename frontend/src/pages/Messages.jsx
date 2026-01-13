import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OnlineUser from "../components/onlineUser";
import ChatUserCard from "../components/ChatUserCard";

function Messages() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);
  const { prevChatUsers } = useSelector((state) => state.message);

  return (
    <div className="w-full min-h-[100vh] flex flex-col bg-gradient-to-b from-black to-gray-900 gap-[20px] p-[20px]">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer lg:hidden"
          onClick={() => {
            navigate(`/`);
          }}
        />
        <h1 className="text-gray-50 text-[20px] font-semibold">Messages</h1>
      </div>

      <div className="w-full">
        <h2 className="text-gray-100 text-[20px] font-semibold px-[20px] mb-[10px]">
          Active Now
        </h2>
        <div className="w-full h-[80px] flex gap-[20px] justify-start items-center overflow-x-auto px-[20px] pb-[10px] border-b-2 border-gray-800">
          {userData?.following?.map((user) =>
            onlineUsers?.includes(user._id) ? (
              <OnlineUser
                key={user._id}
                user={user}
              />
            ) : null
          )}
          {userData?.following?.filter((user) =>
            onlineUsers?.includes(user._id)
          ).length === 0 && (
            <p className="text-gray-100 text-[16px]">
              No one is online right now
            </p>
          )}
        </div>
      </div>

      <div className="w-full flex-1 overflow-auto">
        <h2 className="text-gray-100 text-[20px] font-semibold px-[20px] mb-[10px]">
          Messages
        </h2>
        <div className="w-full flex flex-col">
          {prevChatUsers && prevChatUsers.length > 0 ? (
            prevChatUsers.map((user) => (
              <ChatUserCard
                key={user._id}
                user={user}
              />
            ))
          ) : (
            <div className="text-center text-gray-100 py-[40px]">
              <p>No messages yet</p>
              <p className="text-[16px] mt-[10px]">
                Start chatting with your friends!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
