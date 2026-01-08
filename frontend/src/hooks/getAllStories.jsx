import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing, setUserData } from "../redux/userSlice";
import { setStoryList } from "../redux/storySlice";

function GetAllStories() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  //   const { storyData } = useSelector((state) => state.story);

  useEffect(() => {
    if (!userData) return;

    const controller = new AbortController();

    axios
      .get(`${serverUrl}/api/story/getAll`, {
        withCredentials: true,
        signal: controller.signal,
      })
      .then((res) => {
        dispatch(setStoryList(res.data));
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

export default GetAllStories;
