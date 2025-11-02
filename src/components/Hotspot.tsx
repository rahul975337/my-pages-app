import React from "react";

interface HotspotProps {
  x: number;
  y: number;
  onClick: () => void;
}

export const Hotspot: React.FC<HotspotProps> = ({ x, y, onClick }) => {
  return (
    <button
      className="absolute transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white bg-white/30 animate-pulse focus:outline-none z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label="Ingredient hotspot"
    >
      <span className="absolute inset-0 rounded-full bg-white/50 animate-pulse" />
    </button>
  );
};
