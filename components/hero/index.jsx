"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#131313]">
      {/* Placeholder — replace with Cloudinary video later */}
      <Image
        src="https://picsum.photos/id/1018/1920/1080"
        alt="Tullio Philippe — réalisateur"
        fill
        priority
        className="object-cover"
      />

      {/* Cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}
