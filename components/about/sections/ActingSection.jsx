import { AnimateIn, AnimateHeading } from '../AnimateIn';
import { Gallery } from '../primitives';

export default function ActingSection({ acting, t, noPb }) {
  const actingLines = t('actingHeading').split('\n');
  return (
    <section className={`site-px py-12 md:py-16 relative z-10 ${noPb ? '!pb-0' : ''}`}>
      <div className="site-max">
        <div className="grid grid-cols-1 md:grid-cols-[45fr_55fr] gap-8 md:gap-16 items-start">
          <div className="md:sticky md:top-28">
            <AnimateIn><p className="font-meta text-xs tracking-widest uppercase text-accent mb-4">{t('actingEyebrow')}</p></AnimateIn>
            <AnimateHeading className="mb-6">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none">
                {actingLines.map((line, i) => <span key={i} className="block">{line}</span>)}
              </h2>
            </AnimateHeading>
            <AnimateIn delay={0.15}><p className="font-sans text-base md:text-lg text-white/60 leading-relaxed">{t('actingBody')}</p></AnimateIn>
          </div>
          <Gallery images={acting} count={3} aspect="16 / 9" rowAspect="1 / 1" />
        </div>
      </div>
    </section>
  );
}
