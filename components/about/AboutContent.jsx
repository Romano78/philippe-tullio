'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { routes } from '@/config/routes';

// ─── Swap all values below for Cloudinary URLs once assets are uploaded ──────
const IMG = {
  // Education
  acting1:       'https://picsum.photos/seed/acting-1/800/600',
  acting2:       'https://picsum.photos/seed/acting-2/800/600',
  acting3:       'https://picsum.photos/seed/acting-3/800/600',
  lfaHero:       'https://picsum.photos/seed/lfa-hero/1600/900',   // big on-set shot
  lfaLogo:       'https://picsum.photos/seed/lfa-logo/600/300',    // LFA logo image
  kcitizen1:     'https://picsum.photos/seed/kcitizen-1/800/600',
  kcitizen2:     'https://picsum.photos/seed/kcitizen-2/800/600',
  kcitizen3:     'https://picsum.photos/seed/kcitizen-3/800/600',
  kcitizen4:     'https://picsum.photos/seed/kcitizen-4/800/600',
  // Feature films
  scarface:      'https://picsum.photos/seed/scarface-gen/800/1100', // poster — portrait
  jaya1:         'https://picsum.photos/seed/jaya-1/800/600',
  jaya2:         'https://picsum.photos/seed/jaya-2/800/600',
  jaya3:         'https://picsum.photos/seed/jaya-3/800/600',
  jaya4:         'https://picsum.photos/seed/jaya-4/800/600',
  crako1:        'https://picsum.photos/seed/crako-1/800/600',
  crako2:        'https://picsum.photos/seed/crako-2/800/600',
  crako3:        'https://picsum.photos/seed/crako-3/800/600',
  crako4:        'https://picsum.photos/seed/crako-4/800/600',
  // Other work
  offside:       'https://picsum.photos/seed/offside/800/600',
  abaco1:        'https://picsum.photos/seed/abaco-1/800/600',
  abaco2:        'https://picsum.photos/seed/abaco-2/800/600',
  abaco3:        'https://picsum.photos/seed/abaco-3/800/600',
  abaco4:        'https://picsum.photos/seed/abaco-4/800/600',
};
// ─────────────────────────────────────────────────────────────────────────────

