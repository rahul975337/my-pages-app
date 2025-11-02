import React from "react";
import { mockStories, mockIngredients } from "@/data/mockData";
import { StoryFeed } from "@/components/StoryFeed";

export default function Home() {
  return <StoryFeed stories={mockStories} ingredients={mockIngredients} />;
}
