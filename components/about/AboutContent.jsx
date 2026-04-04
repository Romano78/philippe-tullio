'use client';

import { useTranslations } from 'next-intl';
import { routes } from '@/config/routes';
import PillCta from '@/components/PillCta';
import { useLocale } from 'next-intl';

const DARK_BG = { background: 'rgba(255,255,255,0.04)' };

/** Single image slot — dark placeholder when no URL */
function Img({ src, alt, ratio = '4 / 3', eager = false, className = '' }) {
  if (!src) {
    return <div style={{ ...DARK_BG, aspectRatio: ratio }} className={`w-full ${className}`} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full object-cover ${className}`}
      style={{ aspectRatio: ratio }}
      loading={eager ? 'eager' : 'lazy'}
    />
  );
}

/** Gallery grid — always renders, dark placeholders for missing slots */
function Gallery({ images = [], cols, count = 2, aspect = '1 / 1' }) {
  const total = images.length || count;
  const c = cols ?? (total === 1 ? 1 : total === 3 ? 3 : 2);
  const colClass = c === 3 ? 'grid-cols-3' : c === 1 ? 'grid-cols-1' : 'grid-cols-2';
  const slots = images.length
    ? images
    : Array(count).fill(null);

  return (
    <div className={`grid ${colClass} gap-2 md:gap-3`}>
      {slots.map((src, i) => (
        <div key={src ?? i} className="overflow-hidden group">
          {src
            ? <img
                src={src}
                alt=""
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ aspectRatio: aspect }}
                loading="lazy"
              />
            : <div style={{ ...DARK_BG, aspectRatio: aspect }} className="w-full" />
          }
        </div>
      ))}
    </div>
  );
}

/** Visual section break with lime overline */
function SectionBreak({ label }) {
  return (
    <div className="site-px pt-14 md:pt-24 pb-8 md:pb-12 relative z-10">
      <div className="site-max">
        <p className="font-meta text-xs tracking-widest uppercase text-accent">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function AboutContent({ assets }) {
  const t = useTranslations('aboutPage');
  const tProject = useTranslations('project');
  const locale = useLocale();
  const heading = t('heading').split('\n');
  const actingLines = t('actingHeading').split('\n');
  const filmschoolLines = t('filmschoolHeading').split('\n');

  const {
    portrait    = [],
    acting      = [],
    lfaHero     = [],
    lfaLogo     = [],
    kcitizen    = [],
    scarface    = [],
    jaya        = [],
    crako       = [],
    offside     = [],
    abaco       = [],
    jesusIsBack = [],
  } = assets ?? {};

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO — overline · heading · intro · portrait
      ════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] lg:min-h-[85svh]">

          <div className="flex flex-col site-px pt-24 md:pt-36 pb-12 md:pb-16 lg:min-h-[85svh]">
            <div>
              <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-8">
                {t('overline')}
              </p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] uppercase text-white leading-none">
                {heading.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>
            </div>
            <div className="mt-10 lg:mt-auto">
              <p className="font-sans text-lg md:text-xl text-white/55 leading-relaxed max-w-lg mb-8">
                {t('intro')}
              </p>
              <PillCta href={routes.contact} icon="→">
                {t('cta')}
              </PillCta>
            </div>
          </div>

          {/* Portrait — full width on mobile, bleeds to edge on desktop */}
          <div className="overflow-hidden aspect-[4/3] lg:aspect-[3/4]">
            {portrait[0]
              ? <img src={portrait[0]} alt="Philippe Tullio — réalisateur"
                  className="w-full h-full object-cover object-center" loading="eager" />
              : <div className="w-full h-full" style={DARK_BG} />
            }
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ACTING — images left (hero + 2 squares) · sticky text right
      ════════════════════════════════════════════════════════════ */}
      <section className="site-px py-12 md:py-16 relative z-10">
        <div className="site-max">
          <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-8 md:gap-16 items-start">

            {/* Left: hero image + two small squares below */}
            <div className="flex flex-col gap-2">
              <div className="overflow-hidden">
                {acting[0]
                  ? <img src={acting[0]} alt="Joanne Baron Studio — Los Angeles"
                      className="w-full object-cover aspect-[4/3] md:aspect-auto md:max-h-[65vh]"
                      loading="lazy" />
                  : <div style={{ ...DARK_BG, aspectRatio: '4 / 3' }} className="w-full" />
                }
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[acting[1], acting[2]].map((src, i) => (
                  <div key={i} className="overflow-hidden">
                    {src
                      ? <img src={src} alt="" className="w-full object-cover"
                          style={{ aspectRatio: '1 / 1' }} loading="lazy" />
                      : <div style={{ ...DARK_BG, aspectRatio: '1 / 1' }} className="w-full" />
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Right: sticky text */}
            <div className="md:sticky md:top-28">
              <p className="font-meta text-xs tracking-widest uppercase text-accent mb-4">
                {t('actingEyebrow')}
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none mb-6">
                {actingLines.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
              <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed">
                {t('actingBody')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FILM SCHOOL — hero image · eyebrow · heading · text
      ════════════════════════════════════════════════════════════ */}

      {/* Hero image first — only renders when image exists */}
      {lfaHero[0] && (
        <section className="site-px pt-4 pb-10 md:pb-12 relative z-10">
          <div className="site-max overflow-hidden">
            <img src={lfaHero[0]} alt="London Film Academy — on set"
              className="w-full object-cover object-top aspect-[4/3] md:aspect-auto md:max-h-[65vh]"
              loading="lazy" />
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════
          LFA — big logo (40%) · heading + text (60%)
               small badge · K-CITIZEN text
      ════════════════════════════════════════════════════════════ */}
      <section className="site-px pb-16 md:pb-20 relative z-10">
        <div className="site-max">

          {/* ── Mobile only ── */}
          <div className="md:hidden mb-10">
            {/* Text */}
            <p className="font-meta text-xs tracking-widest uppercase text-accent mb-4">
              {t('filmschoolEyebrow')}
            </p>
            <h2 className="font-display text-3xl uppercase text-white leading-none mb-6">
              {filmschoolLines.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="font-sans text-base text-white/60 leading-relaxed mb-3">
              {t('filmschoolBody1')}
            </p>
            <p className="font-sans text-base text-white/60 leading-relaxed mb-8">
              {t('filmschoolBody2')}
            </p>

            {/* Big logo — full width */}
            <div className="overflow-hidden mb-8">
              {lfaLogo[0]
                ? <img src={lfaLogo[0]} alt="London Film Academy"
                    className="w-full object-contain" style={{ aspectRatio: '1200 / 799' }} loading="lazy" />
                : <div style={{ ...DARK_BG, aspectRatio: '1200 / 799' }} className="w-full" />
              }
            </div>

            {/* K-CITIZEN text */}
            <p className="font-sans text-base text-white/70 leading-relaxed">
              {t('kcitizenBlock')}
            </p>
          </div>

          {/* ── Desktop: Row 1 — heading + body (left) · big logo (right) ── */}
          <div className="hidden md:grid grid-cols-[3fr_2fr] gap-14 items-start mb-10">
            <div>
              <p className="font-meta text-xs tracking-widest uppercase text-accent mb-4">
                {t('filmschoolEyebrow')}
              </p>
              <h2 className="font-display text-4xl lg:text-5xl uppercase text-white leading-none mb-6">
                {filmschoolLines.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
              <p className="font-sans text-lg text-white/60 leading-relaxed mb-4">
                {t('filmschoolBody1')}
              </p>
              <p className="font-sans text-lg text-white/60 leading-relaxed mb-4">
                {t('filmschoolBody2')}
              </p>
              <p className="font-sans text-lg text-white/60 leading-relaxed">
                {t('kcitizenBlock')}
              </p>
            </div>
            <div className="overflow-hidden">
              {lfaLogo[0]
                ? <img src={lfaLogo[0]} alt="London Film Academy"
                    className="w-full object-contain"
                    style={{ aspectRatio: '1200 / 799' }} loading="lazy" />
                : <div style={{ ...DARK_BG, aspectRatio: '1200 / 799' }} className="w-full" />
              }
            </div>
          </div>

        </div>
      </section>

      <section className="site-px pb-16 md:pb-20 relative z-10">
        <div className="site-max">
          <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
            {t('labelShortFilm')}
          </p>
          <h3 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase text-white leading-none mb-6">
            {t('kcitizenTitle')}
          </h3>
          <div className="font-sans text-lg md:text-xl text-white/60 leading-relaxed mb-8 max-w-4xl space-y-4">
            {t('kcitizenDesc').split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <PillCta href={`/${locale}/work/k-citizen`} icon="→" className="mb-10 md:mb-12">
            {tProject('watchFullFilm')}
          </PillCta>
          {/* Mobile: portrait full width + two landscapes side by side below */}
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

      {/* ════════════════════════════════════════════════════════════
          IN DEVELOPMENT
      ════════════════════════════════════════════════════════════ */}
      <SectionBreak label={t('inDevelopmentOverline')} />

      {/* JAYA */}
      <section className="site-px pb-16 md:pb-20 relative z-10">
        <div className="site-max">
          <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
            {t('labelScript')}
          </p>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none mb-4">
            {t('jayaTitle')}
          </h3>
          <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed mb-10 md:mb-12 max-w-2xl">
            {t('jayaDesc')}
          </p>
          <Gallery images={jaya.slice(0, 4)} count={4} />
        </div>
      </section>

      {/* CRAKO */}
      <section className="site-px pb-16 md:pb-20 relative z-10">
        <div className="site-max">
          <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
            {t('labelInDevelopment')}
          </p>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none mb-4">
            {t('crakoTitle')}
          </h3>
          <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed mb-10 md:mb-12 max-w-2xl">
            {t('crakoDesc')}
          </p>
          <Gallery images={crako.slice(0, 4)} count={4} />
        </div>
      </section>

      {/* JESUS IS BACK */}
      <section className="site-px pb-16 md:pb-20 relative z-10">
        <div className="site-max">
          <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
            {t('labelShortFilm')}
          </p>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none mb-4">
            {t('jesusTitle')}
          </h3>
          <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed mb-10 md:mb-12 max-w-2xl">
            {t('jesusDesc')}
          </p>
          {jesusIsBack.length > 0 && (
            <Gallery images={jesusIsBack} count={jesusIsBack.length} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SCRIPTS
      ════════════════════════════════════════════════════════════ */}
      <SectionBreak label={t('featureFilmsOverline')} />

      {/* Scarface + HORS-JEU side by side */}
      <section className="site-px pb-16 md:pb-20 relative z-10">
        <div className="site-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 items-start">

            {/* Scarface */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
                  {t('labelScript')}
                </p>
                <h3 className="font-display text-3xl md:text-4xl uppercase text-white leading-none mb-4">
                  {t('scarfaceTitle')}
                </h3>
                <p className="font-sans text-base text-white/60 leading-relaxed">
                  {t('scarfaceDesc')}
                </p>
              </div>
              <Img src={scarface[0]} alt="The Scarface Generation" ratio="3 / 4" />
            </div>

            {/* HORS-JEU */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
                  {t('labelSeries')}
                </p>
                <h3 className="font-display text-3xl md:text-4xl uppercase text-white leading-none mb-4">
                  {t('covidTitle')}
                </h3>
                <p className="font-sans text-base text-white/60 leading-relaxed">
                  {t('covidDesc')}
                </p>
              </div>
              <Img src={offside[0]} alt="HORS-JEU" ratio="3 / 4" />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PRODUCTION & DIRECTION
      ════════════════════════════════════════════════════════════ */}
      <SectionBreak label={t('otherWorkOverline')} />

      {/* ABACO Paris */}
      <section className="site-px pb-24 md:pb-32 relative z-10">
        <div className="site-max">
          <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
            {t('labelCommercial')}
          </p>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none mb-4">
            {t('commercialTitle')}
          </h3>
          <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-2xl">
            {t('commercialDesc')}
          </p>
          <PillCta href={`/${locale}/work/abaco`} icon="→" className="mb-10 md:mb-12">
            {tProject('watchFullFilm')}
          </PillCta>
          <div className="flex flex-col gap-2 md:gap-3">
            {/* 01 — full width hero */}
            <div className="overflow-hidden">
              {abaco[0]
                ? <img src={abaco[0]} alt="ABACO Paris" className="w-full object-cover" style={{ aspectRatio: '16 / 9' }} loading="lazy" />
                : <div style={{ ...DARK_BG, aspectRatio: '16 / 9' }} className="w-full" />
              }
            </div>
            {/* 02 + 03 — two rectangles side by side */}
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

    </>
  );
}
