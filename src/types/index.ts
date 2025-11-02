export interface Ingredient {
  id: string;
  name: string;
  image?: string;
  calories: number;
  protein: number;
  carbs: number;
  allergens?: string[];
  price: number;
  quantity: number;
}

export interface Hotspot {
  id: string;
  ingredientId: string;
  x: number;
  y: number;
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  hotspots: Hotspot[];
  duration?: number;
}

export interface Story {
  id: string;
  restaurantName: string;
  media: MediaItem[];
}

export interface Customization {
  ingredientId: string;
  quantity: number;
  substitutions?: string[];
}

export interface CartItem {
  dishId: string;
  storyId: string;
  customizations: Customization[];
  basePrice: number;
  totalPrice: number;
}
