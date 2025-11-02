import React, { useState, useEffect } from "react";
import { Story, Ingredient, CartItem, Customization } from "@/types";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { DishStoryImage } from "@/components/DishStoryImage";
import { DishStoryVideo } from "@/components/DishStoryVideo";
import { Hotspot } from "@/components/Hotspot";
import { IngredientCard } from "@/components/IngredientCard";
import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";
import { CartBottomSheet } from "@/components/CartBottomSheet";

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
  const [customizations, setCustomizations] = useState<Record<string, number>>(
    {}
  );

  const { addToCart, getCartCount } = useCart();
  const [showCartSheet, setShowCartSheet] = useState(false);

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

  const calculateTotalPrice = () => {
    let total = story.basePrice;
    Object.entries(customizations).forEach(([ingredientId, quantity]) => {
      if (ingredients[ingredientId]) {
        const diff = quantity - 1;
        if (diff > 0) {
          total += diff * ingredients[ingredientId].price;
        }
      }
    });
    return total.toFixed(2);
  };

  const handleAddToCart = () => {
    const customizationsList: Customization[] = Object.entries(
      customizations
    ).map(([ingredientId, quantity]) => ({
      ingredientId,
      quantity,
    }));

    const cartItem: CartItem = {
      dishId: `dish-${story.id}`,
      dishName: currentMedia.dishName,
      storyId: story.id,
      customizations: customizationsList,
      basePrice: story.basePrice,
      totalPrice: parseFloat(calculateTotalPrice()),
    };

    addToCart(cartItem);
    toast.success("Added to cart!");
    setCustomizations({});
  };

  const modificationCount = Object.keys(customizations).length;

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

      <div className="absolute top-4 left-2 right-2 z-30 pointer-events-none px-4 flex justify-between items-center">
        <h2 className="text-white font-semibold text-base">
          {story.restaurantName}
        </h2>
        {getCartCount() > 0 && (
          <div className="relative pointer-events-auto">
            <button
              className="w-12 h-12 flex items-center justify-center -mr-2 -mt-2 p-2"
              aria-label="Cart"
              onClick={(e) => {
                e.stopPropagation();
                setShowCartSheet(true);
              }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>
        )}
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

      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <button
          className="pointer-events-auto h-9 w-full bg-black text-white font-semibold py-4 rounded-t-2xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          Add to Cart
          {modificationCount > 0 && (
            <>
              <span className="text-sm text-gray-600">
                — {modificationCount} modification
                {modificationCount > 1 ? "s" : ""} — ${calculateTotalPrice()}
              </span>
            </>
          )}
        </button>
      </div>

      <CartBottomSheet
        isOpen={showCartSheet}
        onClose={() => setShowCartSheet(false)}
      />
    </div>
  );
};
