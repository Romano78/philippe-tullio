import type { Metadata } from 'next';
import StormBackground from '@/components/project/StormBackground';
import SoProductionContent from '@/components/so-production/SoProductionContent';
import Contact from '@/components/contact';
import { ScrollProgressButton } from '@/components/scroll-progress-button';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr ? 'Sans Oreilles Production' : 'Sans Oreilles Production',
    description: isFr
      ? 'Sans Oreilles Production — maison de production cinématographique fondée par Philippe Tullio.'
      : 'Sans Oreilles Production — cinematic production company founded by Philippe Tullio.',
    keywords: isFr
      ? ['Sans Oreilles Production', 'SO Productions', 'soproductions', 'maison de production', 'Philippe Tullio', 'production cinéma Paris']
      : ['Sans Oreilles Production', 'SO Productions', 'soproductions', 'production company', 'Philippe Tullio', 'Paris film production'],
    alternates: {
      canonical: isFr ? 'https://soproductions.fr' : 'https://soproductions.fr/en',
      languages: {
        fr: 'https://soproductions.fr',
        en: 'https://soproductions.fr/en',
      },
    },
  };
}

export default async function SoProductionPage() {
  // image placeholder — will be fetched from Cloudinary when asset is uploaded
  const image = null;

  return (
    <>
      <StormBackground />
      <ScrollProgressButton position='center' />
      <main className='relative z-10'>
        <SoProductionContent image={image} />
        <Contact />
      </main>
    </>
  );
}