/** Reusable 2×2 or 3-col image grid */
function Gallery({ images, cols = 2 }) {
  const colClass = cols === 3 ? 'grid-cols-3' : 'grid-cols-2';
  return (
    <div className={`grid ${colClass} gap-2 md:gap-3`}>
      {images.map(({ src, alt }) => (
        <div key={alt} className="overflow-hidden group">
          <img
            src={src}
            alt={alt}
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ aspectRatio: '4 / 3' }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

/** Visual section break — overline only, extra breathing room above */
function SectionBreak({ label }) {
  return (
    <div className="site-px pt-20 md:pt-28 pb-8 md:pb-12 relative z-10">
      <div className="site-max">
        <p className="font-meta text-xs tracking-widest uppercase text-accent">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function AboutContent() {
  const t = useTranslations('aboutPage');
  const heading = t('heading').split('\n');
  const actingLines = t('actingHeading').split('\n');
  const filmschoolLines = t('filmschoolHeading').split('\n');

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO — overline · heading · intro
      ════════════════════════════════════════════════════════════ */}
      <section className="site-px pt-24 md:pt-36 pb-12 md:pb-16 relative z-10">
        <div className="site-max">
          <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-8">
            {t('overline')}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-white leading-none">
              {heading.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/55 leading-relaxed lg:pb-2">
              {t('intro')}
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ACTING — image left · text right
      ════════════════════════════════════════════════════════════ */}
      <section className="site-px py-12 md:py-16 relative z-10">
        <div className="site-max">
          <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-8 md:gap-16 items-center">
            <div className="overflow-hidden">
              <img
                src={IMG.acting1}
                alt="Joanne Baron Studio — Los Angeles"
                className="w-full object-cover"
                style={{ aspectRatio: '4 / 3' }}
                loading="lazy"
              />
            </div>
            <div>
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

      {/* Acting — 3-image row */}
      <section className="site-px pb-12 md:pb-16 relative z-10">
        <div className="site-max">
          <Gallery
            cols={3}
            images={[
              { src: IMG.acting1, alt: 'Joanne Baron Studio — Los Angeles 1' },
              { src: IMG.acting2, alt: 'Joanne Baron Studio — Los Angeles 2' },
              { src: IMG.acting3, alt: 'Joanne Baron Studio — Los Angeles 3' },
            ]}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FILM SCHOOL — text · full-width hero image · text
      ════════════════════════════════════════════════════════════ */}
      <section className="site-px pt-4 pb-8 md:pb-10 relative z-10">
        <div className="site-max">
          <p className="font-meta text-xs tracking-widest uppercase text-accent mb-4">
            {t('filmschoolEyebrow')}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-end mb-10 md:mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none">
              {filmschoolLines.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed">
              {t('filmschoolBody1')}
            </p>
          </div>
        </div>
      </section>

      {/* LFA — full-width dramatic image */}
      <section className="site-px pb-10 md:pb-12 relative z-10">
        <div className="site-max overflow-hidden">
          <img
            src={IMG.lfaHero}
            alt="London Film Academy — on set"
            className="w-full object-cover"
            style={{ aspectRatio: '16 / 9' }}
            loading="lazy"
          />
        </div>
      </section>

      {/* LFA — Lincoln Ascott text below image */}
      <section className="site-px pb-12 md:pb-16 relative z-10">
        <div className="site-max max-w-2xl">
          <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed">
            {t('filmschoolBody2')}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          LFA LOGO + K-CITIZEN TEXT · stills mosaic
      ════════════════════════════════════════════════════════════ */}
      <section className="site-px py-12 md:py-16 relative z-10">
        <div className="site-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="overflow-hidden">
              <img
                src={IMG.lfaLogo}
                alt="London Film Academy"
                className="w-full object-cover"
                style={{ aspectRatio: '2 / 1' }}
                loading="lazy"
              />
            </div>
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed">
              {t('kcitizenBlock')}
            </p>
          </div>
        </div>
      </section>

      {/* K-CITIZEN stills — 2×2 mosaic */}
      <section className="site-px pb-16 md:pb-20 relative z-10">
        <div className="site-max">
          <Gallery
            cols={2}
            images={[
              { src: IMG.kcitizen1, alt: 'K-CITIZEN — still 1' },
              { src: IMG.kcitizen2, alt: 'K-CITIZEN — still 2' },
              { src: IMG.kcitizen3, alt: 'K-CITIZEN — still 3' },
              { src: IMG.kcitizen4, alt: 'K-CITIZEN — still 4' },
            ]}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FEATURE FILMS
      ════════════════════════════════════════════════════════════ */}
      <SectionBreak label={t('featureFilmsOverline')} />

      {/* Scarface Generation — text left · poster right */}
      <section className="site-px pb-16 md:pb-20 relative z-10">
        <div className="site-max">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-16 items-start">
            <div>
              <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
                {t('labelScript')}
              </p>
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none mb-6">
                {t('scarfaceTitle')}
              </h3>
              <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed">
                {t('scarfaceDesc')}
              </p>
            </div>
            <div className="overflow-hidden">
              <img
                src={IMG.scarface}
                alt="The Scarface Generation"
                className="w-full object-cover"
                style={{ aspectRatio: '3 / 4' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* JAYA — text · gallery */}
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
          <Gallery
            cols={2}
            images={[
              { src: IMG.jaya1, alt: 'JAYA — still 1' },
              { src: IMG.jaya2, alt: 'JAYA — still 2' },
              { src: IMG.jaya3, alt: 'JAYA — still 3' },
              { src: IMG.jaya4, alt: 'JAYA — still 4' },
            ]}
          />
        </div>
      </section>

      {/* CRAKO — text · gallery */}
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
          <Gallery
            cols={2}
            images={[
              { src: IMG.crako1, alt: 'CRAKO — still 1' },
              { src: IMG.crako2, alt: 'CRAKO — still 2' },
              { src: IMG.crako3, alt: 'CRAKO — still 3' },
              { src: IMG.crako4, alt: 'CRAKO — still 4' },
            ]}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          OTHER WORK
      ════════════════════════════════════════════════════════════ */}
      <SectionBreak label={t('otherWorkOverline')} />

      {/* OFF-SIDE — text left · image right */}
      <section className="site-px pb-16 md:pb-20 relative z-10">
        <div className="site-max">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-16 items-center">
            <div>
              <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
                {t('labelSeries')}
              </p>
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none mb-6">
                {t('covidTitle')}
              </h3>
              <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed">
                {t('covidDesc')}
              </p>
            </div>
            <div className="overflow-hidden">
              <img
                src={IMG.offside}
                alt="OFF-SIDE"
                className="w-full object-cover"
                style={{ aspectRatio: '4 / 3' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABACO Paris — text · gallery */}
      <section className="site-px pb-24 md:pb-32 relative z-10">
        <div className="site-max">
          <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">
            {t('labelCommercial')}
          </p>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-none mb-4">
            {t('commercialTitle')}
          </h3>
          <p className="font-sans text-base md:text-lg text-white/60 leading-relaxed mb-10 md:mb-12 max-w-2xl">
            {t('commercialDesc')}
          </p>
          <Gallery
            cols={2}
            images={[
              { src: IMG.abaco1, alt: 'ABACO Paris — commercial 1' },
              { src: IMG.abaco2, alt: 'ABACO Paris — commercial 2' },
              { src: IMG.abaco3, alt: 'ABACO Paris — commercial 3' },
              { src: IMG.abaco4, alt: 'ABACO Paris — commercial 4' },
            ]}
          />

          <div className="mt-16 md:mt-20">
            <Link
              href={routes.contact}
              className="inline-flex items-center gap-2 font-meta text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
            >
              <span>→</span>
              <span>{t('cta')}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
