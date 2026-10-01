import { USE_CASES } from '../data/content';
import Icon from './ui/Icon';
import SectionHeading from './ui/SectionHeading';
import SmartImage from './ui/SmartImage';

/**
 * Lifestyle section on a near-black background.
 * Desktop: four tall full-bleed cards. Mobile: swipeable, snap-aligned carousel
 * so each photo keeps its cinematic crop instead of being squeezed.
 */
export default function UseCases() {
  return (
    <section id="use-cases" className="section-y bg-ink-950 text-white" aria-labelledby="usecases-title">
      <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading id="usecases-title" title="Your life. Every angle." tone="dark" />
        <p className="max-w-xs text-sm text-mist-400 sm:text-right">
          One camera for the trail, the water, the city and everything between.
        </p>
      </div>

      <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:mx-auto lg:mt-14 lg:grid lg:max-w-7xl lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-10">
        {USE_CASES.map((u) => (
          <li key={u.id} className="w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:w-auto">
            <a
              href={u.href}
              aria-label={`${u.title}: ${u.caption} Shop GoPro`}
              className="focus-ring-light group relative block aspect-[3/4] overflow-hidden rounded-card bg-ink-800 ring-1 ring-white/10 transition duration-300 ease-out hover:-translate-y-1 hover:ring-white/25"
            >
              <SmartImage
                {...u.image}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 300px, 78vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{u.title}</h3>
                  <p className="mt-1 text-sm text-white/75">{u.caption}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/25 backdrop-blur transition group-hover:bg-brand-500 group-hover:ring-brand-500">
                  <Icon name="arrowRight" className="h-5 w-5" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
