'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { routes } from '@/config/routes';
import SocialLinks from '@/components/SocialLinks';

const EMAIL = 'contact@soproductions.fr';

const SMOOTH = [0.43, 0.13, 0.23, 0.96];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: SMOOTH, delay },
  };
}

export default function Contact({ asH1 = false }) {
  const t = useTranslations('contact');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const navLinks = [
    { label: tNav('work'), href: '/' },
    { label: tNav('about'), href: routes.about },
    { label: tNav('gallery'), href: routes.gallery },
    { label: tNav('contact'), href: routes.contact },
  ];

  return (
    <section id='contact' className='site-px relative flex flex-col' style={{ minHeight: '100svh' }} ref={ref}>
      <div className='site-max w-full flex flex-col flex-1'>
        {/* Main content — centered, grows to fill available space */}
        <div className='flex-1 flex flex-col items-center justify-center gap-6 md:gap-8'>
          {/* Overline */}
          {(() => {
            const Tag = asH1 ? motion.h1 : motion.p;
            return (
              <Tag
                className='font-meta text-lg tracking-widest uppercase text-accent'
                {...fadeUp(0)}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              >
                {t('overline')}
              </Tag>
            );
          })()}

          {/* Email */}
          <motion.a
            href={`mailto:${EMAIL}`}
            className='group inline-flex flex-wrap items-center justify-center gap-3 font-meta text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wide text-white text-center'
            {...fadeUp(0.1)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <span className='relative'>
              {EMAIL}
              <span className='absolute -bottom-px left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-500 ease-out' />
            </span>
            <ExternalLink size={20} className='shrink-0 text-accent' />
          </motion.a>

          {/* Divider */}
          <div
            className='w-16 h-px'
            style={{ background: 'rgba(255,255,255,0.1)' }}
          />

          {/* Socials */}
          <motion.div
            className='flex justify-center'
            {...fadeUp(0.35)}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <SocialLinks size={28} theme='primary' />
          </motion.div>
        </div>

        {/* Footer strip — nav + copyright */}
        <motion.div
          className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6'
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          {...fadeUp(0.5)}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          <nav className='flex flex-wrap items-center gap-6'>
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className='font-meta text-[10px] tracking-widest uppercase text-white/25 hover:text-white transition-colors duration-300'
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className='font-meta text-[10px] tracking-widest uppercase text-white/25'>
            © {year} Tullio Philippe
          </p>
        </motion.div>
      </div>
    </section>
  );
}
