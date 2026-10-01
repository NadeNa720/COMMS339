import { BENEFITS } from '../data/content';
import SectionHeading from './ui/SectionHeading';
import SmartImage from './ui/SmartImage';

/** Product benefits — four tall image cards on a white section. */
export default function FeatureCards() {
  return (
    <section id="benefits" className="section-y bg-white" aria-labelledby="benefits-title">
      <div className="container-x">
        <SectionHeading
          id="benefits-title"
          eyebrow="Built for the moment"
          title="Big adventures. Small camera."
        />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {BENEFITS.map((b) => (
            <li key={b.id}>
              <article className="group relative aspect-[3/4] overflow-hidden rounded-card bg-ink-900 shadow-card transition duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover">
                <SmartImage
                  {...b.image}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 300px, 50vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                  <h3 className="text-base font-bold tracking-tight sm:text-xl">{b.title}</h3>
                  <p className="mt-1 text-sm text-white/80 sm:text-[15px]">{b.tagline}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
