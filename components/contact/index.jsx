'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { routes } from '@/config/routes';
import SocialLinks from '@/components/SocialLinks';

const EMAIL = 'contact@soproductions.fr';
const PHONE = '0616108414';
const PHONE_DISPLAY = '06 16 10 84 14';

export default function Contact() {
  const t = useTranslations('contact');
  const tNav = useTranslations('nav');
  const heading = t('heading').split('\n');
  const year = new Date().getFullYear();

  const navLinks = [
    { label: tNav('work'), href: '/' },
    { label: tNav('about'), href: routes.about },
    { label: tNav('gallery'), href: routes.gallery },
    { label: tNav('contact'), href: routes.contact },
  ];

  return (
    <section id='contact' className='site-px pt-24 md:pt-36 relative'>
      <div className='site-max'>
        {/* Overline */}
        <p className='font-meta text-xs tracking-widest uppercase text-accent mb-8'>
          {t('overline')}
        </p>

        {/* Heading */}
        <h2 className='font-display text-4xl md:text-8xl xl:text-[10rem] uppercase text-white leading-none mb-16 md:mb-24'>
          {heading.map((line, i) => (
            <span key={i} className='block'>
              {line}
            </span>
          ))}
        </h2>

        {/* Email + Socials */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24'>
          {/* Email + Phone */}
          <div className='flex flex-col gap-4'>
            <a
              href={`mailto:${EMAIL}`}
              className='group inline-flex items-center gap-3 font-meta text-sm md:text-base tracking-wide text-white/60 hover:text-white transition-colors duration-300'
            >
              <span className='relative'>
                {EMAIL}
                <span className='absolute -bottom-px left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-500 ease-out' />
              </span>
              <ExternalLink size={14} className='shrink-0 text-accent' />
            </a>
          </div>

          {/* Socials */}
          <SocialLinks />
        </div>

        {/* Footer strip — nav + copyright */}
        <div
          className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6'
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
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
        </div>
      </div>
    </section>
  );
}
