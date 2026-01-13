import React, { memo } from "react";
import emptyImage from "../assets/Empty-Image.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/messageSlice";

const OnlineUser = memo(({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedUser(user));
    navigate(`/messageArea`);
  };

  return (
    <div className="w-[60px] h-[60px] flex gap-[20px] justify-start items-center relative flex-shrink-0">
      <div
        className="w-[60px] h-[60px] border-2 border-gray-800 rounded-full cursor-pointer overflow-hidden"
        onClick={handleClick}>
        <img
          src={user?.profileImage || emptyImage}
          alt="Default Profile Image"
          className="w-full h-full object-cover hover:scale-110 transition-transform"
        />
      </div>
      <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-2 right-0"></div>
    </div>
  );
});

OnlineUser.displayName = "OnlineUser";

export default OnlineUser;
