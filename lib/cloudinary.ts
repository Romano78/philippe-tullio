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
    videoMobile?: string;
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

// ─── Helpers ─────────────────────────────────────────────────────────────

const toPath = (r: CloudinaryResource) => `${r.public_id}.${r.format}`;

function search(expression: string, max = 1) {
  return cloudinary.search.expression(expression).max_results(max).execute();
}

function getResources(res: PromiseSettledResult<any>): CloudinaryResource[] {
  return res.status === 'fulfilled' ? res.value.resources : [];
}

// ─── Work assets ─────────────────────────────────────────────────────────

async function _getWorkAssets(slug: string): Promise<WorkAssets | null> {
  if (process.env.NODE_ENV === 'development') return null;
  try {
    const base = `work/${slug}`;

    const [
      featuredThumbRes,
      featuredVideoRes,
      featuredMobileVideoRes,
      projectThumbRes,
      projectPreviewVidRes,
      projectVideoRes,
      projectGalleryImgRes,
      projectHeroRes,
    ] = await Promise.allSettled([
      search(`asset_folder="${base}/featured/thumb" AND resource_type=image`),
      search(`asset_folder="${base}/featured/video" AND resource_type=video`),
      search(`asset_folder="${base}/featured/mobile-video" AND resource_type=video`),
      search(`asset_folder="${base}/work/thumb" AND resource_type=image`),
      search(`asset_folder="${base}/work/previewvid" AND resource_type=video`),
      search(`asset_folder="${base}/work/video" AND resource_type=video`),
      search(`asset_folder="${base}/work/gallery" AND resource_type=image`, 50),
      search(`asset_folder="${base}/work/hero" AND resource_type=image`),
    ]);

    const featuredThumb = getResources(featuredThumbRes)[0];
    const featuredVideo = getResources(featuredVideoRes)[0];
    const featuredMobileVideo = getResources(featuredMobileVideoRes)[0];
    const projectThumb = getResources(projectThumbRes)[0];
    const projectPreviewVid = getResources(projectPreviewVidRes)[0];
    const projectVideo = getResources(projectVideoRes)[0];
    const projectHero = getResources(projectHeroRes)[0];
    const projectGallery = getResources(projectGalleryImgRes).sort((a, b) =>
      a.public_id.localeCompare(b.public_id),
    );

    if (!featuredThumb) return null;

    return {
      featured: {
        thumb: cldImage(toPath(featuredThumb)),
        ...(featuredVideo && {
          video: cldVideo(toPath(featuredVideo)),
          videoPoster: cldVideoPoster(featuredVideo.public_id),
        }),
        ...(featuredMobileVideo && {
          videoMobile: cldVideo(toPath(featuredMobileVideo)),
        }),
      },
      work: {
        thumb: projectThumb
          ? cldImage(toPath(projectThumb))
          : cldVideoPoster(featuredThumb.public_id),
        ...(projectPreviewVid && {
          previewVid: cldVideo(toPath(projectPreviewVid)),
          previewVidPoster: cldVideoPoster(projectPreviewVid.public_id),
        }),
        ...(projectVideo && {
          video: cldVideo(toPath(projectVideo)),
          videoPoster: cldVideoPoster(projectVideo.public_id),
        }),
        hero: projectHero
          ? cldImage(toPath(projectHero))
          : cldImage(toPath(featuredThumb)),
        gallery: projectGallery.map((img) => cldImage(toPath(img))),
      },
    };
  } catch (err) {
    console.error(`[cloudinary] getWorkAssets(${slug}) failed:`, err);
    return null;
  }
}

export const getWorkAssets = unstable_cache(
  _getWorkAssets,
  ['cloudinary-work-assets'],
  { revalidate: 3600 },
);

// ─── About page assets ───────────────────────────────────────────────────

export interface AboutImageAssets {
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

export interface AboutAssets extends AboutImageAssets {
  showreel: string | null;
  showreelPoster: string | null;
  showreelPreview: string | null;
}

const ABOUT_FOLDERS: Array<[keyof AboutImageAssets, string]> = [
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

const EMPTY_ABOUT_ASSETS: AboutAssets = {
  portrait: [], acting: [], lfaHero: [], lfaLogo: [], kcitizen: [],
  scarface: [], jaya: [], crako: [], offside: [], abaco: [], jesusIsBack: [],
  showreel: null, showreelPoster: null, showreelPreview: null,
};

async function _getAboutAssets(): Promise<AboutAssets> {
  if (process.env.NODE_ENV === 'development') return EMPTY_ABOUT_ASSETS;
  try {
    const [
      imageResults,
      showreelVideoResult,
      showreelPosterResult,
      showreelPreviewResult,
    ] = await Promise.all([
      Promise.allSettled(
        ABOUT_FOLDERS.map(([, folder]) =>
          search(`asset_folder="${folder}" AND resource_type=image`, 20),
        ),
      ),
      search(`asset_folder="about/showreel/video" AND resource_type=video`).catch(() => null),
      search(`asset_folder="about/showreel/thumb" AND resource_type=image`).catch(() => null),
      search(`asset_folder="about/showreel/previewvid" AND resource_type=video`).catch(() => null),
    ]);

    const imageAssets = ABOUT_FOLDERS.reduce<AboutImageAssets>((acc, [key], i) => {
      const result = imageResults[i];
      if (result.status !== 'fulfilled') { acc[key] = []; return acc; }
      const resources: CloudinaryResource[] = result.value.resources;
      acc[key] = resources
        .sort((a, b) => a.public_id.localeCompare(b.public_id))
        .map((r) => cldImage(toPath(r)));
      return acc;
    }, { ...EMPTY_ABOUT_ASSETS });

    const showreelVideo = showreelVideoResult?.resources?.[0];
    const showreelPoster = showreelPosterResult?.resources?.[0];
    const showreelPreview = showreelPreviewResult?.resources?.[0];

    return {
      ...imageAssets,
      showreel: showreelVideo ? cldVideo(toPath(showreelVideo)) : null,
      showreelPoster: showreelPoster ? cldImage(toPath(showreelPoster)) : null,
      showreelPreview: showreelPreview ? cldVideo(toPath(showreelPreview)) : null,
    };
  } catch (err) {
    console.error('[cloudinary] getAboutAssets failed:', err);
    return EMPTY_ABOUT_ASSETS;
  }
}

export const getAboutAssets = unstable_cache(
  _getAboutAssets,
  ['about-assets'],
  { revalidate: 3600 },
);

// ─── All gallery images ────────────────────────────────────────────────

async function _getAllGalleryImages(): Promise<string[]> {
  if (process.env.NODE_ENV === 'development') return [];
  try {
    const result = await search(`asset_folder="gallery" AND resource_type=image`, 100);
    const resources: CloudinaryResource[] = result.resources;
    return resources.map((r) => cldImage(toPath(r)));
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
