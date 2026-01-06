import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import axios from "axios";

function FollowButton({ targetUserId, tailwind, onFollowChange }) {
  const { userData } = useSelector((state) => state.user);

  // Safe check if following is an array
  const isFollowing = Array.isArray(userData?.following)
    ? userData.following.includes(targetUserId)
    : false;

  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/follow/${targetUserId}`,
        { withCredentials: true }
      );

      console.log("Backend response:", result.data); // ← Add this
      console.log("Following array:", result.data.following); // ← Add this

      // Update userData with the response from backend
      dispatch(setUserData(result.data));

      // Refresh profile data if callback provided
      if (onFollowChange) {
        onFollowChange();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className={tailwind}
      onClick={handleFollow}>
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
