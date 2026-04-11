import type { Metadata } from 'next';
import HomeSwiper from "@/components/home-swiper";
import { getWorkAssets } from "@/lib/cloudinary";
import { projects as projectsMeta } from "@/components/home-swiper/data";
import { ScrollProgressButton } from "@/components/scroll-progress-button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const title = isFr ? 'Tullio Philippe — Réalisateur' : 'Tullio Philippe — Director';
  const description = isFr
    ? 'Réalisateur basé à Paris. Films d\'action, horreur, drame, satire. Découvrez l\'univers cinématographique de Philippe Tullio.'
    : 'Film director based in Paris. Action, horror, drama, satire. Discover the cinematic world of Philippe Tullio.';
  return {
    title,
    description,
    keywords: isFr
      ? ['Philippe Tullio', 'PhilippeTullio', 'Tullio Philippe', 'TullioPhilippe', 'réalisateur', 'réalisateur Paris', 'cinéaste', 'film d\'action', 'horreur', 'drame', 'satire']
      : ['Philippe Tullio', 'PhilippeTullio', 'Tullio Philippe', 'TullioPhilippe', 'film director', 'Paris director', 'action film', 'horror', 'drama', 'satire'],
    alternates: {
      canonical: isFr ? 'https://philippetullio.com' : 'https://philippetullio.com/en',
      languages: {
        fr: 'https://philippetullio.com',
        en: 'https://philippetullio.com/en',
      },
    },
    openGraph: {
      title,
      description,
      url: isFr ? 'https://philippetullio.com' : 'https://philippetullio.com/en',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title,
      description,
      images: ['/opengraph-image.png'],
    },
  };
}

export default async function Home() {
  const assetsMap: Record<string, Awaited<ReturnType<typeof getWorkAssets>>> = {};

  await Promise.allSettled(
    projectsMeta.map(async (p) => {
      const assets = await getWorkAssets(p.slug);
      if (assets) assetsMap[p.slug] = assets;
    }),
  );

  const projects = projectsMeta.map((p) => ({
    ...p,
    ...(assetsMap[p.slug]
      ? {
        image: assetsMap[p.slug]!.featured.thumb,
        thumb: assetsMap[p.slug]!.featured.thumb,
        video: assetsMap[p.slug]!.featured.video,
        videoPoster: assetsMap[p.slug]!.featured.videoPoster,
        videoMobile: assetsMap[p.slug]!.featured.videoMobile,
      }
      : {}),
  }));

  return (
    <main>
      <HomeSwiper projects={projects} />
      <ScrollProgressButton position='center' />
    </main>
  );
}
