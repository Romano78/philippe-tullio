'use client';

import { useTranslations } from 'next-intl';
import LinkCta from '@/components/LinkCta';
import PillCta from '@/components/PillCta';

const PlayIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor' className='w-2 h-2'>
    <path d='M8 5v14l11-7z' />
  </svg>
);

export default function ProjectHero({ title, image, category, year, duration, workVideo, onWatch }) {
  const t = useTranslations('project');
  const meta = [category, year, duration].filter(Boolean).join(' — ');

  return (
    <div className='relative z-10 w-full' style={{ aspectRatio: '16/9', maxHeight: '65vh' }}>
      {image && (
        <img src={image} alt={title} className='absolute inset-0 w-full h-full object-cover' />
      )}

      <div
        className='absolute inset-0'
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%)' }}
      />

      <div className='site-px absolute bottom-0 left-0 right-0 pb-8 flex items-end justify-between'>

        {/* Left — meta on desktop, watch link on mobile */}
        <div>
          {meta && (
            <p className='hidden md:block font-meta text-xs tracking-widest uppercase text-white/50'>
              {meta}
            </p>
          )}
          {workVideo && onWatch && (
            <div className='md:hidden'>
              <LinkCta onClick={onWatch} icon={<PlayIcon />}>{t('watchFullFilm')}</LinkCta>
            </div>
          )}
        </div>

        {/* Right — watch link (desktop only) + pill always */}
        <div className='flex items-end gap-5 shrink-0'>
          {workVideo && onWatch && (
            <div className='hidden md:block'>
              <LinkCta onClick={onWatch} icon={<PlayIcon />}>{t('watchFullFilm')}</LinkCta>
            </div>
          )}
          <PillCta href='#contact' icon={<span className='text-accent'>↓</span>}>
            {t('workTogether')}
          </PillCta>
        </div>

      </div>
    </div>
  );
}
