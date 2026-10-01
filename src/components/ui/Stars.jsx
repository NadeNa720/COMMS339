import Icon from './Icon';

/** Five-star rating display. Screen readers get a single sentence instead of five icons. */
export default function Stars({ value = 5, outOf = 5, className = 'h-4 w-4', label }) {
  const stars = Array.from({ length: outOf }, (_, i) => i < Math.round(value));
  return (
    <span
      className="inline-flex items-center gap-0.5 text-star"
      role="img"
      aria-label={label ?? `Rated ${value} out of ${outOf} stars`}
    >
      {stars.map((filled, i) => (
        <Icon key={i} name="star" className={`${className} ${filled ? '' : 'opacity-30'}`} />
      ))}
    </span>
  );
}
