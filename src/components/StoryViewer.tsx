import React, { useState, useEffect } from "react";
import { Story } from "@/types";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { DishStoryImage } from "@/components/DishStoryImage";
import { DishStoryVideo } from "@/components/DishStoryVideo";
import { Hotspot } from "@/components/Hotspot";

const IMAGE_DURATION = 5000;

interface StoryViewerProps {
  story: Story;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ story }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const currentMedia = story.media[currentImageIndex];

  useEffect(() => {
    setCurrentImageIndex(0);
    setProgress(0);
    setVideoDuration(null);
  }, [story.id]);

  useEffect(() => {
    if (!currentMedia) return;
    setProgress(0);
    setVideoDuration(null);
  }, [currentImageIndex, story.media.length, currentMedia]);

  useEffect(() => {
    if (!currentMedia) return;

    if (currentMedia.type === "video" && videoDuration === null) {
      return;
    }

    const duration = videoDuration
      ? videoDuration * 1000
      : currentMedia.duration
      ? currentMedia.duration * 1000
      : IMAGE_DURATION;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        const increment = (100 / duration) * 100;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    const timeout = setTimeout(() => {
      if (currentImageIndex < story.media.length - 1) {
        setCurrentImageIndex((prev) => prev + 1);
      }
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [currentMedia, videoDuration, currentImageIndex, story.media.length]);

  const handleNext = () => {
    if (currentImageIndex < story.media.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handleHotspotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Hotspot clicked");
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button[aria-label='Ingredient hotspot']")) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;

    if (x < 30) {
      handlePrevious();
    } else if (x > 70) {
      handleNext();
    }
  };

  const handleVideoDurationChange = (duration: number) => {
    setVideoDuration(duration);
  };

  if (!currentMedia) return null;
  return (
    <div
      className="w-full h-screen bg-black overflow-hidden relative"
      onClick={handleClick}
    >
      <ProgressIndicator
        totalItems={story.media.length}
        currentIndex={currentImageIndex}
        progress={progress}
      />
      {currentMedia.type === "image" ? (
        <DishStoryImage url={currentMedia.url} alt="Dish" />
      ) : (
        <DishStoryVideo
          url={currentMedia.url}
          alt="Dish"
          onDurationChange={handleVideoDurationChange}
        />
      )}

      {currentMedia.hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          x={hotspot.x}
          y={hotspot.y}
          onClick={handleHotspotClick}
        />
      ))}
    </div>
  );
};
