"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type Props = {
  images: string[];
};

export default function ImageCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrent(newIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto px-2">
      <div
        className="p-10 rounded-xl mb-4"
        style={{
          border: "2px solid transparent",
          backgroundImage:
            "linear-gradient(to right, #192132, #000000, #192132), linear-gradient(to right, #14b8a6, #3b82f6)",

          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-lg pb-8"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 min-w-full snap-center flex justify-center"
            >
              <Image
                src={src}
                alt={`Shirt ${index + 1}`}
                width={250}
                height={250}
                className="rounded-lg object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-teal-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
