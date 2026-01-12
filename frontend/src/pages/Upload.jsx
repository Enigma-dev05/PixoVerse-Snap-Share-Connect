import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import axios from "axios";
import React, { useState, useRef } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";
//import { setUserData } from "../redux/userSlice";
import { setLoopData } from "../redux/loopSlice";
import { ClipLoader } from "react-spinners";

function Upload() {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post");
  const [frontendMedia, setFrontendMedia] = useState(null);
  const [backendMedia, setBackendMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const mediaInput = useRef();
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.post);
  const { loopData } = useSelector((state) => state.loop);

  const handleMedia = (e) => {
    const file = e.target.files[0];

    if (file.type.includes("image")) {
      setMediaType("image");
    } else {
      setMediaType("video");
    }

    setBackendMedia(file);
    setFrontendMedia(URL.createObjectURL(file));
  };

  const uploadPost = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("mediaType", mediaType);
      formData.append("media", backendMedia);

      const result = await axios.post(
        `${serverUrl}/api/post/upload`,
        formData,
        { withCredentials: true }
      );

      dispatch(setPostData([...postData, result.data]));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadLoop = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("media", backendMedia);

      const result = await axios.post(
        `${serverUrl}/api/loop/upload`,
        formData,
        { withCredentials: true }
      );

      dispatch(setLoopData([...loopData, result.data]));
      setLoading(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = () => {
    setLoading(true);
    if (uploadType === "post") {
      uploadPost();
    } else {
      uploadLoop();
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center bg-gradient-to-b from-black to-gray-900">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <MdOutlineKeyboardBackspace
          className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <h1 className="text-gray-50 text-[20px] font-semibold ml-[8px]">
          Upload Media
        </h1>
      </div>

      <div className="w-[75%] max-w-[600px] h-[50px] bg-gray-50 rounded-full flex justify-around items-center gap-[20px]">
        <div
          className={`${
            uploadType === "post"
              ? "bg-gray-900 text-gray-50  shadow-gray-900"
              : ""
          } w-[30%] h-[80%] flex justify-center items-center text-[20px] font-semibold hover:bg-gray-900 rounded-full hover:text-gray-50 transition-colors cursor-pointer hover:shadow-2xl hover:shadow-gray-900`}
          onClick={() => {
            setUploadType("post");
          }}>
          Post
        </div>

        <div
          className={`${
            uploadType === "loop"
              ? "bg-gray-900 text-gray-50  shadow-gray-900"
              : ""
          } w-[30%] h-[80%] flex justify-center items-center text-[20px] font-semibold hover:bg-gray-900 rounded-full hover:text-gray-50 transition-colors cursor-pointer hover:shadow-2xl hover:shadow-gray-900`}
          onClick={() => {
            setUploadType("loop");
          }}>
          Loop
        </div>
      </div>

      {!frontendMedia && (
        <div
          className="w-[80%] max-w-[500px] h-[400px] bg-gradient-to-b from-gray-800 to-gray-900 border-gray-800 border-2 flex flex-col items-center justify-center gap-[10px] mt-[15vh] rounded-2xl cursor-pointer hover:from-gray-700 hover:to-gray-800 transition-colors"
          onClick={() => mediaInput.current.click()}>
          <input
            type="file"
            accept={uploadType === "loop" ? "video/*" : ""}
            hidden
            ref={mediaInput}
            onChange={handleMedia}
          />
          <FiPlusSquare className="text-gray-400 w-[25px] h-[25px] cursor-pointer" />
          <div className="text-gray-400 text-[18px] font-semibold">
            Upload {uploadType}
          </div>
        </div>
      )}

      {frontendMedia && (
        <div className="w-[90%] max-w-[600px] flex flex-col items-center justify-center mt-[6vh]">
          {mediaType === "image" && (
            <>
              <div className="w-full rounded-2xl overflow-hidden">
                <img
                  src={frontendMedia}
                  alt="Selected Image Preview"
                  className="w-full h-auto max-h-[400px] object-cover"
                />
              </div>
              <input
                type="text"
                className="w-full bg-gray-600 border-b-gray-700 border-b-2 rounded-2xl outline-none px-[10px] py-[5px] text-gray-50 mt-[30px]"
                placeholder="Write Your Caption"
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
              />
              }
            </>
          )}

          {mediaType === "video" && (
            <>
              <div className="w-full rounded-2xl overflow-hidden">
                <VideoPlayer media={frontendMedia} />
              </div>
              {uploadType !== "story" && (
                <input
                  type="text"
                  className="w-full bg-gray-600 border-b-gray-700 border-b-2 rounded-2xl outline-none px-[10px] py-[5px] text-gray-50 mt-[30px]"
                  placeholder="Write Your Caption"
                  onChange={(e) => setCaption(e.target.value)}
                  value={caption}
                />
              )}
            </>
          )}
        </div>
      )}

      {frontendMedia && (
        <button
          className="px-[10px] w-[60%] h-[45px] max-w-[300px] py-[5px] bg-gray-700 text-gray-50 mt-[40px] cursor-pointer rounded-2xl hover:bg-gray-600 hover:text-gray-100 transition-colors"
          onClick={handleUpload}>
          {loading ? (
            <ClipLoader
              size={30}
              color="gray-900"
            />
          ) : (
            `Upload ${uploadType}`
          )}
        </button>
      )}
    </div>
  );
}

export default Upload;
