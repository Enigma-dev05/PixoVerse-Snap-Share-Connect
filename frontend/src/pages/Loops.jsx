import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoopCard from "../components/LoopCard";

function Loops() {
  const navigate = useNavigate();
  const { loopData } = useSelector((state) => state.loop);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-black to-gray-900 overflow-hidden flex justify-center">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] fixed top-[10px] left-[10px] z-[100]">
        <MdOutlineKeyboardBackspace
          className="w-[38px] h-[38px] text-gray-50 hover:text-gray-300 transition-colors cursor-pointer"
          onClick={() => {
            navigate(`/`);
          }}
        />
        <h1 className="text-gray-50 text-[20px] font-semibold ml-[10px]">
          Loops
        </h1>
      </div>

      <div className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide">
        {loopData?.map((loop, index) => (
          <div className="h-screen snap-start">
            <LoopCard
              loop={loop}
              key={loop._id || index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loops;
