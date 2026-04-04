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
    video?: string; // full video with controls
    videoPoster?: string;
    gallery: string[]; // stills — named 01_*, 02_*, 03_*
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
      projectVideoRes,
      projectGalleryImgRes,
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
        .expression(`asset_folder="${base}/work/video" AND resource_type=video`)
        .max_results(5)
        .execute(),
      cloudinary.search
        .expression(
          `asset_folder="${base}/work/gallery" AND resource_type=image`,
        )
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

    const projectVideos: CloudinaryResource[] =
      projectVideoRes.status === 'fulfilled'
        ? projectVideoRes.value.resources
        : [];

    const projectGalleryImages: CloudinaryResource[] =
      projectGalleryImgRes.status === 'fulfilled'
        ? projectGalleryImgRes.value.resources
        : [];

    const featuredThumb = featuredThumbImage[0];
    const featuredVideo = featuredVideos[0];
    const projectThumb = projectImages[0];
    const projectVideo = projectVideos[0];

    const projectGallery = projectGalleryImages
      .sort((a, b) => a.public_id.localeCompare(b.public_id));

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
        ...(projectVideo && {
          video: cldVideo(`${projectVideo.public_id}.${projectVideo.format}`),
          videoPoster: cldVideoPoster(projectVideo.public_id),
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
