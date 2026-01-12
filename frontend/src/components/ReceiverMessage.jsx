import React from "react";
import { useSelector } from "react-redux";
import emptyImage from "../assets/Empty-Image.png";

function ReceiverMessage({ message }) {
  const { selectedUser } = useSelector((state) => state.message);

  return (
    <div className="w-full flex justify-start items-end gap-[10px] pl-[20px]">
      <div className="w-[35px] h-[35px] rounded-full overflow-hidden border-2 border-gray-600 flex-shrink-0">
        <img
          src={selectedUser?.profileImage || emptyImage}
          alt="Their profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-[30%] bg-gray-700 rounded-2xl rounded-bl-md px-[15px] py-[10px] flex flex-col gap-[10px]">
        {message.image && (
          <img
            src={message.image}
            alt="message attachment"
            className="w-full rounded-lg"
          />
        )}
        {message.message && (
          <p className="text-gray-100 text-[16px] break-words">
            {message.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ReceiverMessage;
