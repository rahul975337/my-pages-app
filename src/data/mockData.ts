import { Story, Ingredient } from "@/types";

export const mockIngredients: Record<string, Ingredient> = {
  ing1: {
    id: "ing1",
    name: "Chicken",
    calories: 180,
    protein: 12,
    carbs: 6,
    allergens: ["Milk"],
    price: 2.5,
    quantity: 1,
  },
  ing2: {
    id: "ing2",
    name: "Butter",
    calories: 100,
    protein: 0.1,
    carbs: 0,
    allergens: ["Milk", "Soy"],
    price: 1.5,
    quantity: 1,
  },
  ing3: {
    id: "ing3",
    name: "Chili",
    calories: 40,
    protein: 2,
    carbs: 8,
    allergens: [],
    price: 0.5,
    quantity: 1,
  },
  ing4: {
    id: "ing4",
    name: "Tomatoes",
    calories: 30,
    protein: 1,
    carbs: 6,
    allergens: [],
    price: 1.0,
    quantity: 1,
  },
  ing5: {
    id: "ing5",
    name: "Basil",
    calories: 20,
    protein: 1,
    carbs: 2,
    allergens: [],
    price: 0.75,
    quantity: 1,
  },
};

export const mockStories: Story[] = [
  {
    id: "story1",
    restaurantName: "Tasty Bites",
    media: [
      {
        id: "media1",
        type: "image",
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
        hotspots: [
          { id: "1", ingredientId: "ing1", x: 30, y: 40 },
          { id: "2", ingredientId: "ing2", x: 60, y: 50 },
          { id: "3", ingredientId: "ing3", x: 45, y: 65 },
        ],
      },
      {
        id: "media2",
        type: "image",
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        hotspots: [
          { id: "1", ingredientId: "ing4", x: 50, y: 45 },
          { id: "2", ingredientId: "ing5", x: 35, y: 60 },
        ],
      },
      {
        id: "media3",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        hotspots: [],
      },
    ],
  },
  {
    id: "story2",
    restaurantName: "Spice Garden",
    media: [
      {
        id: "media4",
        type: "image",
        url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
        hotspots: [
          { id: "1", ingredientId: "ing2", x: 40, y: 50 },
          { id: "2", ingredientId: "ing4", x: 65, y: 55 },
        ],
      },
      {
        id: "media5",
        type: "image",
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        hotspots: [
          { id: "1", ingredientId: "ing1", x: 50, y: 45 },
          { id: "2", ingredientId: "ing3", x: 35, y: 60 },
        ],
      },
    ],
  },
  {
    id: "story3",
    restaurantName: "Pizza Palace",
    media: [
      {
        id: "media6",
        type: "image",
        url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
        hotspots: [
          { id: "1", ingredientId: "ing4", x: 40, y: 50 },
          { id: "2", ingredientId: "ing5", x: 60, y: 45 },
        ],
      },
      {
        id: "media7",
        type: "image",
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        hotspots: [{ id: "1", ingredientId: "ing2", x: 45, y: 55 }],
      },
    ],
  },
  {
    id: "story4",
    restaurantName: "Burger Hub",
    media: [
      {
        id: "media8",
        type: "image",
        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
        hotspots: [
          { id: "1", ingredientId: "ing1", x: 50, y: 50 },
          { id: "2", ingredientId: "ing4", x: 30, y: 60 },
        ],
      },
    ],
  },
  {
    id: "story5",
    restaurantName: "Sushi Express",
    media: [
      {
        id: "media9",
        type: "image",
        url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
        hotspots: [
          { id: "1", ingredientId: "ing5", x: 40, y: 45 },
          { id: "2", ingredientId: "ing3", x: 65, y: 55 },
        ],
      },
      {
        id: "media10",
        type: "image",
        url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
        hotspots: [{ id: "1", ingredientId: "ing2", x: 45, y: 50 }],
      },
      {
        id: "media11",
        type: "image",
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
        hotspots: [
          { id: "1", ingredientId: "ing1", x: 35, y: 60 },
          { id: "2", ingredientId: "ing4", x: 55, y: 45 },
        ],
      },
    ],
  },
];
