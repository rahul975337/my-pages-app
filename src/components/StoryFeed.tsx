import React, { useState } from "react";
import { Story } from "@/types";
import { StoryViewer } from "./StoryViewer";

interface StoryFeedProps {
  stories: Story[];
}

export const StoryFeed: React.FC<StoryFeedProps> = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNextStory();
      } else {
        handlePreviousStory();
      }
    }

    setTouchStartY(null);
  };

  return (
    <div
      className="w-full h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <StoryViewer
        key={stories[currentStoryIndex].id}
        story={stories[currentStoryIndex]}
      />
    </div>
  );
};
