import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import axios from "axios";

function FollowButton({ targetUserId, tailwind, onFollowChange }) {
  const { userData } = useSelector((state) => state.user);

  const isFollowing = Array.isArray(userData?.following)
    ? userData.following.some((user) => (user._id || user) === targetUserId)
    : false;

  const dispatch = useDispatch();

  const handleFollow = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/follow/${targetUserId}`,
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));

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
