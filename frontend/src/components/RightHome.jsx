import React from "react";
import Messages from "../pages/Messages";

function RightHome() {
  return (
    <div className="w-[25%] min-h-[100vh] bg-gradient-to-b from-black to-gray-900 border-l-2 border-gray-800 hidden lg:block">
      <Messages />
    </div>
  );
}

export default RightHome;
