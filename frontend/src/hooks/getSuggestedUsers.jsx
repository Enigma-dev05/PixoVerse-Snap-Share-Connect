import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers } from "../redux/userSlice";

function GetSuggestedUsers() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/suggested`, {
          withCredentials: true,
        });
        dispatch(setSuggestedUsers(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [dispatch, userData?._id]);
  return null;
}

export default GetSuggestedUsers;
