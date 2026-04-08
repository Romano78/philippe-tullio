import { AnimateIn } from '@/components/about/AnimateIn';
import PillCta from '@/components/PillCta';

export default function CtaSection({ t, email, ctaHref }) {
  return (
    <section className='relative z-10 site-px py-16 md:py-24'>
      <div className='site-max flex flex-col md:flex-row md:items-center justify-between gap-8'>
        <AnimateIn>
          <a
            href={`mailto:${email}`}
            className='group inline-flex items-center gap-3 font-meta text-sm md:text-base tracking-wide text-white/60 hover:text-white transition-colors duration-300'
          >
            <span className='relative'>
              {email}
              <span className='absolute -bottom-px left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-500 ease-out' />
            </span>
          </a>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <PillCta href={ctaHref} icon='→'>
            {t('cta')}
          </PillCta>
        </AnimateIn>
      </div>
    </section>
  );
}
