import React from "react";
import emptyImage from "../assets/Empty-Image.png";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StoryDp({ ProfileImage, userName, story }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const handleClick = () => {
    if ((!story || story.length === 0) && userName === "Your Story") {
      navigate("/upload");
    } else if ((story || story.length > 0) && userName === "Your Story") {
      navigate(`/story/${userData.userName}`);
    }
  };
  return (
    <div
      className="flex flex-col w-[80px] cursor-pointer"
      onClick={handleClick}>
      <div
        className={`w-[80px] h-[80px]  ${
          story && story.length > 0
            ? "bg-gradient-to-b from-gray-500 to-gray-700"
            : ""
        } rounded-full flex justify-center items-center flex-shrink-0`}>
        <div className="w-[70px] h-[70px] border-2 border-gray-800 rounded-full relative">
          <img
            src={ProfileImage || emptyImage}
            alt={`${userName}'s Profile`}
            className="w-full h-full object-cover rounded-full"
          />
          {(!story || story.length === 0) && userName === "Your Story" && (
            <div
              className="absolute bottom-0 right-0 bg-gray-50
             rounded-full">
              <FiPlusCircle className="text-gray-900 w-[20px] h-[20px]" />
            </div>
          )}
        </div>
      </div>
      <div className="text-[14px] text-center truncate w-full text-white">
        {userName}
      </div>
    </div>
  );
}

export default StoryDp;
