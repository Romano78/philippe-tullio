import { getAboutAssets } from '@/lib/cloudinary';
import StormBackground from '@/components/project/StormBackground';
import AboutContent from '@/components/about/AboutContent';
import Contact from '@/components/contact';
import { ScrollProgressButton } from '@/components/scroll-progress-button';

export default async function AboutPage() {
  const assets = await getAboutAssets();

  return (
    <>
      <StormBackground />
      <ScrollProgressButton position='center' />
      <main className="relative z-10">
        <AboutContent assets={assets} />
        <Contact />
      </main>
    </>
  );
}
