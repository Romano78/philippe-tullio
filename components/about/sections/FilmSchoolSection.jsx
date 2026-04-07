import Image from 'next/image';
import { AnimateIn, AnimateHeading } from '../AnimateIn';
import { DARK_BG } from '../primitives';

export default function FilmSchoolSection({ lfaHero, lfaLogo, t, noPb }) {
  const filmschoolLines = t('filmschoolHeading').split('\n');
  return (
    <>
      {lfaHero[0] && (
        <section className="site-px pt-4 pb-10 md:pb-12 relative z-10">
          <div className="site-max overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: '21 / 9' }}>
              <Image src={lfaHero[0]} alt="London Film Academy — on set" fill className="object-cover object-top" />
            </div>
          </div>
        </section>
      )}
      <section className={`site-px pb-16 md:pb-20 relative z-10 ${noPb ? '!pb-0' : ''}`}>
        <div className="site-max">
          {/* Mobile */}
          <div className="md:hidden mb-10">
            <AnimateIn><p className="font-meta text-xs tracking-widest uppercase text-accent mb-4">{t('filmschoolEyebrow')}</p></AnimateIn>
            <AnimateHeading className="mb-6">
              <h2 className="font-display text-3xl uppercase text-white leading-none">
                {filmschoolLines.map((line, i) => <span key={i} className="block">{line}</span>)}
              </h2>
            </AnimateHeading>
            <AnimateIn delay={0.1}><p className="font-sans text-base text-white/60 leading-relaxed mb-3">{t('filmschoolBody1')}</p></AnimateIn>
            <AnimateIn delay={0.15}><p className="font-sans text-base text-white/60 leading-relaxed mb-8">{t('filmschoolBody2')}</p></AnimateIn>
            <div className="relative overflow-hidden mb-8" style={{ aspectRatio: '1200 / 799' }}>
              {lfaLogo[0]
                ? <Image src={lfaLogo[0]} alt="London Film Academy" fill className="object-contain" />
                : <div style={{ ...DARK_BG }} className="w-full h-full" />
              }
            </div>
            <AnimateIn delay={0.2}><p className="font-sans text-base text-white/70 leading-relaxed">{t('kcitizenBlock')}</p></AnimateIn>
          </div>
          {/* Desktop */}
          <div className="hidden md:grid grid-cols-[3fr_2fr] gap-14 items-start mb-10">
            <div>
              <AnimateIn><p className="font-meta text-xs tracking-widest uppercase text-accent mb-4">{t('filmschoolEyebrow')}</p></AnimateIn>
              <AnimateHeading className="mb-6">
                <h2 className="font-display text-4xl lg:text-5xl uppercase text-white leading-none">
                  {filmschoolLines.map((line, i) => <span key={i} className="block">{line}</span>)}
                </h2>
              </AnimateHeading>
              <AnimateIn delay={0.1}><p className="font-sans text-lg text-white/60 leading-relaxed mb-4">{t('filmschoolBody1')}</p></AnimateIn>
              <AnimateIn delay={0.15}><p className="font-sans text-lg text-white/60 leading-relaxed mb-4">{t('filmschoolBody2')}</p></AnimateIn>
              <AnimateIn delay={0.2}><p className="font-sans text-lg text-white/60 leading-relaxed">{t('kcitizenBlock')}</p></AnimateIn>
            </div>
            <div className="relative overflow-hidden" style={{ aspectRatio: '1200 / 799' }}>
              {lfaLogo[0]
                ? <Image src={lfaLogo[0]} alt="London Film Academy" fill className="object-contain" />
                : <div style={{ ...DARK_BG }} className="w-full h-full" />
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
