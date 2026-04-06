import PillCta from '@/components/PillCta';
import { DARK_BG } from '../primitives';

export default function KCitizenSection({ kcitizen, locale, t, tProject, noPb }) {
  return (
    <section className={`site-px pb-16 md:pb-20 relative z-10 ${noPb ? '!pb-0' : ''}`}>
      <div className="site-max">
        <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">{t('labelShortFilm')}</p>
        <h3 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase text-white leading-none mb-6">{t('kcitizenTitle')}</h3>
        <div className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-8 max-w-4xl space-y-4">
          {t('kcitizenDesc').split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <PillCta href={`/${locale}/work/k-citizen`} icon="→" className="mb-10 md:mb-12">{tProject('watchFullFilm')}</PillCta>
        {/* Mobile: portrait full width + two landscapes side by side */}
        <div className="flex flex-col gap-2 md:hidden">
          <div className="overflow-hidden">
            {kcitizen[0]
              ? <img src={kcitizen[0]} alt="K-CITIZEN" className="w-full object-cover" style={{ aspectRatio: '3 / 4' }} loading="lazy" />
              : <div style={{ ...DARK_BG, aspectRatio: '3 / 4' }} className="w-full" />
            }
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[kcitizen[1], kcitizen[2]].map((src, i) => (
              <div key={i} className="overflow-hidden">
                {src
                  ? <img src={src} alt="" className="w-full object-cover" style={{ aspectRatio: '16 / 9' }} loading="lazy" />
                  : <div style={{ ...DARK_BG, aspectRatio: '16 / 9' }} className="w-full" />
                }
              </div>
            ))}
          </div>
        </div>
        {/* Desktop: portrait left + two landscapes stacked right */}
        <div className="hidden md:grid grid-cols-[2fr_3fr] gap-3">
          <div className="overflow-hidden">
            {kcitizen[0]
              ? <img src={kcitizen[0]} alt="K-CITIZEN" className="w-full h-full object-cover" loading="lazy" />
              : <div className="w-full h-full" style={{ ...DARK_BG, aspectRatio: '3 / 4' }} />
            }
          </div>
          <div className="flex flex-col gap-3">
            {[kcitizen[1], kcitizen[2]].map((src, i) => (
              <div key={i} className="overflow-hidden">
                {src
                  ? <img src={src} alt="" className="w-full object-cover" style={{ aspectRatio: '16 / 9' }} loading="lazy" />
                  : <div style={{ ...DARK_BG, aspectRatio: '16 / 9' }} className="w-full" />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
