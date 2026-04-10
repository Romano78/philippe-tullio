import type { Metadata } from 'next';
import { getAboutAssets } from '@/lib/cloudinary';
import StormBackground from '@/components/project/StormBackground';
import AboutContent from '@/components/about/AboutContent';
import Contact from '@/components/contact';
import { ScrollProgressButton } from '@/components/scroll-progress-button';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr ? 'À propos' : 'About',
    description: isFr
      ? 'Né à Paris, Philippe Tullio découvre sa passion pour la mise en scène à travers le jeu d\'acteur — une double formation qui forge un regard singulier sur la direction.'
      : 'Born in Paris, Philippe Tullio discovered his passion for filmmaking through acting — a dual training that shaped a singular approach to direction.',
    keywords: isFr
      ? ['Philippe Tullio', 'TullioPhilippe', 'réalisateur Paris', 'London Film Academy', 'Joanne Baron', 'K-CITIZEN', 'JAYA', 'cinéaste français']
      : ['Philippe Tullio', 'TullioPhilippe', 'Paris film director', 'London Film Academy', 'Joanne Baron', 'K-CITIZEN', 'JAYA', 'French director'],
    alternates: {
      canonical: isFr ? 'https://philippetullio.com/about' : 'https://philippetullio.com/en/about',
      languages: {
        fr: 'https://philippetullio.com/about',
        en: 'https://philippetullio.com/en/about',
      },
    },
  };
}

export default async function AboutPage() {
  const assets = await getAboutAssets();

  return (
    <>
      <StormBackground />
      <ScrollProgressButton position='center' />
      <main className="relative z-10">
        <AboutContent assets={assets} />
        <Contact />
      </main>
    </>
  );
}
