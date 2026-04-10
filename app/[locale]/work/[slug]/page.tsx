import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { projects } from '@/components/home-swiper/data';
import { getWorkAssets } from '@/lib/cloudinary';
import ProjectPageClient from './ProjectPageClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const isFr = locale === 'fr';
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const loc = locale as 'fr' | 'en';
  const title = typeof project.title === 'object' ? (project.title[loc] ?? project.title.fr) : project.title;
  const description = typeof project.description === 'object' ? (project.description[loc] ?? project.description.fr) : (project.description ?? '');
  const category = typeof project.category === 'object' ? (project.category[loc] ?? project.category.fr) : (project.category ?? '');

  return {
    title,
    description,
    keywords: [
      'Philippe Tullio', 'TullioPhilippe', title, category,
      ...(isFr ? ['réalisateur', 'film', 'cinéma'] : ['director', 'film', 'cinema']),
    ].filter(Boolean),
    alternates: {
      canonical: isFr ? `https://philippetullio.com/work/${slug}` : `https://philippetullio.com/en/work/${slug}`,
      languages: {
        fr: `https://philippetullio.com/work/${slug}`,
        en: `https://philippetullio.com/en/work/${slug}`,
      },
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const meta = projects.find((p) => p.slug === slug);
  if (!meta) notFound();
  if (meta.noPage) redirect(`/${locale}/about`);

  const assets = await getWorkAssets(slug);

  const project = {
    ...meta,
    // Hero — dedicated hero image, fallback to featured thumb
    image: assets?.work.hero ?? assets?.featured.thumb,
    // Preview — dedicated previewvid, fallback to featured teaser
    video: assets?.work.previewVid ?? assets?.featured.video,
    videoPoster: assets?.work.previewVidPoster ?? assets?.featured.videoPoster ?? assets?.featured.thumb,
    // Full film lightbox
    videoUrl: meta.videoUrl ?? null,
    workVideo: assets?.work.video,
    workVideoPoster: assets?.work.thumb ?? assets?.featured.thumb,
    // Gallery
    gallery: assets?.work.gallery ?? [],
  };

  return <ProjectPageClient project={project} />;
}
