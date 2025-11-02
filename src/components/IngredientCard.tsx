import React from "react";
import Image from "next/image";
import { Ingredient } from "@/types";

interface IngredientCardProps {
  ingredient: Ingredient;
  onClose: () => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-sm w-full p-6 shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {ingredient.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {ingredient.image && (
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 relative w-full h-32">
            <Image
              src={ingredient.image}
              alt={ingredient.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="mb-4 space-y-3">
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-gray-700 font-medium">Calories:</span>{" "}
              <span className="font-semibold text-gray-900">
                {ingredient.calories}
              </span>
            </div>
            <div>
              <span className="text-gray-700 font-medium">Protein:</span>{" "}
              <span className="font-semibold text-gray-900">
                {ingredient.protein}g
              </span>
            </div>
            <div>
              <span className="text-gray-700 font-medium">Carbs:</span>{" "}
              <span className="font-semibold text-gray-900">
                {ingredient.carbs}g
              </span>
            </div>
          </div>

          {ingredient.allergens && ingredient.allergens.length > 0 && (
            <div className="flex items-center gap-2 text-sm bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
              <span className="font-medium text-orange-800">Allergen:</span>
              <span className="text-orange-900 font-semibold">
                {ingredient.allergens.join(", ")}
              </span>
              <span className="text-lg">⚠️</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
