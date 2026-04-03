import HomeSwiper from "@/components/home-swiper";
import { getWorkAssets } from "@/lib/cloudinary";
import { projects as projectsMeta } from "@/components/home-swiper/data";

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
      }
      : {}),
  }));


  return (
    <>
      {/* Scope scroll-snap to home page only */}
      <style>{`html { scroll-snap-type: y mandatory; }`}</style>
      <main>
        <HomeSwiper projects={projects} />
      </main>
    </>
  );
}
