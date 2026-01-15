import React from "react";
import logo from "../assets/Pixoverse-u.png";
import { FaRegHeart } from "react-icons/fa6";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import Post from "./Post";
import { BiMessageAltDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Feed() {
  const { postData } = useSelector((state) => state.post);
  //const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="lg:w-[50%] w-full bg-gradient-to-b from-black to-gray-900 min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      <div className="w-full h-[100px] flex items-center justify-between px-[10px] lg:hidden">
        <img
          src={logo}
          alt="Logo of PixoVerse"
          className="w-[20%]"
        />
        <div className="flex items-center gap-[20px]">
          <BiMessageAltDetail
            className="text-white w-[35px] h-[35px]"
            onClick={() => navigate("/messages")}
          />
        </div>
      </div>

      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-[60px] relative pb-[120px] mt-5">
        <Nav />
        {postData?.map((post, index) => (
          <Post
            post={post}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;
