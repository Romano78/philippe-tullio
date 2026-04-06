import 'server-only';
import { v2 as cloudinary } from 'cloudinary';
import { unstable_cache } from 'next/cache';
import { cldImage, cldVideo, cldVideoPoster } from './cloudinary-url';

// URL builders are in ./cloudinary-url — import from there in client components

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!CLOUD)
  throw new Error('Missing env var: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');

cloudinary.config({
  cloud_name: CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface CloudinaryResource {
  public_id: string;
  format: string;
  resource_type: 'image' | 'video';
}

export interface WorkAssets {
  // featured/ — homepage section
  featured: {
    thumb: string; // video poster / placeholder image
    video?: string; // autoplay muted background video
    videoPoster?: string; // fallback for unsupported browsers
  };
  // project/ — /work/[slug] detail page
  work: {
    thumb: string; // video poster / placeholder image
    previewVid?: string; // autoplay muted preview on project page
    previewVidPoster?: string;
    video?: string; // full film — lightbox player
    videoPoster?: string;
    gallery: string[]; // stills — named 01_*, 02_*, 03_*
    hero: string; // hero image for project page (same as featured thumb or first gallery image)
  };
}

// ─── Work assets ──────────────────────────────────────────────────────────────

async function _getWorkAssets(slug: string): Promise<WorkAssets | null> {
  try {
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

    return {
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
        ...(projectHeroImages[0] && {
          hero: cldImage(
            `${projectHeroImages[0].public_id}.${projectHeroImages[0].format}`,
          ),
        }),
        gallery: projectGallery.map((img) =>
          cldImage(`${img.public_id}.${img.format}`),
        ),
      },
    };
  } catch (err) {
    console.error(`[cloudinary] getWorkAssets(${slug}) failed:`, err);
    return null;
  }
}

// Cache per slug — 1 hour revalidation, avoids hammering the Search API
export const getWorkAssets = unstable_cache(
  _getWorkAssets,
  ['cloudinary-work-assets'],
  { revalidate: 3600 },
);

// ─── About page assets ───────────────────────────────────────────────────────

export interface AboutAssets {
  portrait: string[]; // about/portrait/      — single hero portrait
  acting: string[]; // about/acting/        — upload order = display order
  lfaHero: string[]; // about/lfa/hero/      — single image
  lfaLogo: string[]; // about/lfa/logo/      — single image
  kcitizen: string[]; // about/kcitizen/      — gallery (4)
  scarface: string[]; // about/scarface/      — single poster
  jaya: string[]; // about/jaya/          — gallery (4)
  crako: string[]; // about/crako/         — gallery (4)
  offside: string[]; // about/offside/       — single image
  abaco: string[]; // about/abaco/         — gallery (4)
  jesusIsBack: string[]; // about/jesus-is-back/ — gallery
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
    // Sort by created_at ascending so upload order = display order
    resources.sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
    // Sort alphabetically by public_id so 01_, 02_, 03_ prefixes control order
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

// ─── All gallery images ───────────────────────────────────────────────────────

async function _getAllGalleryImages(): Promise<string[]> {
  try {
    const result = await cloudinary.search
      .expression(`asset_folder="gallery" AND resource_type=image`)
      .max_results(100)
      .execute();
    const resources: CloudinaryResource[] = result.resources;
    resources.sort((a, b) => a.public_id.localeCompare(b.public_id));
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
