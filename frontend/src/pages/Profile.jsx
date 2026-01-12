import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import emptyImage from "../assets/Empty-Image.png";
import Nav from "../components/Nav";
import FollowButton from "../components/FollowButton";
import Post from "../components/Post";
import { setSelectedUser } from "../redux/messageSlice";

function Profile() {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, userData } = useSelector((state) => state.user);
  const [postType, setPostType] = useState("posts");
  const { postData } = useSelector((state) => state.post);

  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        {
          withCredentials: true,
        }
      );

      dispatch(setProfileData(result.data));
    } catch (error) {
      if (error.response?.status === 401) return;
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userData) return;

    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/getProfile/${userName}`,
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );
        dispatch(setProfileData(result.data));
      } catch (error) {
        if (error.name === "CanceledError") return;
        if (error.response?.status === 401) return;
      }
    };

    fetchProfile();

    return () => {
      controller.abort();
    };
  }, [userName, userData, dispatch]);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      dispatch(setProfileData(null));

      navigate("/signin", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="w-full h-[80px] flex justify-between items-center px-[30px] text-gray-50">
        <div
          onClick={() => {
            navigate("/");
          }}>
          <MdOutlineKeyboardBackspace className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer" />
        </div>

        <div className="font-semibold text-[28px]">{profileData?.userName}</div>

        <div
          className="font-semibold text-[22px] text-blue-500 hover:text-red-400 transition-colors cursor-pointer"
          onClick={handleLogOut}>
          Log Out
        </div>
      </div>

      <div className="w-full h-[150px] flex items-start gap-[40px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
        <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-gray-800 rounded-full overflow-hidden">
          <img
            src={profileData?.profileImage || emptyImage}
            alt="Default Profile Image"
            className="w-full h-full object-cover "
          />
        </div>

        <div>
          <div className="font-semibold text-[25px] text-gray-50">
            {profileData?.name}
          </div>
          <div className="text-[20px] text-[#ffffffe8]">
            {profileData?.profession || "Explorer"}
          </div>
          <div className="text-[20px] text-[#ffffffe8]">
            {profileData?.bio || "Exploring ideas, one step at a time."}
          </div>
        </div>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center gap-[60px] md:gap-[90px] px-[20%] pt-[30px] text-gray-50">
        <div>
          <div className="text-gray-50 text-[25px] ml-[12px] md:text-[30px] font-semibold">
            {profileData?.posts.length}
          </div>
          <div className="text-[20px] md:text-[22px] text-[#ffffffc7]">
            Posts
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-[25px]">
            <div className="flex relative">
              {profileData?.followers?.slice(0, 3).map((user, index) => (
                <div
                  key={`follower-${user._id}-${index}`}
                  className="w-[45px] h-[45px] border-2 border-gray-800 rounded-full overflow-hidden"
                  style={
                    index > 0
                      ? { position: "absolute", left: `${index * 10}px` }
                      : {}
                  }>
                  <img
                    src={user?.profileImage || emptyImage}
                    alt="Follower"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-gray-50 text-[25px] md:text-[30px] font-semibold">
              {profileData?.followers.length}
            </div>
          </div>
          <div className="text-[20px] md:text-[22px] text-[#ffffffc7]">
            Followers
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-[25px]">
            <div className="flex relative">
              {profileData?.following?.slice(0, 3).map((user, index) => (
                <div
                  key={`follower-${user._id}-${index}`}
                  className="w-[45px] h-[45px] border-2 border-gray-800 rounded-full overflow-hidden"
                  style={
                    index > 0
                      ? { position: "absolute", left: `${index * 10}px` }
                      : {}
                  }>
                  <img
                    src={user?.profileImage || emptyImage}
                    alt="Follower"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-gray-50 text-[25px] md:text-[30px] font-semibold">
              {profileData?.following.length}
            </div>
          </div>
          <div className="text-[20px] md:text-[22px] text-[#ffffffc7]">
            Following
          </div>
        </div>
      </div>

      <div className="w-full h-[100px] flex justify-center items-center gap-[20px] mt-[10px]">
        {userData && profileData?._id === userData._id && (
          <>
            <button
              className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-gray-50 cursor-pointer rounded-2xl border border-transparent hover:border-gray-600"
              onClick={() => navigate("/editprofile")}>
              Edit Profile
            </button>
          </>
        )}

        {userData && profileData?._id !== userData._id && (
          <>
            <FollowButton
              tailwind={
                "px-[10px] min-w-[150px] py-[5px] h-[40px] bg-gray-50 cursor-pointer rounded-2xl"
              }
              targetUserId={profileData?._id}
              onFollowChange={handleProfile}
            />

            <button
              className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-gray-50 cursor-pointer rounded-2xl"
              onClick={() => {
                dispatch(setSelectedUser(profileData));
                navigate("/messageArea");
              }}>
              Message
            </button>
          </>
        )}
      </div>

      <div className="w-full min-h-[100vh] flex justify-center pb-[120px]">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-gradient-to-b from-gray-800 to-gray-900 relative gap-[20px] pt-[30px] pb-[50px]">
          {profileData?._id === userData._id && (
            <div className="w-[75%] max-w-[600px] h-[50px] bg-gray-50 rounded-full flex justify-around items-center gap-[20px]">
              <div
                className={`${
                  postType === "posts"
                    ? "bg-gray-900 text-gray-50 shadow-gray-900"
                    : ""
                } w-[45%] h-[80%] flex justify-center items-center text-[18px] font-semibold hover:bg-gray-900 rounded-full hover:text-gray-50 transition-colors cursor-pointer hover:shadow-2xl hover:shadow-gray-900`}
                onClick={() => setPostType("posts")}>
                Posts
              </div>

              <div
                className={`${
                  postType === "saved"
                    ? "bg-gray-900 text-gray-50 shadow-gray-900"
                    : ""
                } w-[45%] h-[80%] flex justify-center items-center text-[18px] font-semibold hover:bg-gray-900 rounded-full hover:text-gray-50 transition-colors cursor-pointer hover:shadow-2xl hover:shadow-gray-900`}
                onClick={() => setPostType("saved")}>
                Saved
              </div>
            </div>
          )}

          {postType === "posts" &&
            postData.map((post) =>
              post.author?._id === profileData?._id ? (
                <Post
                  post={post}
                  key={post._id}
                />
              ) : null
            )}

          {postType === "saved" &&
            userData?.saved?.map((postId) => {
              const savedPost = postData.find((p) => p._id === postId);
              return savedPost ? (
                <Post
                  post={savedPost}
                  key={savedPost._id}
                />
              ) : null;
            })}
        </div>
        <Nav />
      </div>
      <Nav />
    </div>
  );
}
export default Profile;
