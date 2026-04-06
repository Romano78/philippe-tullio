import { getAllGalleryImages } from '@/lib/cloudinary';
import StormBackground from '@/components/project/StormBackground';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Contact from '@/components/contact';

export default async function GalleryPage() {
  const images = await getAllGalleryImages();

  return (
    <>
      <StormBackground />
      <main className="relative z-10">
        <GalleryGrid images={images} />
        <Contact />
      </main>
    </>
  );
}
