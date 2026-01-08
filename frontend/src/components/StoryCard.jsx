import React, { useEffect, useState } from "react";
import emptyImage from "../assets/Empty-Image.png";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

function StoryCard() {
  const navigate = useNavigate();
  const { storyData } = useSelector((state) => state.story);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/");
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [navigate]);

  // return (
  //   <div className="w-full max-w-[600px] h-[100vh] border-x-2 border-gray-400 pt-[10px] relative flex flex-col justify-center">
  //     <div className="flex items-center gap-[18px] absolute top-[22px] px-[10px]">
  //       <MdOutlineKeyboardBackspace
  //         className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer"
  //         onClick={() => {
  //           navigate("/");
  //         }}
  //       />
  //       <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-gray-800">
  //         <img
  //           src={storyData?.author?.profileImage || emptyImage}
  //           className="w-full h-full object-cover"
  //           alt="author"
  //         />
  //       </div>
  //       <span className="font-semibold text-gray-50 truncate">
  //         {storyData?.author?.userName}
  //       </span>
  //     </div>

  //     <div className="w-full h-[100vh] px-[10px] mt-[100px]">
  //       {storyData.mediaType === "image" && (
  //         <img
  //           src={storyData.media}
  //           alt="Story"
  //           className="w-full max-h-[600px] object-contain rounded-2xl"
  //         />
  //       )}

  //       {storyData.mediaType === "video" && (
  //         <VideoPlayer media={storyData.media} />
  //       )}

  //       <div className="absolute top-0 w-full h-[5px] bg-gray-600">
  //         <div
  //           className="bg-white h-full w-[200px] transition-all duration-200 ease-linear mr-5"
  //           style={{ width: `${progress}%` }}></div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full max-w-[600px] h-[100vh] border-x-2 border-gray-400 relative flex flex-col bg-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-[150] p-2 bg-gradient-to-b from-black/60 to-transparent">
        <div className="w-full h-[3px] bg-gray-600 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-white transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex items-center gap-[15px] px-1">
          <MdOutlineKeyboardBackspace
            className="w-[40px] h-[40px] text-white cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/")}
          />

          <div className="w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-500 ">
            <img
              src={storyData?.author?.profileImage || emptyImage}
              className="w-full h-full object-cover"
              alt="author"
            />
          </div>

          <span className="font-semibold text-white text-[15px] truncate">
            {storyData?.author?.userName}
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center mt-[60px]">
        {storyData.mediaType === "image" ? (
          <img
            src={storyData.media}
            alt="Story"
            className="w-full max-h-[85vh] object-contain"
          />
        ) : (
          <VideoPlayer media={storyData.media} />
        )}
      </div>
    </div>
  );
}

export default StoryCard;
