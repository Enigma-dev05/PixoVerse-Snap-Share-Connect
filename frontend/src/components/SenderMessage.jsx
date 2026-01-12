import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import emptyImage from "../assets/Empty-Image.png";

function SenderMessage({ message }) {
  const { userData } = useSelector((state) => state.user);

  const scroll = useRef();

  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: "smooth" });
  }, [message.message, message.image]);
  return (
    <div
      ref={scroll}
      className="w-full flex justify-end items-end gap-[10px] pr-[20px]">
      <div className="max-w-[30%] bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl rounded-br-md px-[15px] py-[10px] flex flex-col gap-[10px]">
        {message.image && (
          <img
            src={message.image}
            alt="message attachment"
            className="w-full rounded-lg"
          />
        )}
        {message.message && (
          <p className="text-white text-[16px] break-words">
            {message.message}
          </p>
        )}
      </div>
      <div className="w-[35px] h-[35px] rounded-full overflow-hidden border-2 border-purple-400 flex-shrink-0">
        <img
          src={userData?.profileImage || emptyImage}
          alt="Your profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SenderMessage;
