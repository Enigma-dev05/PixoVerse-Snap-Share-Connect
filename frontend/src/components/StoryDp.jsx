import React from "react";
import emptyImage from "../assets/Empty-Image.png";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StoryDp({ ProfileImage, userName, story }) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const handleClick = () => {
    // Handle "Your Story" clicks
    if (userName === "Your Story") {
      // Check if current user has a story
      if (!story) {
        navigate("/upload");
      } else {
        navigate(`/story/${userData.userName}`);
      }
    }
    // Handle other users' stories - they will always have a story if they appear in the list
    else {
      navigate(`/story/${userName}`);
    }
  };

  // For "Your Story", check if story exists
  // For other users, they only appear in storyList if they have a story
  const hasStory = userName === "Your Story" ? !!story : true;

  return (
    <div
      className="flex flex-col w-[80px] cursor-pointer"
      onClick={handleClick}>
      <div
        className={`w-[80px] h-[80px] ${
          hasStory ? "bg-gradient-to-br from-gray-500 to-gray-600 p-[3px]" : ""
        } rounded-full flex justify-center items-center flex-shrink-0`}>
        <div className="w-[70px] h-[70px] border-[3px] border-gray-900 bg-gray-900 rounded-full relative">
          <img
            src={ProfileImage || emptyImage}
            alt={`${userName}'s Profile`}
            className="w-full h-full object-cover rounded-full"
          />
          {!hasStory && userName === "Your Story" && (
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-[2px]">
              <FiPlusCircle className="text-white w-[18px] h-[18px]" />
            </div>
          )}
        </div>
      </div>
      <div className="text-[12px] text-center truncate w-full text-white mt-1">
        {userName}
      </div>
    </div>
  );
}

export default StoryDp;
