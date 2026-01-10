import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../redux/storySlice";
import StoryCard from "../components/StoryCard";

function Story() {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { storyData } = useSelector((state) => state.story);

  useEffect(() => {
    if (!userName) return;

    const controller = new AbortController();

    const fetchStory = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/story/getByUserName/${userName}`,
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );
        dispatch(setStoryData(result.data[0]));
      } catch (error) {
        if (error.name === "CanceledError") return;
        console.log(error);
      }
    };

    fetchStory();

    return () => {
      controller.abort();
    };
  }, [userName, dispatch]);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-black to-gray-900 flex justify-center items-center">
      {storyData && <StoryCard />}
    </div>
  );
}

export default Story;
