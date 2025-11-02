import React from "react";
import { useRouter } from "next/router";
import { useCart } from "@/contexts/CartContext";
import { mockStories } from "@/data/mockData";
import { BottomSheet } from "./BottomSheet";

interface CartBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartBottomSheet: React.FC<CartBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const { items, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const getStoryName = (storyId: string) => {
    const story = mockStories.find((s) => s.id === storyId);
    return story?.restaurantName || "Unknown Restaurant";
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);
  };

  const groupedItems = items.reduce((acc, item, index) => {
    const restaurantName = getStoryName(item.storyId);
    if (!acc[restaurantName]) {
      acc[restaurantName] = [];
    }
    acc[restaurantName].push({ item, index });
    return acc;
  }, {} as Record<string, Array<{ item: (typeof items)[0]; index: number }>>);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Your Cart">
      {items.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-500 mb-6">Your cart is empty</p>
          <button
            onClick={() => {
              onClose();
              router.push("/");
            }}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Browse Stories
          </button>
        </div>
      ) : (
        <div className="px-8 py-6 space-y-6">
          {Object.entries(groupedItems).map(
            ([restaurantName, restaurantItems]) => (
              <div key={restaurantName} className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {restaurantName}
                </h3>
                <div className="space-y-3">
                  {restaurantItems.map(({ item, index }) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-base">
                          {item.dishName || "Dish"}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>${item.basePrice.toFixed(2)} base</span>
                          {item.customizations.length > 0 && (
                            <>
                              <span>•</span>
                              <span>
                                {item.customizations.length} customizations
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-lg">
                          ${item.totalPrice.toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-xs text-gray-400 hover:text-red-600 mt-1 transition-colors font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          <div className="pt-6 border-t-2 border-gray-200 space-y-4 from-transparent to-white sticky bottom-0 -mx-8 px-8 pb-6">
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-gray-900 text-base">
                Total
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ${calculateGrandTotal()}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => clearCart()}
                className="flex-1 border-2 border-gray-300 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  onClose();
                  router.push("/cart");
                }}
                className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
};
