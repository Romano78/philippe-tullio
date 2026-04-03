import HomeSwiper from "@/components/home-swiper";

export default function Home() {
  return (
    <>
      {/* Scope scroll-snap to home page only */}
      <style>{`html { scroll-snap-type: y mandatory; }`}</style>
      <main>
        <HomeSwiper />
      </main>
    </>
  );
}
