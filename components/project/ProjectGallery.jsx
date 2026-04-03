'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ProjectGallery({ images }) {
  const [mode, setMode] = useState('grid');
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const itemRefs = useRef([]);

  useGSAP(() => {
    if (mode !== 'carousel' || !itemRefs.current.length) return;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = i - activeIndex;
      gsap.to(el, {
        x: offset * 320,
        rotateY: offset * 18,
        scale: offset === 0 ? 1 : 0.75,
        opacity: Math.abs(offset) > 2 ? 0 : offset === 0 ? 1 : 0.5,
        zIndex: offset === 0 ? 10 : 10 - Math.abs(offset),
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  }, [activeIndex, mode]);

  return (
    <section className='relative z-10 py-16 md:py-16 px-8 md:px-32'>
      {/* Title */}
      <p className='font-meta text-xs tracking-widest uppercase text-white/30 mb-3'>
        Behind the scenes
      </p>
      <h2 className='font-display text-4xl md:text-6xl uppercase text-white leading-none mb-12'>
        Galerie
      </h2>

      {!images || images.length === 0 ? (
        /* Empty state — movie pun */
        <p className='font-meta text-sm tracking-widest uppercase text-white/30'>
          Currently in post-production — coming soon to a screen near you.
        </p>
      ) : (
        <>
          {/* Toggle */}
          <div className='flex items-center gap-1 mb-12 p-1 rounded-full border border-white/10 w-fit'>
            {['grid', 'carousel'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-6 py-2 rounded-full font-meta text-xs tracking-widest uppercase transition-all duration-300 ${
                  mode === m
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {m === 'grid' ? 'Grid' : 'Carousel'}
              </button>
            ))}
          </div>

          {/* Grid */}
          {mode === 'grid' && (
            <div className='columns-1 md:columns-2 gap-4 space-y-4'>
              {images.map((src, i) => (
                <div key={i} className='break-inside-avoid'>
                  <img
                    src={src}
                    alt=''
                    className='w-full object-cover rounded-sm'
                    loading='lazy'
                  />
                </div>
              ))}
            </div>
          )}

          {/* Carousel */}
          {mode === 'carousel' && (
            <div
              ref={carouselRef}
              className='relative flex items-center justify-center overflow-hidden'
              style={{ height: '60vh', perspective: '1200px' }}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className='absolute cursor-pointer'
                  style={{ width: '480px', transformStyle: 'preserve-3d' }}
                  onClick={() => setActiveIndex(i)}
                >
                  <img
                    src={src}
                    alt=''
                    className='w-full h-full object-cover rounded-sm'
                    loading='lazy'
                  />
                </div>
              ))}

              <button
                onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                className='absolute left-0 z-20 p-4 text-white/40 hover:text-white transition-colors font-meta text-2xl'
              >
                ←
              </button>
              <button
                onClick={() =>
                  setActiveIndex((i) => Math.min(images.length - 1, i + 1))
                }
                className='absolute right-0 z-20 p-4 text-white/40 hover:text-white transition-colors font-meta text-2xl'
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
