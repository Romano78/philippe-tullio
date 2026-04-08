'use client';

import { useTranslations, useLocale } from 'next-intl';
import { soProduction } from './data';
import HeroSection from './sections/HeroSection';
import BioSection from './sections/BioSection';
import CtaSection from './sections/CtaSection';

export default function SoProductionContent({ image }) {
  const t = useTranslations('soProduction');
  const locale = useLocale();

  return (
    <>
      <HeroSection t={t} locale={locale} image={image} />
      <BioSection t={t} />
      <CtaSection t={t} email={soProduction.email} ctaHref={soProduction.ctaHref} />
    </>
  );
}
