import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import emptyImage from "../assets/Empty-Image.png";
import { LuImage } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setMessages } from "../redux/messageSlice";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";

function MessageArea() {
  const { selectedUser, messages } = useSelector((state) => state.message);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFrontendImage(null);
    setBackendImage(null);
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (input) formData.append("message", input);
      if (backendImage) formData.append("media", backendImage);

      const result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", result.data);

      const currentMessages = messages || [];
      dispatch(setMessages([...currentMessages, result.data]));

      setInput("");
      setBackendImage(null);
      setFrontendImage(null);
      handleRemoveImage();
    } catch (error) {
      console.error("Error sending message:", error);
      console.error("Error response:", error.response?.data);
    }
  };

  const getAllMessages = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/message/getAll/${selectedUser._id}`,
        { withCredentials: true }
      );
      dispatch(setMessages(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-black to-gray-900 relative">
      <div className="w-full flex items-center gap-[20px] px-[20px] py-[10px] fixed top-0 z-[100] bg-black/50 backdrop-blur-sm">
        <div className="h-[80px] flex items-center gap-[20px] px-[20px]">
          <MdOutlineKeyboardBackspace
            className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer"
            onClick={() => {
              navigate(`/`);
            }}
          />
        </div>

        <div
          className="w-[60px] h-[60px] border-2 border-gray-800 rounded-full cursor-pointer overflow-hidden"
          onClick={() => {
            navigate(`/profile/${selectedUser?.userName}`);
          }}>
          <img
            src={selectedUser?.profileImage || emptyImage}
            alt="Default Profile Image"
            className="w-full h-full object-cover hover:scale-110 transition-transform"
          />
        </div>

        <div className="text-gray-50 text-[20px] font-semibold">
          <div>{selectedUser?.userName}</div>
          <div className="text-[15px] text-gray-300">{selectedUser?.name}</div>
        </div>
      </div>

      <div className="w-full h-[80%] pt-[100px] pb-[100px] lg:pb-[150px] px-[40px] flex flex-col gap-[30px] overflow-auto">
        {messages &&
          messages.map((mess, index) =>
            mess.sender === userData._id ? (
              <SenderMessage
                key={mess._id || index}
                message={mess}
              />
            ) : (
              <ReceiverMessage
                key={mess._id || index}
                message={mess}
              />
            )
          )}
      </div>

      <div className="w-full h-[80px] fixed bottom-0 flex justify-center items-center z-[100]">
        <form
          className="w-[80%] max-w-[800px] h-[80%] rounded-full bg-gray-600 flex items-center gap-[20px] px-[20px] relative"
          onSubmit={handleSendMessage}>
          {frontendImage && (
            <div className="w-[100px] rounded-2xl h-[100px] absolute top-[-120px] right-[10px] overflow-hidden border-2 border-gray-700 relative group">
              <img
                src={frontendImage}
                alt="Text-Image"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 w-[25px] h-[25px] bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600">
                <RxCross2 className="text-white w-[15px] h-[15px]" />
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={imageInput}
            className="hidden"
            onChange={handleImage}
          />

          <input
            type="text"
            placeholder="Send A Comment..."
            className="w-full h-full px-[20px] text-[20px] text-gray-100 outline-0 bg-transparent"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          <div onClick={() => imageInput.current.click()}>
            <LuImage className="w-[30px] h-[30px] text-gray-50 hover:scale-110 transition-transform cursor-pointer" />
          </div>

          {(input || frontendImage) && (
            <button
              type="submit"
              className="w-[60px] h-[40px] rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <IoMdSend className="w-[25px] h-[25px] text-gray-50" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default MessageArea;
