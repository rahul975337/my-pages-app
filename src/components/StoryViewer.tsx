import React, { useState, useEffect } from "react";
import { Story, Ingredient } from "@/types";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { DishStoryImage } from "@/components/DishStoryImage";
import { DishStoryVideo } from "@/components/DishStoryVideo";
import { Hotspot } from "@/components/Hotspot";
import { IngredientCard } from "@/components/IngredientCard";

const IMAGE_DURATION = 5000;

interface StoryViewerProps {
  story: Story;
  ingredients: Record<string, Ingredient>;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  story,
  ingredients,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [selectedIngredientId, setSelectedIngredientId] = useState<
    string | null
  >(null);
  const [isPaused, setIsPaused] = useState(false);

  const currentMedia = story.media[currentImageIndex];

  useEffect(() => {
    setCurrentImageIndex(0);
    setProgress(0);
    setVideoDuration(null);
    setSelectedIngredientId(null);
    setIsPaused(false);
  }, [story.id]);

  useEffect(() => {
    if (!currentMedia) return;
    setProgress(0);
    setVideoDuration(null);
  }, [currentImageIndex, story.media.length, currentMedia]);

  useEffect(() => {
    if (!currentMedia || isPaused) return;

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
  }, [
    currentMedia,
    videoDuration,
    currentImageIndex,
    story.media.length,
    isPaused,
  ]);

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

  const handleHotspotClick = (ingredientId: string) => {
    setSelectedIngredientId(ingredientId);
    setIsPaused(true);
  };

  const handleCloseCard = () => {
    setSelectedIngredientId(null);
    setIsPaused(false);
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

      <div className="absolute top-4 left-2 right-0 z-30 pointer-events-none px-4">
        <h2 className="text-white font-semibold text-base">
          {story.restaurantName}
        </h2>
      </div>

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
          onClick={() => handleHotspotClick(hotspot.ingredientId)}
        />
      ))}

      {selectedIngredientId && ingredients[selectedIngredientId] && (
        <IngredientCard
          ingredient={ingredients[selectedIngredientId]}
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
};
