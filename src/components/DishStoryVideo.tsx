import React, { useRef, useEffect } from "react";

interface DishStoryVideoProps {
  url: string;
  alt: string;
  onDurationChange?: (duration: number) => void;
}

export const DishStoryVideo: React.FC<DishStoryVideoProps> = ({
  url,
  onDurationChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onDurationChange) return;

    const handleLoadedMetadata = () => {
      if (video.duration) {
        onDurationChange(video.duration);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [onDurationChange]);

  return (
    <video
      ref={videoRef}
      src={url}
      autoPlay
      muted
      playsInline
      className="w-full h-screen object-cover"
    />
  );
};
