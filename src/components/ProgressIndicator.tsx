import React from "react";

interface ProgressIndicatorProps {
  totalItems: number;
  currentIndex: number;
  progress: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  totalItems,
  currentIndex,
  progress,
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
      {Array.from({ length: totalItems }).map((_, index) => (
        <div
          key={index}
          className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-[#bada55] transition-all duration-75 ease-linear"
            style={{
              width:
                index < currentIndex
                  ? "100%"
                  : index === currentIndex
                  ? `${progress}%`
                  : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
};
