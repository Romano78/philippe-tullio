import Image from 'next/image';
import { routes } from '@/config/routes';
import PillCta from '@/components/PillCta';
import { DARK_BG } from '../primitives';

export default function HeroSection({ portrait, t }) {
  const heading = t('heading').split('\n');
  return (
    <section className='relative z-10 overflow-hidden'>
      <div className='site-px'>
        <div className='site-max grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4'>
          <div className='flex flex-col pt-24 md:pt-36 pb-12 md:pb-16'>
            <div>
              <p className='font-meta text-xs tracking-widest uppercase text-white/30 mb-8'>
                {t('overline')}
              </p>
              <h1 className='font-display text-5xl md:text-7xl lg:text-[7.5rem] uppercase text-white leading-none'>
                {heading.map((line, i) => (
                  <span key={i} className='block'>
                    {line}
                  </span>
                ))}
              </h1>
            </div>
            <div className='mt-10 lg:mt-auto'>
              <p className='font-sans text-lg md:text-xl text-white/55 leading-relaxed max-w-lg mb-8'>
                {t('intro')}
              </p>
              <PillCta href={routes.contact} icon='→'>
                {t('cta')}
              </PillCta>
            </div>
          </div>
          <div className='relative overflow-hidden w-full h-full min-h-100 lg:aspect-[3/9] lg:max-h-[85svh]' style={DARK_BG}>
            {portrait[0] ? (
              <Image
                src={portrait[0]}
                alt='Philippe Tullio — réalisateur'
                fill
                className='object-cover object-center'
                priority
              />
            ) : (
              <div className='w-full h-full' style={DARK_BG} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
