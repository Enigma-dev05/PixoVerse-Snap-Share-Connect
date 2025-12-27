import React, { useRef, useState } from "react";
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";

function VideoPlayer({ media }) {
  const videoTag = useRef();
  const [mute, setMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleClick = () => {
    if (isPlaying) {
      videoTag.current.pause();
      setIsPlaying(false);
    } else {
      videoTag.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden">
      <video
        ref={videoTag}
        src={media}
        autoPlay
        loop
        muted={mute}
        className="cursor-pointer w-full h-auto max-h-[300px] object-cover"
        onClick={handleClick}
      />

      <div
        className="absolute bottom-[10px] right-[10px]"
        onClick={() => setMute((prev) => !prev)}>
        {!mute ? (
          <FiVolume2 className="w-[30px] h-[30px] text-gray-50 font-semibold" />
        ) : (
          <FiVolumeX className="w-[30px] h-[30px] text-gray-50 font-semibold" />
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
