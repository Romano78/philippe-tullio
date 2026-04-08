import StormBackground from '@/components/project/StormBackground';
import SoProductionContent from '@/components/so-production/SoProductionContent';
import Contact from '@/components/contact';
import { ScrollProgressButton } from '@/components/scroll-progress-button';

export default async function SoProductionPage() {
  // image placeholder — will be fetched from Cloudinary when asset is uploaded
  const image = null;

  return (
    <>
      <StormBackground />
      <ScrollProgressButton position='center' />
      <main className='relative z-10'>
        <SoProductionContent image={image} />
        <Contact />
      </main>
    </>
  );
}
