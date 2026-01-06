import React, { useEffect, useRef, useState } from "react";
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";

function LoopCard({ loop }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);

  const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;

        if (entry.isIntersecting) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full lg:w-[600px] h-screen flex items-center justify-center border-l border-r border-gray-700 relative bg-black">
      <video
        ref={videoRef}
        src={loop?.media}
        className="w-full object-cover"
        loop
        muted={isMute}
        autoPlay
        onClick={handleClick}
      />

      <div
        className="absolute top-[20px] right-[20px] z-[100]"
        onClick={() => setIsMute((prev) => !prev)}>
        {!isMute ? (
          <FiVolume2 className="w-[30px] h-[30px] text-gray-50 font-semibold" />
        ) : (
          <FiVolumeX className="w-[30px] h-[30px] text-gray-50 font-semibold" />
        )}
      </div>
      <div className="absolute bottom-0 w-full h-[5px] bg-gray-600">
        <div className="bg-white h-full w-[200px]">...</div>
      </div>
    </div>
  );
}

export default LoopCard;
