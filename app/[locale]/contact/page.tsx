import type { Metadata } from 'next';
import StormBackground from '@/components/project/StormBackground';
import Contact from '@/components/contact';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: 'Contact',
    description: isFr
      ? 'Contactez Philippe Tullio, réalisateur basé à Paris. Disponible pour films, publicités et clips musicaux.'
      : 'Contact Philippe Tullio, film director based in Paris. Available for films, commercials and music videos.',
    keywords: isFr
      ? ['Philippe Tullio contact', 'réalisateur à louer', 'réalisateur Paris', 'publicité film', 'clip musical Paris']
      : ['Philippe Tullio contact', 'hire film director', 'Paris director', 'commercial director', 'music video director Paris'],
    alternates: {
      canonical: isFr ? 'https://philippetullio.com/contact' : 'https://philippetullio.com/en/contact',
      languages: {
        fr: 'https://philippetullio.com/contact',
        en: 'https://philippetullio.com/en/contact',
      },
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <StormBackground />
      <main className="relative z-10 min-h-screen flex flex-col justify-end">
        <Contact asH1 />
      </main>
    </>
  );
}
