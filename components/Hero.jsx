"use client";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#131313]">
      {/* Placeholder image — replace with Cloudinary video later */}
      <img
        src="https://picsum.photos/seed/tullio/1920/1080"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
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
