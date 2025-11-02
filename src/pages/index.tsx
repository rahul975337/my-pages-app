import React from "react";
import { mockStories } from "@/data/mockData";
import { StoryFeed } from "@/components/StoryFeed";

export default function Home() {
  return <StoryFeed stories={mockStories} />;
}
