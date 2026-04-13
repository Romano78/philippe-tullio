'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ProjectPreview({ video, poster, onWatch, title = '' }) {
  const t = useTranslations('project');
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(vid);
    return () => observer.disconnect();
  }, [video]);

  return (
    <div
      className='relative w-full rounded-sm overflow-hidden group'
      style={{ aspectRatio: '16/9', cursor: onWatch ? 'pointer' : 'default' }}
      onClick={onWatch ?? undefined}
    >
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          preload="none"
          muted
          loop
          playsInline
          className='absolute inset-0 w-full h-full object-cover'
        />
      ) : poster ? (
        <Image src={poster} alt={`${title} — preview`} fill sizes='(max-width: 768px) 100vw, 42vw' className='object-cover' />
      ) : (
        <div className='absolute inset-0 bg-surface-low' />
      )}

      {onWatch && <div className='absolute inset-0 bg-black/30' />}

      {onWatch && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='flex flex-col items-center gap-3'>
            <div className='flex items-center justify-center w-14 h-14 rounded-full border border-white/40 backdrop-blur-sm transition-all duration-300 group-hover:border-white group-hover:scale-110'>
              <svg viewBox='0 0 24 24' fill='white' className='w-5 h-5 ml-0.5'>
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>
            <span className='font-meta text-xs tracking-widest uppercase text-white/60 group-hover:text-white transition-colors duration-300'>
              {t('watchFullFilm')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
