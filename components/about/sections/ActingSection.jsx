import { AnimateIn, AnimateHeading } from '../AnimateIn';
import { DARK_BG } from '../primitives';

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
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
              {acting[0]
                ? <img src={acting[0]} alt="Joanne Baron Studio — Los Angeles" className="w-full object-cover" style={{ aspectRatio: '16 / 9' }} loading="lazy" />
                : <div style={{ ...DARK_BG, aspectRatio: '16 / 9' }} className="w-full" />
              }
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[acting[1], acting[2]].map((src, i) => (
                <div key={i} className="overflow-hidden">
                  {src
                    ? <img src={src} alt="" className="w-full object-cover" style={{ aspectRatio: '1 / 1' }} loading="lazy" />
                    : <div style={{ ...DARK_BG, aspectRatio: '1 / 1' }} className="w-full" />
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
