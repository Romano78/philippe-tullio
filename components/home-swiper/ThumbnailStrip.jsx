"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ThumbnailStrip({ projects, activeIndex, onThumbClick }) {
  const mobileSwiperRef = useRef(null);

  useEffect(() => {
    if (mobileSwiperRef.current) {
      mobileSwiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <>
      {/* Desktop — vertical flex strip, fixed left */}
      <div className="hidden md:flex flex-col gap-2 fixed left-6 top-1/2 -translate-y-1/2 z-30">
        {projects.map((project, i) => (
          <button
            key={project.id}
            onClick={() => onThumbClick(i)}
            className="relative block w-20 overflow-hidden rounded-sm transition-all duration-300"
            style={{
              opacity: activeIndex === i ? 1 : 0.4,
              outline: activeIndex === i ? "2px solid #B8FF00" : "2px solid transparent",
              outlineOffset: "2px",
            }}
          >
            {project.thumb ? (
              <Image
                src={project.thumb}
                alt={project.title}
                width={80}
                height={45}
                className="object-cover w-full"
              />
            ) : (
              <div className="w-20 bg-white/10" style={{ height: 45 }} />
            )}
          </button>
        ))}
      </div>

      {/* Mobile — horizontal Swiper strip, fixed bottom */}
      <div className="flex md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[calc(100vw-3rem)]">
        <Swiper
          direction="horizontal"
          slidesPerView="auto"
          spaceBetween={8}
          centeredSlides
          onSwiper={(swiper) => { mobileSwiperRef.current = swiper; }}
        >
          {projects.map((project, i) => (
            <SwiperSlide key={project.id} style={{ width: "80px" }}>
              <button
                onClick={() => onThumbClick(i)}
                className="relative block w-full overflow-hidden rounded-sm transition-all duration-300"
                style={{
                  opacity: activeIndex === i ? 1 : 0.4,
                  outline: activeIndex === i ? "2px solid #B8FF00" : "2px solid transparent",
                  outlineOffset: "2px",
                }}
              >
                {project.thumb ? (
                  <Image
                    src={project.thumb}
                    alt={project.title}
                    width={80}
                    height={45}
                    className="object-cover w-full"
                  />
                ) : (
                  <div className="w-full bg-white/10" style={{ height: 45 }} />
                )}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
