import { RATING, TESTIMONIALS } from '../data/content';
import { useStore } from '../store/useStore';
import Icon from './ui/Icon';
import SectionHeading from './ui/SectionHeading';
import SmartImage from './ui/SmartImage';
import Stars from './ui/Stars';

/**
 * Social proof.
 * PLACEHOLDER CONTENT: quotes, names and the rating come from src/data/content.js
 * and are fictional samples for an academic design concept, not verified reviews.
 */
export default function Testimonials() {
  const { openVideo } = useStore();

  return (
    <section id="stories" className="section-y bg-white" aria-labelledby="stories-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="stories-title"
            eyebrow="Sample customer stories"
            title="Made for moments like these."
          />
          <div className="flex items-center gap-3 rounded-2xl bg-mist-50 px-4 py-3 ring-1 ring-mist-200 lg:mb-1">
            <Stars value={RATING.value} outOf={RATING.outOf} className="h-5 w-5" />
            <p className="text-lg font-bold tabular-nums">
              {RATING.value}/{RATING.outOf}
            </p>
            {RATING.placeholder ? <p className="text-xs text-mist-500">Sample rating</p> : null}
          </div>
        </div>

        {/* Mobile: swipeable snap carousel (one tall card per swipe); tablet+: 3-up grid. */}
        <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-14 lg:gap-6">
          {TESTIMONIALS.map((t) => (
            <li key={t.id} className="w-[72vw] shrink-0 snap-center sm:w-auto">
              <figure className="group relative aspect-[3/4] overflow-hidden rounded-card bg-ink-900 text-white shadow-card transition duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover">
                <SmartImage
                  {...t.image}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 640px) 33vw, 72vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-ink-950/10"
                  aria-hidden="true"
                />

                {/* Video-thumbnail affordance */}
                <button
                  type="button"
                  onClick={() => openVideo(`story_${t.id}`)}
                  className="focus-ring-light absolute inset-0 flex items-center justify-center"
                  aria-label={`Play sample story from ${t.name}`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-brand-500 group-hover:ring-brand-500">
                    <Icon name="play" className="ml-1 h-7 w-7" />
                  </span>
                </button>

                <span className="pointer-events-none absolute top-4 left-4 rounded-md bg-ink-950/60 px-2 py-1 text-[11px] font-semibold tracking-wider uppercase backdrop-blur">
                  0:{String(12 + TESTIMONIALS.indexOf(t) * 7).padStart(2, '0')}
                </span>

                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <Stars value={5} className="h-3.5 w-3.5" />
                  <blockquote className="mt-2 text-base leading-snug font-semibold text-balance sm:text-xl">
                    “{t.quote}”
                  </blockquote>
                  <p className="mt-2 text-sm text-white/75">
                    <span className="font-semibold text-white">{t.name}</span>
                    <span aria-hidden="true"> · </span>
                    {t.activity}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-mist-400">
          Sample stories and ratings shown for illustration only.
        </p>
      </div>
    </section>
  );
}
