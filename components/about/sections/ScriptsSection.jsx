import { Img } from '../primitives';

export default function ScriptsSection({ scarface, offside, t }) {
  return (
    <section className="site-px pb-24 md:pb-32 relative z-10">
      <div className="site-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 items-start">
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">{t('labelScript')}</p>
              <h3 className="font-display text-3xl md:text-4xl uppercase text-white leading-none mb-4">{t('scarfaceTitle')}</h3>
              <p className="font-sans text-base text-white/60 leading-relaxed">{t('scarfaceDesc')}</p>
            </div>
            <Img src={scarface[0]} alt="The Scarface Generation" ratio="3 / 4" />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-meta text-xs tracking-widest uppercase text-white/30 mb-4">{t('labelSeries')}</p>
              <h3 className="font-display text-3xl md:text-4xl uppercase text-white leading-none mb-4">{t('covidTitle')}</h3>
              <p className="font-sans text-base text-white/60 leading-relaxed">{t('covidDesc')}</p>
            </div>
            <Img src={offside[0]} alt="HORS-JEU" ratio="3 / 4" />
          </div>
        </div>
      </div>
    </section>
  );
}
