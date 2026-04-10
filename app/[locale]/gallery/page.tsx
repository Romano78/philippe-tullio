import type { Metadata } from 'next';
import { getAllGalleryImages } from '@/lib/cloudinary';
import StormBackground from '@/components/project/StormBackground';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Contact from '@/components/contact';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr ? 'Galerie' : 'Gallery',
    description: isFr
      ? 'Dans les coulisses des tournages de Philippe Tullio. Les matins sur les plateaux, les décisions de dernière minute, les voyages qui précèdent les tournages.'
      : 'Behind the scenes of Philippe Tullio\'s shoots. Early mornings on set, last-minute decisions, the trips before the shoots.',
    keywords: isFr
      ? ['Philippe Tullio', 'galerie', 'coulisses tournage', 'plateau de tournage', 'behind the scenes', 'photographie cinéma']
      : ['Philippe Tullio', 'gallery', 'behind the scenes', 'film set', 'on set photography', 'cinema photography'],
    alternates: {
      canonical: isFr ? 'https://philippetullio.com/gallery' : 'https://philippetullio.com/en/gallery',
      languages: {
        fr: 'https://philippetullio.com/gallery',
        en: 'https://philippetullio.com/en/gallery',
      },
    },
  };
}

export default async function GalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <>
      <StormBackground />
      <main className="relative z-10">
        <GalleryGrid images={images} />
        <Contact />
      </main>
    </>
  );
}
