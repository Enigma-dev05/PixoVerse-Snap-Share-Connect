import React, { memo } from "react";
import emptyImage from "../assets/Empty-Image.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/messageSlice";

const ChatUserCard = memo(({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.socket);

  const isOnline = onlineUsers?.includes(user._id);

  const handleClick = () => {
    dispatch(setSelectedUser(user));
    navigate(`/messageArea`);
  };

  const getLastMessagePreview = () => {
    if (user.lastMessage) {
      if (user.lastMessage.image && !user.lastMessage.message) {
        return "Photo";
      }
      return (
        user.lastMessage.message?.substring(0, 30) +
        (user.lastMessage.message?.length > 30 ? "..." : "")
      );
    }
    return "Start a conversation";
  };

  return (
    <div
      className="w-full flex items-center gap-[15px] p-[15px] hover:bg-gray-800/50 rounded-lg cursor-pointer transition-colors"
      onClick={handleClick}>
      <div className="relative flex-shrink-0">
        <div className="w-[55px] h-[55px] border-2 border-gray-700 rounded-full overflow-hidden">
          <img
            src={user?.profileImage || emptyImage}
            alt={user?.username}
            className="w-full h-full object-cover"
          />
        </div>
        {isOnline && (
          <div className="w-[12px] h-[12px] bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-gray-900"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-100 font-semibold text-[16px] truncate">
            {user?.name || user?.username}
          </h3>
          {user?.updatedAt && (
            <span className="text-gray-500 text-[12px]">
              {new Date(user.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-[14px] truncate">
          {getLastMessagePreview()}
        </p>
      </div>
    </div>
  );
});

ChatUserCard.displayName = "ChatUserCard";

export default ChatUserCard;
