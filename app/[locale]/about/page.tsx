import StormBackground from '@/components/project/StormBackground';
import AboutContent from '@/components/about/AboutContent';
import Contact from '@/components/contact';

export default function AboutPage() {
  return (
    <>
      <StormBackground />
      <main className="relative z-10">
        <AboutContent />
        <Contact />
      </main>
    </>
  );
}
