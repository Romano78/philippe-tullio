import Image from 'next/image';
import PillCta from '@/components/PillCta';
import { AnimateIn, AnimateHeading } from '../AnimateIn';
import { DARK_BG } from '../primitives';

export default function KCitizenSection({ kcitizen, locale, t, tProject, noPb }) {
  return (
    <section className={`site-px pb-16 md:pb-20 relative z-10 ${noPb ? '!pb-0' : ''}`}>
      <div className="site-max">
        <AnimateIn><p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">{t('labelShortFilm')}</p></AnimateIn>
        <AnimateHeading className="mb-6">
          <h3 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase text-white leading-none">{t('kcitizenTitle')}</h3>
        </AnimateHeading>
        <AnimateIn delay={0.1}>
          <div className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-8 max-w-4xl space-y-4">
            {t('kcitizenDesc').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </AnimateIn>
        <AnimateIn delay={0.2}><PillCta href={`/${locale}/work/k-citizen`} icon="→" className="mb-10 md:mb-12">{tProject('watchFullFilm')}</PillCta></AnimateIn>
        {/* Mobile */}
        <div className="flex flex-col gap-2 md:hidden">
          <div className="relative overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
            {kcitizen[0]
              ? <Image src={kcitizen[0]} alt="K-CITIZEN" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
              : <div style={{ ...DARK_BG }} className="w-full h-full" />
            }
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[kcitizen[1], kcitizen[2]].map((src, i) => (
              <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                {src
                  ? <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 28vw" className="object-cover" />
                  : <div style={{ ...DARK_BG }} className="w-full h-full" />
                }
              </div>
            ))}
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden md:grid grid-cols-[2fr_3fr] gap-3">
          <div className="relative overflow-hidden">
            {kcitizen[0]
              ? <Image src={kcitizen[0]} alt="K-CITIZEN" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
              : <div className="w-full h-full" style={{ ...DARK_BG }} />
            }
          </div>
          <div className="flex flex-col gap-3">
            {[kcitizen[1], kcitizen[2]].map((src, i) => (
              <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                {src
                  ? <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 28vw" className="object-cover" />
                  : <div style={{ ...DARK_BG }} className="w-full h-full" />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
