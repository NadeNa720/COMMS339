import { SITE } from '../../data/site';

/** "Secure checkout · Easy returns" — the reassurance line used under every main CTA. */
export default function TrustLine({ className = '', tone = 'dark' }) {
  const color = tone === 'dark' ? 'text-white/70' : 'text-mist-500';
  return (
    <p className={`text-sm font-medium ${color} ${className}`}>
      {SITE.trustLine.map((item, i) => (
        <span key={item}>
          {i > 0 ? <span aria-hidden="true" className="mx-2 opacity-60">·</span> : null}
          {item}
        </span>
      ))}
    </p>
  );
}
