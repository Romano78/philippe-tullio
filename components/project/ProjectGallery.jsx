'use client';

import { useTranslations } from 'next-intl';

export default function ProjectGallery({ images, title = '' }) {
  const t = useTranslations('project');

  if (!images || images.length === 0) return null;

  return (
    <section className='site-px pt-0 pb-16 md:pb-20 lg:pb-[7.5rem] relative z-10'>
      <div className='site-max'>
        <p className='font-meta text-xs tracking-widest uppercase text-white/30 mb-3'>
          {t('behindTheScenes')}
        </p>
        <h2 className='font-display text-4xl md:text-6xl uppercase text-white leading-none mb-12'>
          {t('gallery')}
        </h2>

        <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
          {images.map((src, i) => (
            <div key={src} className='break-inside-avoid overflow-hidden group'>
              <img
                src={src}
                alt={`${title} — behind the scenes ${i + 1}`}
                className='w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                loading='lazy'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
