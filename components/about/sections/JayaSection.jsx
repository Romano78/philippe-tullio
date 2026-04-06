import PillCta from '@/components/PillCta';
import { Gallery } from '../primitives';

export default function JayaSection({ jaya, locale, t, tProject, noPb }) {
  return (
    <section className={`site-px pb-16 md:pb-20 relative z-10 ${noPb ? '!pb-0' : ''}`}>
      <div className="site-max">
        <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">{t('labelScript')}</p>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none mb-4">{t('jayaTitle')}</h3>
        <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-2xl">{t('jayaDesc')}</p>
        <PillCta href={`/${locale}/work/jaya`} icon="→" className="mb-10 md:mb-12">{tProject('watchFullFilm')}</PillCta>
        <Gallery images={jaya.slice(0, 4)} count={4} />
      </div>
    </section>
  );
}
