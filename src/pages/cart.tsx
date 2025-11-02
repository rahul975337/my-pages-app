import React from "react";
import { useRouter } from "next/router";
import { useCart } from "@/contexts/CartContext";
import { mockStories } from "@/data/mockData";

export default function Cart() {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Cart</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
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
            <p className="text-gray-600 text-lg">Your cart is empty</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse Stories
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedItems).map(
              ([restaurantName, restaurantItems]) => (
                <div
                  key={restaurantName}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-5">
                    <h2 className="text-lg font-bold text-gray-900">
                      {restaurantName}
                    </h2>
                  </div>
                  <div className="p-8 space-y-6">
                    {restaurantItems.map(({ item, index }) => (
                      <div
                        key={index}
                        className="flex justify-between items-start pb-6 last:pb-0"
                      >
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-xl mb-2">
                            {item.dishName || "Dish"}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="bg-gray-100 px-2 py-0.5 rounded">
                              ${item.basePrice.toFixed(2)} base
                            </span>
                            {item.customizations.length > 0 && (
                              <>
                                <span>•</span>
                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                                  {item.customizations.length} customizations
                                </span>
                              </>
                            )}
                          </div>
                          {item.customizations.length > 0 && (
                            <div className="mt-4">
                              <p className="font-semibold text-gray-900 text-sm mb-3">
                                Customizations:
                              </p>
                              <ul className="space-y-2">
                                {item.customizations.map((cust, custIndex) => (
                                  <li
                                    key={custIndex}
                                    className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
                                  >
                                    <span className="font-medium">
                                      Qty: {cust.quantity}
                                    </span>
                                    {cust.substitutions &&
                                      cust.substitutions.length > 0 && (
                                        <span className="ml-2 text-gray-600">
                                          (Substitutions:{" "}
                                          {cust.substitutions.join(", ")})
                                        </span>
                                      )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="ml-8 text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            ${item.totalPrice.toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
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

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-gray-900">
                  Total: ${calculateGrandTotal()}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => clearCart()}
                  className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => {
                    alert("Checkout functionality coming soon!");
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
