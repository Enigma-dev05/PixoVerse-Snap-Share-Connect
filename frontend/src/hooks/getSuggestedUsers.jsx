import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers } from "../redux/userSlice";

function GetSuggestedUsers() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return;

    const controller = new AbortController();

    axios
      .get(`${serverUrl}/api/user/suggested`, {
        withCredentials: true,
        signal: controller.signal,
      })
      .then((res) => {
        dispatch(setSuggestedUsers(res.data));
      })
      .catch((error) => {
        if (error.name === "CanceledError") return;
        if (error.response?.status === 401) return;
      });

    return () => {
      controller.abort();
    };
  }, [userData, dispatch]);

  return null;
}

export default GetSuggestedUsers;
