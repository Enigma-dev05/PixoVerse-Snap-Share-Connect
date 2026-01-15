import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";

function GetAllPost() {
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.post);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`${serverUrl}/api/post/getAll`, {
        withCredentials: true,
        signal: controller.signal,
      })
      .then((res) => {
        dispatch(setPostData(res.data));
      })
      .catch((error) => {
        if (error.name === "CancelledError") return;
        if (error.response?.status === 401) return;
      });

    return () => {
      controller.abort();
    };
  }, [postData, dispatch]);

  return null;
}

export default GetAllPost;
