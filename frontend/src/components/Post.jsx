import React, { useState } from "react";
import axios from "axios";
import emptyImage from "../assets/Empty-Image.png";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import { serverUrl } from "../App";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineComment, MdBookmarkBorder } from "react-icons/md";
import { GoBookmarkFill } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";
import { setPostData } from "../redux/postSlice";
import { setUserData } from "../redux/userSlice";
import FollowButton from "./FollowButton";

function Post({ post }) {
  const { userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);

  const [showComment, setShowComment] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/post/like/${post._id}`, {
        withCredentials: true,
      });

      const updatedPosts = postData.map((p) =>
        p._id === post._id ? result.data : p
      );
      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    if (!message.trim()) return;

    try {
      const result = await axios.post(
        `${serverUrl}/api/post/comment/${post._id}`,
        { message },
        { withCredentials: true }
      );

      const updatedPosts = postData.map((p) =>
        p._id === post._id ? result.data : p
      );

      dispatch(setPostData(updatedPosts));
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaved = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/post/saved/${post._id}`,
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[90%] min-h-[500px] flex flex-col gap-[10px] bg-gradient-to-b from-gray-600 to-gray-700 items-center shadow-2xl rounded-2xl pb-[20px]">
      <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
        <div className="flex items-center gap-[15px]">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-gray-800">
            <img
              src={post.author?.profileImage || emptyImage}
              className="w-full h-full object-cover"
              alt="author"
            />
          </div>
          <span className="font-semibold text-gray-50 truncate">
            {post.author?.userName}
          </span>
        </div>

        {userData._id !== post.author._id && (
          <FollowButton
            tailwind={
              "px-[12px] py-[6px] bg-gray-900 text-white rounded-xl border border-transparent hover:border-gray-600 cursor-pointer hover:scale-110 transition-transform"
            }
            targetUserId={post.author._id}
          />
        )}
      </div>

      <div className="w-full px-[10px]">
        {post.mediaType === "image" && (
          <img
            src={post.media}
            alt="post"
            className="w-full max-h-[600px] object-contain rounded-2xl"
          />
        )}

        {post.mediaType === "video" && <VideoPlayer media={post.media} />}
      </div>

      <div className="w-full h-[60px] flex justify-between items-center px-[20px] text-gray-50">
        <div className="flex gap-[20px]">
          <div className="flex items-center gap-[6px] hover:scale-110 transition-transform">
            {!post.likes.includes(userData._id) ? (
              <GoHeart
                className="w-[24px] h-[24px] cursor-pointer"
                onClick={handleLike}
              />
            ) : (
              <GoHeartFill
                className="w-[24px] h-[24px] cursor-pointer text-red-600"
                onClick={handleLike}
              />
            )}
            <span>{post.likes.length}</span>
          </div>

          <div className="flex items-center gap-[6px] hover:scale-110 transition-transform">
            <MdOutlineComment
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => setShowComment((p) => !p)}
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div onClick={handleSaved}>
          {!userData.saved.includes(post._id) ? (
            <MdBookmarkBorder className="w-[26px] h-[26px] cursor-pointer" />
          ) : (
            <GoBookmarkFill className="w-[26px] h-[26px] cursor-pointer" />
          )}
        </div>
      </div>

      {post.caption && (
        <div className="w-full px-[20px] text-gray-50">
          <span className="font-bold">{post.author?.userName}</span>{" "}
          {post.caption}
        </div>
      )}

      {showComment && (
        <div className="w-full flex flex-col gap-[20px] px-[20px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[45px] h-[45px] rounded-full overflow-hidden border">
              <img
                src={userData?.profileImage || emptyImage}
                className="w-full h-full object-cover"
                alt="you"
              />
            </div>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add A Comment..."
              className="flex-1 bg-transparent border-b border-gray-400 outline-none text-gray-50 px-[6px]"
            />

            <IoSendSharp
              className="w-[22px] h-[22px] cursor-pointer text-gray-50  hover:scale-110 transition-transform"
              onClick={handleComment}
            />
          </div>

          <div className="max-h-[300px] overflow-auto flex flex-col gap-[14px]">
            {post.comments.map((com) => (
              <div
                key={com._id}
                className="flex gap-3 items-start">
                <img
                  src={com.author?.profileImage || emptyImage}
                  className="w-10 h-10 rounded-full object-cover"
                  alt=""
                />
                <div className="text-gray-50">
                  <span className="font-semibold mr-2">
                    {com.author?.userName}
                  </span>
                  {com.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
