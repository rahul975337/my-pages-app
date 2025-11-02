import React from "react";
import Image from "next/image";

interface DishStoryImageProps {
  url: string;
  alt: string;
}

export const DishStoryImage: React.FC<DishStoryImageProps> = ({ url, alt }) => {
  return <Image src={url} alt={alt} fill className="object-cover" priority />;
};
