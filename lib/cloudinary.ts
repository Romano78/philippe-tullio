import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import { unstable_cache } from 'next/cache';
import { cldImage, cldVideo, cldVideoPoster } from './cloudinary-url';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!CLOUD)
  throw new Error('Missing env var: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');

cloudinary.config({
  cloud_name: CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── In-memory per-slug cache (SAFE FIX) ────────────────────────────────
const workCache = new Map<string, WorkAssets | null>();

// ─── Types ───────────────────────────────────────────────────────────────

interface CloudinaryResource {
  public_id: string;
  format: string;
  resource_type: 'image' | 'video';
}

export interface WorkAssets {
  featured: {
    thumb: string;
    video?: string;
    videoPoster?: string;
  };
  work: {
    thumb: string;
    previewVid?: string;
    previewVidPoster?: string;
    video?: string;
    videoPoster?: string;
    gallery: string[];
    hero: string;
  };
}

// ─── Work assets ─────────────────────────────────────────────────────────

async function _getWorkAssets(slug: string): Promise<WorkAssets | null> {
  try {
    // ✅ PER-SLUG CACHE CHECK
    if (workCache.has(slug)) {
      return workCache.get(slug)!;
    }

    const base = `work/${slug}`;

    const [
      featuredThumbRes,
      featuredVideoRes,
      projectThumbRes,
      projectPreviewVidRes,
      projectVideoRes,
      projectGalleryImgRes,
      projectHeroRes,
    ] = await Promise.allSettled([
      cloudinary.search
        .expression(
          `asset_folder="${base}/featured/thumb" AND resource_type=image`,
        )
        .max_results(5)
        .execute(),
      cloudinary.search
        .expression(
          `asset_folder="${base}/featured/video" AND resource_type=video`,
        )
        .max_results(5)
        .execute(),
      cloudinary.search
        .expression(`asset_folder="${base}/work/thumb" AND resource_type=image`)
        .max_results(5)
        .execute(),
      cloudinary.search
        .expression(
          `asset_folder="${base}/work/previewvid" AND resource_type=video`,
        )
        .max_results(5)
        .execute(),
      cloudinary.search
        .expression(`asset_folder="${base}/work/video" AND resource_type=video`)
        .max_results(5)
        .execute(),
      cloudinary.search
        .expression(
          `asset_folder="${base}/work/gallery" AND resource_type=image`,
        )
        .max_results(50)
        .execute(),
      cloudinary.search
        .expression(`asset_folder="${base}/work/hero" AND resource_type=image`)
        .max_results(50)
        .execute(),
    ]);

    const featuredThumbImage: CloudinaryResource[] =
      featuredThumbRes.status === 'fulfilled'
        ? featuredThumbRes.value.resources
        : [];

    const featuredVideos: CloudinaryResource[] =
      featuredVideoRes.status === 'fulfilled'
        ? featuredVideoRes.value.resources
        : [];

    const projectImages: CloudinaryResource[] =
      projectThumbRes.status === 'fulfilled'
        ? projectThumbRes.value.resources
        : [];

    const projectPreviewVids: CloudinaryResource[] =
      projectPreviewVidRes.status === 'fulfilled'
        ? projectPreviewVidRes.value.resources
        : [];

    const projectVideos: CloudinaryResource[] =
      projectVideoRes.status === 'fulfilled'
        ? projectVideoRes.value.resources
        : [];

    const projectHeroImages: CloudinaryResource[] =
      projectHeroRes.status === 'fulfilled'
        ? projectHeroRes.value.resources
        : [];

    const projectGalleryImages: CloudinaryResource[] =
      projectGalleryImgRes.status === 'fulfilled'
        ? projectGalleryImgRes.value.resources
        : [];

    const featuredThumb = featuredThumbImage[0];
    const featuredVideo = featuredVideos[0];
    const projectThumb = projectImages[0];
    const projectPreviewVid = projectPreviewVids[0];
    const projectVideo = projectVideos[0];

    const projectGallery = projectGalleryImages.sort((a, b) =>
      a.public_id.localeCompare(b.public_id),
    );

    if (!featuredThumb) return null;

    const finalResult: WorkAssets = {
      featured: {
        thumb: cldImage(`${featuredThumb.public_id}.${featuredThumb.format}`),
        ...(featuredVideo && {
          video: cldVideo(`${featuredVideo.public_id}.${featuredVideo.format}`),
          videoPoster: cldVideoPoster(featuredVideo.public_id),
        }),
      },
      work: {
        thumb: projectThumb
          ? cldImage(`${projectThumb.public_id}.${projectThumb.format}`)
          : cldVideoPoster(featuredThumb.public_id),
        ...(projectPreviewVid && {
          previewVid: cldVideo(
            `${projectPreviewVid.public_id}.${projectPreviewVid.format}`,
          ),
          previewVidPoster: cldVideoPoster(projectPreviewVid.public_id),
        }),
        ...(projectVideo && {
          video: cldVideo(`${projectVideo.public_id}.${projectVideo.format}`),
          videoPoster: cldVideoPoster(projectVideo.public_id),
        }),
        hero: projectHeroImages[0]
          ? cldImage(
              `${projectHeroImages[0].public_id}.${projectHeroImages[0].format}`,
            )
          : cldImage(`${featuredThumb.public_id}.${featuredThumb.format}`),
        gallery: projectGallery.map((img) =>
          cldImage(`${img.public_id}.${img.format}`),
        ),
      },
    };

    // ✅ STORE IN CACHE
    workCache.set(slug, finalResult);

    return finalResult;
  } catch (err) {
    console.error(`[cloudinary] getWorkAssets(${slug}) failed:`, err);
    return null;
  }
}

// Cache per slug — 1 hour revalidation
export const getWorkAssets = unstable_cache(
  _getWorkAssets,
  ['cloudinary-work-assets'],
  { revalidate: 3600 },
);

// ─── About page assets ───────────────────────────────────────────────────

export interface AboutAssets {
  portrait: string[];
  acting: string[];
  lfaHero: string[];
  lfaLogo: string[];
  kcitizen: string[];
  scarface: string[];
  jaya: string[];
  crako: string[];
  offside: string[];
  abaco: string[];
  jesusIsBack: string[];
}

const ABOUT_FOLDERS: Array<[keyof AboutAssets, string]> = [
  ['portrait', 'about/portrait'],
  ['acting', 'about/acting'],
  ['lfaHero', 'about/lfa/hero'],
  ['lfaLogo', 'about/lfa/logo'],
  ['kcitizen', 'about/kcitizen'],
  ['scarface', 'about/scarface'],
  ['jaya', 'about/jaya'],
  ['crako', 'about/crako'],
  ['offside', 'about/offside'],
  ['abaco', 'about/abaco'],
  ['jesusIsBack', 'about/jesus-is-back'],
];

async function _getAboutAssets(): Promise<AboutAssets> {
  const results = await Promise.allSettled(
    ABOUT_FOLDERS.map(([, folder]) =>
      cloudinary.search
        .expression(`asset_folder="${folder}" AND resource_type=image`)
        .max_results(20)
        .execute(),
    ),
  );

  const assets = {} as AboutAssets;

  ABOUT_FOLDERS.forEach(([key], i) => {
    const result = results[i];
    if (result.status !== 'fulfilled') {
      assets[key] = [];
      return;
    }

    const resources: CloudinaryResource[] = result.value.resources;

    resources.sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

    resources.sort((a: any, b: any) => a.public_id.localeCompare(b.public_id));

    assets[key] = resources.map((r) => cldImage(`${r.public_id}.${r.format}`));
  });

  return assets;
}

export const getAboutAssets = unstable_cache(
  _getAboutAssets,
  ['about-assets'],
  { revalidate: 3600 },
);

// ─── All gallery images ────────────────────────────────────────────────

async function _getAllGalleryImages(): Promise<string[]> {
  try {
    const result = await cloudinary.search
      .expression(`asset_folder="gallery" AND resource_type=image`)
      .max_results(100)
      .execute();

    const resources: CloudinaryResource[] = result.resources;

    return resources.map((r) => cldImage(`${r.public_id}.${r.format}`));
  } catch (err) {
    console.error('[cloudinary] getAllGalleryImages failed:', err);
    return [];
  }
}

export const getAllGalleryImages = unstable_cache(
  _getAllGalleryImages,
  ['all-gallery-images'],
  { revalidate: 3600 },
);
