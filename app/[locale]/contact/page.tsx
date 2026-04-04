import StormBackground from '@/components/project/StormBackground';
import Contact from '@/components/contact';

export default function ContactPage() {
  return (
    <>
      <StormBackground />
      <main className="relative z-10 min-h-screen flex flex-col justify-end">
        <Contact />
      </main>
    </>
  );
}
