import { notFound } from 'next/navigation';
import { projects } from '@/components/home-swiper/data';
import { getWorkAssets } from '@/lib/cloudinary';
import ProjectPageClient from './ProjectPageClient';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const meta = projects.find((p) => p.slug === slug);
  if (!meta) notFound();

  const assets = await getWorkAssets(slug);

  const project = {
    ...meta,
    // Hero — work thumb (project detail still)
    image: assets?.work.thumb ?? assets?.featured.thumb ?? meta.image,
    // Video card poster — work thumb
    workVideo: assets?.work.video,
    workVideoPoster: assets?.work.thumb ?? assets?.featured.thumb,
    // Gallery
    gallery: assets?.work.gallery ?? [],
  };

  return <ProjectPageClient project={project} />;
}
