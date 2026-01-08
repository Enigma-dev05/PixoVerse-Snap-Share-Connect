import React, { useRef, useState, useEffect } from "react";
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";

function VideoPlayer({ media }) {
  const videoTag = useRef();
  const [mute, setMute] = useState(true);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoTag.current;

        if (!video) return;

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
    if (videoTag.current) {
      observer.observe(videoTag.current);
    }

    return () => {
      if (videoTag.current) {
        observer.unobserve(videoTag.current);
      }
    };
  }, []);

  return (
    <div className="w-full relative cursor-pointer rounded-2xl overflow-hidden">
      <video
        ref={videoTag}
        src={media}
        autoPlay
        loop
        muted={mute}
        className="cursor-pointer w-full h-auto object-contain max-h-[600px]"
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
