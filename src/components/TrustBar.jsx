import { TRUST_ITEMS } from '../data/content';
import Icon from './ui/Icon';
import Stars from './ui/Stars';

/**
 * Horizontal trust strip directly under the hero.
 * Desktop: evenly spaced row. Mobile: compact two-row wrap so all five signals
 * are visible at once without horizontal scrolling.
 */
export default function TrustBar() {
  return (
    <section aria-label="Why shop with us" className="border-b border-mist-200 bg-white">
      <ul className="container-x flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 py-3.5 sm:gap-x-8 sm:py-4 lg:justify-between lg:gap-6 lg:py-5">
        {TRUST_ITEMS.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap text-ink-900 sm:gap-2.5 sm:text-sm"
          >
            {item.icon === 'stars' ? (
              <Stars value={item.rating} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist-100 text-ink-900 sm:h-9 sm:w-9">
                <Icon name={item.icon} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </span>
            )}
            <span>
              {item.label}
              {item.placeholder ? <span className="sr-only"> (sample)</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
