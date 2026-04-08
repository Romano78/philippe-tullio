import { AnimateIn } from '@/components/about/AnimateIn';

export default function BioSection({ t }) {
  return (
    <section className='relative z-10 site-px py-16 md:py-20'>
      <div className='site-max'>
        <AnimateIn>
          <p className='font-sans text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl'>
            {t('bio')}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
