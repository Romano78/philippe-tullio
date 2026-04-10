'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ease } from '@/config/cubic-beziers';

export default function MobileHomeSwiper({ projects }) {
  const locale = useLocale();
  const t = useTranslations('project');

  return (
    <div className='relative pt-20 pb-16 space-y-6 px-4'>
      {projects.map((project, i) => {
        const title = typeof project.title === 'object'
          ? (project.title[locale] ?? project.title.fr)
          : project.title;
        const category = typeof project.category === 'object'
          ? (project.category[locale] ?? project.category.fr)
          : project.category;
        const director = project.credits?.find((c) => c.role === 'direction')?.name;
        const meta = [category, project.year, project.duration].filter(Boolean).join(' · ');
        const HeadingTag = i === 0 ? 'h1' : 'h2';
        const href = project.noPage ? null : `/work/${project.slug}`;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: ease.smooth }}
            className='relative overflow-hidden rounded-sm'
          >
            {/* 16:9 video */}
            <div className='relative w-full aspect-video bg-[#0E0E0E]'>
              {project.video ? (
                <video
                  src={project.videoMobile ?? project.video}
                  poster={project.videoPoster ?? project.image}
                  autoPlay
                  muted
                  loop
                  playsInline
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
              {href && (
                <Link
                  href={href}
                  className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-meta text-[10px] tracking-widest uppercase text-white/80 border border-white/15 transition-colors hover:bg-white/10 hover:text-white'
                >
                  {t('seeProject')}
                  <ArrowRight size={12} className='text-accent' />
                </Link>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
