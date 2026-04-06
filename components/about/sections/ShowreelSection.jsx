'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ProjectVideoPlayer from '@/components/project/ProjectVideoPlayer';
import { DARK_BG } from '../primitives';

export default function ShowreelSection({ src, poster, preview }) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const t = useTranslations('project');

  return (
    <section id='showreel' className='relative z-10 site-px py-16 md:py-20'>
      <div className='site-max'>
        <div className='flex justify-center'>
          <div
            className='relative w-[85%] overflow-hidden rounded-sm cursor-pointer group'
            style={{ aspectRatio: '16 / 9' }}
            onClick={() => src && setPlayerOpen(true)}
          >
            {/* Preview video, fallback to poster, fallback to dark bg */}
            {preview ? (
              <video
                src={preview}
                poster={poster ?? undefined}
                autoPlay
                muted
                loop
                playsInline
                className='absolute inset-0 w-full h-full object-cover'
              />
            ) : poster ? (
              <img
                src={poster}
                alt='Showreel'
                className='absolute inset-0 w-full h-full object-cover'
              />
            ) : (
              <div className='absolute inset-0' style={DARK_BG} />
            )}

            {/* Overlay */}
            {src && <div className='absolute inset-0 bg-black/30' />}

            {/* Play button */}
            {src && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <button className='group flex flex-col items-center gap-3'>
                  <div className='flex items-center justify-center w-14 h-14 rounded-full border border-white/40 backdrop-blur-sm transition-all duration-300 group-hover:border-white group-hover:scale-110'>
                    <svg viewBox='0 0 24 24' fill='white' className='w-5 h-5 ml-0.5'>
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  </div>
                  <span className='font-meta text-xs tracking-widest uppercase text-white/60 group-hover:text-white transition-colors duration-300'>
                    {t('watchFullFilm')}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {playerOpen && (
          <ProjectVideoPlayer
            src={src}
            poster={poster}
            onClose={() => setPlayerOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
