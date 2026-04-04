'use client';

import { useTranslations, useLocale } from 'next-intl';
import ProjectPreview from './ProjectPreview';
import LinkCta from '@/components/LinkCta';
import PillCta from '@/components/PillCta';

const PlayIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor' className='w-2 h-2'>
    <path d='M8 5v14l11-7z' />
  </svg>
);

export default function ProjectInfo({ project, onWatch }) {
  const t = useTranslations('project');
  const tCredits = useTranslations('credits');
  const locale = useLocale();
  const { title, brand, category, year, duration, description, credits } = project;
  const meta = [category, year, duration].filter(Boolean).join(' — ');

  return (
    <section className='site-px pt-8 md:pt-12 pb-16 md:pb-20 lg:pb-[7.5rem] relative z-10'>
      <div className='site-max'>
        <div className='flex flex-col md:flex-row md:gap-16 lg:gap-24'>

          {/* Left — info */}
          <div className='flex-1 min-w-0'>
            {meta && (
              <p className='md:hidden font-meta text-xs tracking-widest uppercase text-white/30 mb-3'>
                {meta}
              </p>
            )}
            <h2 className='font-display text-5xl md:text-7xl uppercase text-white leading-none mb-3'>
              {title}
            </h2>
            <p className='font-meta text-xs tracking-widest uppercase text-white/30 mb-10'>{brand}</p>

            {description && (
              <p className='font-sans text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-12'>
                {description[locale] ?? description.fr}
              </p>
            )}

            {credits && credits.length > 0 && (
              <div className='grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5'>
                {credits.map((c) => (
                  <div key={c.role}>
                    <p className='font-meta text-[10px] tracking-widest uppercase text-white/30 mb-1'>
                      {tCredits.has(c.role) ? tCredits(c.role) : c.role}
                    </p>
                    <p className='font-meta text-sm text-white/80'>{c.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — preview */}
          <div className='w-full md:w-[42%] shrink-0 mt-12 md:mt-0'>
            <ProjectPreview
              video={project.video}
              poster={project.videoPoster ?? project.image}
              onWatch={project.workVideo ? onWatch : null}
            />
          </div>

        </div>

        {/* Mobile CTAs — below the preview */}
        <div className='flex md:hidden items-center gap-6 mt-8'>
          <PillCta href='#contact' icon={<span className='text-accent'>↓</span>}>{t('workTogether')}</PillCta>
          {project.workVideo && (
            <LinkCta onClick={onWatch} icon={<PlayIcon />}>{t('watchFullFilm')}</LinkCta>
          )}
        </div>
      </div>
    </section>
  );
}
