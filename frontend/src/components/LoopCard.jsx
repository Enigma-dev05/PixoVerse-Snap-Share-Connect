import React, { useEffect, useRef, useState, memo } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import emptyImage from "../assets/Empty-Image.png";
import FollowButton from "./FollowButton";
import { useSelector, useDispatch } from "react-redux";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import { serverUrl } from "../App";
import axios from "axios";
import { setLoopData } from "../redux/loopSlice";
import { IoSendSharp } from "react-icons/io5";

const LoopCard = memo(({ loop }) => {
  const videoRef = useRef();
  const commentRef = useRef();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [message, setMessage] = useState("");

  const { userData } = useSelector((state) => state.user);
  const { loopData } = useSelector((state) => state.loop);
  const { socket } = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    }
  };

  const handleClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleLike = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/loop/like/${loop._id}`, {
        withCredentials: true,
      });

      const updatedLoops = loopData.map((l) =>
        l._id === loop._id ? result.data : l
      );
      dispatch(setLoopData(updatedLoops));
    } catch (error) {
      console.error("Error liking loop:", error);
    }
  };

  const handleComment = async () => {
    if (!message.trim()) return;

    try {
      const result = await axios.post(
        `${serverUrl}/api/loop/comment/${loop._id}`,
        { message },
        { withCredentials: true }
      );

      const updatedLoops = loopData.map((l) =>
        l._id === loop._id ? result.data : l
      );

      dispatch(setLoopData(updatedLoops));
      setMessage("");
    } catch (error) {
      console.error("Error commenting on loop:", error);
    }
  };

  const handleLikeOnDoubleClick = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);

    if (!loop.likes?.includes(userData._id)) {
      handleLike();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setShowComment(false);
      }
    };

    if (showComment) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showComment]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;

        if (video) {
          if (entry.isIntersecting) {
            video
              .play()
              .catch((error) => console.log("Auto-play blocked:", error));
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleLikedLoop = (updatedData) => {
      const updatedLoops = loopData.map((l) =>
        l._id === updatedData.loopId ? { ...l, likes: updatedData.likes } : l
      );
      dispatch(setLoopData(updatedLoops));
    };

    const handleCommentedLoop = (updatedData) => {
      const updatedLoops = loopData.map((l) =>
        l._id === updatedData.loopId
          ? { ...l, comments: updatedData.comments }
          : l
      );
      dispatch(setLoopData(updatedLoops));
    };

    socket.on("likedLoop", handleLikedLoop);
    socket.on("commentedLoop", handleCommentedLoop);

    return () => {
      socket.off("likedLoop", handleLikedLoop);
      socket.off("commentedLoop", handleCommentedLoop);
    };
  }, [socket, loopData, dispatch]);

  if (!loop || !loop.author) {
    return null;
  }

  return (
    <div className="w-full lg:w-[600px] h-screen flex items-center justify-center border-l border-r border-gray-700 relative bg-black overflow-hidden">
      {showHeart && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heart-animation z-50">
          <GoHeartFill className="w-[150px] h-[150px] text-red-500 drop-shadow-2xl animate-ping" />
        </div>
      )}

      <div
        ref={commentRef}
        className={`absolute z-[200] bottom-0 w-full h-[500px] p-[10px] rounded-t-3xl bg-gradient-to-b from-gray-800 to-gray-900 transition-transform duration-500 ease-in-out left-0 shadow-2xl shadow-gray-900 ${
          showComment ? "translate-y-0" : "translate-y-[100%]"
        }`}>
        <h1 className="text-gray-50 text-[22px] text-center font-semibold mb-[15px]">
          Comments
        </h1>

        <div className="w-full h-[350px] overflow-y-auto flex flex-col gap-[15px] px-[5px]">
          {loop.comments.length === 0 ? (
            <div className="text-center text-gray-400 text-[18px] mt-[100px]">
              No comments yet. Be the first!
            </div>
          ) : (
            loop.comments.map((com, index) => (
              <div
                key={com._id || index}
                className="w-full flex items-start gap-[12px]">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
                  <img
                    src={com.author?.profileImage || emptyImage}
                    className="w-full h-full object-cover"
                    alt={com.author?.userName}
                  />
                </div>
                <div className="flex-1 bg-gray-700 rounded-2xl px-[16px] py-[10px]">
                  <div className="font-semibold text-gray-100 text-[14px] mb-[4px]">
                    {com.author?.userName}
                  </div>
                  <div className="text-gray-300 text-[14px] break-words">
                    {com.message}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-[10px] absolute bottom-[20px] left-[10px] right-[10px]">
          <div className="w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
            <img
              src={userData?.profileImage || emptyImage}
              className="w-full h-full object-cover"
              alt="you"
            />
          </div>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleComment()}
            placeholder="Add a comment..."
            className="flex-1 bg-gray-800 border border-gray-600 rounded-full outline-none text-gray-50 px-[16px] py-[12px] text-[16px]"
          />

          {message.trim() && (
            <IoSendSharp
              className="w-[24px] h-[24px] cursor-pointer text-blue-400 hover:scale-110 transition-transform flex-shrink-0"
              onClick={handleComment}
            />
          )}
        </div>
      </div>

      <video
        ref={videoRef}
        src={loop?.media}
        className="w-full h-full object-cover"
        loop
        muted={isMute}
        autoPlay
        playsInline
        onClick={handleClick}
        onTimeUpdate={handleTimeUpdate}
        onDoubleClick={handleLikeOnDoubleClick}
      />

      <div
        className="absolute top-[20px] right-[20px] z-[100] cursor-pointer hover:scale-110 transition-transform bg-black/30 rounded-full p-[10px]"
        onClick={() => setIsMute((prev) => !prev)}>
        {!isMute ? (
          <FiVolume2 className="w-[28px] h-[28px] text-gray-50" />
        ) : (
          <FiVolumeX className="w-[28px] h-[28px] text-gray-50" />
        )}
      </div>

      <div className="absolute bottom-0 w-full h-[3px] bg-gray-600">
        <div
          className="bg-white h-full transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full absolute bottom-[10px] px-[10px] py-[5px] flex flex-col gap-[10px]">
        <div className="flex items-center gap-[15px]">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden border-2 border-gray-800">
            <img
              src={loop.author?.profileImage || emptyImage}
              className="w-full h-full object-cover"
              alt={loop.author?.userName}
            />
          </div>
          <span className="font-semibold text-gray-50 truncate flex-1">
            {loop.author?.userName}
          </span>
          {userData._id !== loop.author._id && (
            <FollowButton
              targetUserId={loop.author?._id}
              tailwind="px-[10px] py-[5px] text-gray-50 border-2 text-[16px] rounded-2xl border-gray-50 hover:bg-white hover:text-black transition-all"
            />
          )}
        </div>

        {loop.caption && (
          <div className="text-gray-50 text-[14px] pl-[5px] line-clamp-2">
            {loop.caption}
          </div>
        )}

        <div className="absolute right-[15px] flex flex-col gap-[25px] text-white bottom-[150px] z-[100]">
          <div className="flex flex-col items-center">
            <div className="hover:scale-110 transition-transform cursor-pointer bg-black/30 rounded-full p-[8px]">
              {!loop.likes.includes(userData._id) ? (
                <GoHeart
                  className="w-[30px] h-[30px]"
                  onClick={handleLike}
                />
              ) : (
                <GoHeartFill
                  className="w-[30px] h-[30px] text-red-600"
                  onClick={handleLike}
                />
              )}
            </div>
            <span className="text-[14px] font-semibold mt-[4px]">
              {loop.likes.length}
            </span>
          </div>

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setShowComment(true)}>
            <div className="hover:scale-110 transition-transform bg-black/30 rounded-full p-[8px]">
              <MdOutlineComment className="w-[30px] h-[30px]" />
            </div>
            <span className="text-[14px] font-semibold mt-[4px]">
              {loop.comments.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

LoopCard.displayName = "LoopCard";

export default LoopCard;
