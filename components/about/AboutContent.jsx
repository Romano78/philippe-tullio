'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { SectionBreak } from './primitives';
import HeroSection from './sections/HeroSection';
import ActingSection from './sections/ActingSection';
import FilmSchoolSection from './sections/FilmSchoolSection';
import KCitizenSection from './sections/KCitizenSection';
import AbacoSection from './sections/AbacoSection';
import JesusIsBackSection from './sections/JesusIsBackSection';
import JayaSection from './sections/JayaSection';
import CrakoSection from './sections/CrakoSection';
import ScriptsSection from './sections/ScriptsSection';

export default function AboutContent({ assets }) {
  const t = useTranslations('aboutPage');
  const tProject = useTranslations('project');
  const locale = useLocale();

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
      <HeroSection portrait={portrait} t={t} />
      <ActingSection acting={acting} t={t} />
      <FilmSchoolSection lfaHero={lfaHero} lfaLogo={lfaLogo} t={t} />
      <KCitizenSection kcitizen={kcitizen} locale={locale} t={t} tProject={tProject} noPb />

      <SectionBreak label={t('otherWorkOverline')} />
      <AbacoSection abaco={abaco} locale={locale} t={t} tProject={tProject} />
      <JesusIsBackSection jesusIsBack={jesusIsBack} locale={locale} t={t} tProject={tProject} noPb />

      <SectionBreak label={t('inDevelopmentOverline')} />
      <JayaSection jaya={jaya} locale={locale} t={t} tProject={tProject} />
      <CrakoSection crako={crako} t={t} noPb />

      <SectionBreak label={t('featureFilmsOverline')} />
      <ScriptsSection scarface={scarface} offside={offside} t={t} />
    </>
  );
}
