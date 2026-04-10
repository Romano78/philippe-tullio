import type { MetadataRoute } from 'next';
import { projects } from '@/components/home-swiper/data';

const BASE = 'https://philippetullio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/gallery', '/contact'];

  const staticEntries = staticRoutes.flatMap((route) => [
    { url: `${BASE}${route}`, lastModified: new Date(), alternates: { languages: { fr: `${BASE}${route}`, en: `${BASE}/en${route}` } } },
  ]);

  const projectEntries = projects
    .filter((p) => !p.noPage)
    .flatMap((p) => [
      { url: `${BASE}/work/${p.slug}`, lastModified: new Date(), alternates: { languages: { fr: `${BASE}/work/${p.slug}`, en: `${BASE}/en/work/${p.slug}` } } },
    ]);

  return [...staticEntries, ...projectEntries];
}
