import Image from 'next/image';
import { AnimateIn, AnimateHeading } from '@/components/about/AnimateIn';
import { DARK_BG } from '@/components/about/primitives';

export default function HeroSection({ t, locale, image }) {
  const name = t('name').split('\n');

  return (
    <section className='relative z-10 overflow-hidden'>
      <div className='site-px'>
        <div className='site-max grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4'>
          {/* Left — text */}
          <div className='flex flex-col pt-24 md:pt-36 pb-12 md:pb-16'>
            <AnimateIn delay={0}>
              <p className='font-meta text-xs tracking-widest uppercase text-accent mb-8'>
                {t('overline')}
              </p>
            </AnimateIn>
            <AnimateHeading>
              <h1 className='font-display text-5xl md:text-7xl lg:text-[7.5rem] uppercase text-white leading-none mb-8'>
                {name.map((line, i) => (
                  <span key={i} className='block'>{line}</span>
                ))}
              </h1>
            </AnimateHeading>
            <AnimateIn delay={0.2}>
              <p className='font-sans text-lg md:text-xl text-white/55 leading-relaxed max-w-lg'>
                {t('tagline')}
              </p>
            </AnimateIn>
          </div>

          {/* Right — square image */}
          <div className='relative overflow-hidden w-full aspect-square' style={DARK_BG}>
            {image ? (
              <Image
                src={image}
                alt='Sans Oreilles Production'
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
