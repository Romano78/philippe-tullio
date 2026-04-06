import PillCta from '@/components/PillCta';
import { AnimateIn, AnimateHeading } from '../AnimateIn';
import { DARK_BG } from '../primitives';

export default function AbacoSection({ abaco, locale, t, tProject, noPb }) {
  return (
    <section className={`site-px pb-16 md:pb-20 relative z-10 ${noPb ? '!pb-0' : ''}`}>
      <div className="site-max">
        <AnimateIn><p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">{t('labelCommercial')}</p></AnimateIn>
        <AnimateHeading className="mb-4">
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none">{t('commercialTitle')}</h3>
        </AnimateHeading>
        <AnimateIn delay={0.1}><p className="font-sans text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-2xl">{t('commercialDesc')}</p></AnimateIn>
        <AnimateIn delay={0.2}><PillCta href={`/${locale}/work/abaco`} icon="→" className="mb-10 md:mb-12">{tProject('watchFullFilm')}</PillCta></AnimateIn>
        <div className="flex flex-col gap-2 md:gap-3">
          <div className="overflow-hidden">
            {abaco[0]
              ? <img src={abaco[0]} alt="ABACO Paris" className="w-full object-cover" style={{ aspectRatio: '16 / 9' }} loading="lazy" />
              : <div style={{ ...DARK_BG, aspectRatio: '16 / 9' }} className="w-full" />
            }
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {[abaco[1], abaco[2]].map((src, i) => (
              <div key={i} className="overflow-hidden">
                {src
                  ? <img src={src} alt="" className="w-full object-cover" style={{ aspectRatio: '4 / 3' }} loading="lazy" />
                  : <div style={{ ...DARK_BG, aspectRatio: '4 / 3' }} className="w-full" />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
