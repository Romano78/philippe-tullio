import PillCta from '@/components/PillCta';
import { AnimateIn, AnimateHeading } from '../AnimateIn';
import { Gallery } from '../primitives';

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
        <Gallery images={abaco} count={3} aspect="16 / 9" rowAspect="4 / 3" />
      </div>
    </section>
  );
}
