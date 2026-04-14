'use client';

import { useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ease } from '@/config/cubic-beziers';
import { Link } from '@/i18n/navigation';

function VideoCard({ src, poster, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!vid.src) vid.src = src;
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(vid);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload='none'
      muted
      loop
      playsInline
      className={className}
    />
  );
}

function CardContent({
  project,
  title,
  meta,
  director,
  i,
  HeadingTag,
  href,
  t,
}) {
  return (
    <>
      {/* 16:9 video */}
      <div className='relative w-full aspect-video bg-[#0E0E0E]'>
        {project.video ? (
          <VideoCard
            src={project.videoMobile ?? project.video}
            poster={project.videoPoster ?? project.image}
            className='absolute inset-0 w-full h-full object-cover'
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={title}
            fill
            className='object-cover'
            priority={i === 0}
          />
        ) : (
          <div className='absolute inset-0 bg-[#0E0E0E]' />
        )}
      </div>

      {/* Content */}
      {href ? (
        <Link href={href} className='block bg-[#0E0E0E] px-5 py-5'>
          {director && (
            <p className='font-meta text-xs tracking-widest uppercase text-accent mb-2'>
              {director}
            </p>
          )}
          <div className='overflow-hidden mb-3 pt-[0.35em]'>
            <HeadingTag className='font-display text-4xl uppercase text-white leading-none'>
              {title}
            </HeadingTag>
          </div>
          {meta && (
            <p className='font-meta text-[10px] tracking-widest uppercase text-accent/70 mb-4'>
              {meta}
            </p>
          )}
          <span className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-meta text-[10px] tracking-widest uppercase text-white/80 border border-white/15'>
            {t('seeProject')}
            <ArrowRight size={12} className='text-accent' />
          </span>
        </Link>
      ) : (
        <div className='bg-[#0E0E0E] px-5 py-5'>
          {director && (
            <p className='font-meta text-xs tracking-widest uppercase text-accent mb-2'>
              {director}
            </p>
          )}
          <div className='overflow-hidden mb-3 pt-[0.35em]'>
            <HeadingTag className='font-display text-4xl uppercase text-white leading-none'>
              {title}
            </HeadingTag>
          </div>
          {meta && (
            <p className='font-meta text-[10px] tracking-widest uppercase text-accent/70 mb-4'>
              {meta}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default function MobileHomeSwiper({ projects }) {
  const locale = useLocale();
  const t = useTranslations('project');

  return (
    <div
      className='relative'
      style={{
        height: '100svh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {projects.map((project, i) => {
        const title =
          typeof project.title === 'object'
            ? (project.title[locale] ?? project.title.fr)
            : project.title;
        const category =
          typeof project.category === 'object'
            ? (project.category[locale] ?? project.category.fr)
            : project.category;
        const director = project.credits?.find(
          (c) => c.role === 'direction',
        )?.name;
        const meta = { category, duration: project.duration }.category
          ? `${category}  ${project.duration ?? ''}`
          : '';
        const HeadingTag = i === 0 ? 'h1' : 'h2';
        const href = project.noPage ? null : `/work/${project.slug}`;

        return (
          <div
            key={project.id}
            style={{ scrollSnapAlign: 'start', height: '100svh' }}
            className='flex items-center justify-center px-4'
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: ease.smooth }}
              className='relative overflow-hidden rounded-sm w-full'
            >
              <CardContent
                project={project}
                title={title}
                meta={meta}
                director={director}
                i={i}
                HeadingTag={HeadingTag}
                href={href}
                t={t}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
