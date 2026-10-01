import { useEffect } from 'react';
import { ANCHORS, FOOTER_LINKS, SITE, SOCIAL_LINKS, SUPPORT_ITEMS } from '../data/site';
import Icon from './ui/Icon';

export default function Footer() {
  // When a footer link targets a support accordion (#shipping, #returns, #faq), open it.
  useEffect(() => {
    const openTarget = () => {
      const id = window.location.hash.replace('#', '');
      const el = id ? document.getElementById(id) : null;
      if (el?.tagName === 'DETAILS') el.open = true;
    };
    openTarget();
    window.addEventListener('hashchange', openTarget);
    return () => window.removeEventListener('hashchange', openTarget);
  }, []);

  return (
    <footer id="support" className="scroll-mt-20 bg-ink-950 text-white">
      <div className="container-x grid gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        {/* Brand */}
        <div className="lg:col-span-4">
          <a href={ANCHORS.top} className="focus-ring-light inline-flex items-center rounded-lg">
            <span className="text-sm font-extrabold tracking-[0.16em]">{SITE.wordmark}</span>
          </a>
          <p className="mt-4 text-2xl font-bold tracking-tight text-white/90">{SITE.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist-400">
            GoPro action cameras and adventure accessories, with secure checkout and easy returns.
          </p>

          <ul className="mt-6 flex items-center gap-2" aria-label="Social media">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${SITE.name} on ${s.label}`}
                  className="focus-ring-light flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white/80 transition hover:bg-brand-500 hover:text-white"
                >
                  <Icon name={s.id} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="eyebrow text-mist-400">Help</h2>
          {/* Phones: links as a wrapped row of chips (≥44px tap targets); desktop: vertical list */}
          <ul className="mt-3 flex flex-wrap gap-2 lg:mt-4 lg:flex-col lg:gap-3">
            {FOOTER_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="focus-ring-light inline-flex min-h-11 items-center rounded-full bg-white/8 px-4 text-[15px] font-medium text-white/85 transition hover:bg-white/12 hover:text-white lg:min-h-0 lg:rounded lg:bg-transparent lg:px-0 lg:hover:bg-transparent lg:hover:text-brand-300"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Support accordions */}
        <div className="lg:col-span-5">
          <h2 className="eyebrow text-mist-400">Support</h2>
          <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {SUPPORT_ITEMS.map((item) => (
              <li key={item.id}>
                <details id={item.id} className="group scroll-mt-24">
                  <summary className="focus-ring-light flex cursor-pointer items-center justify-between gap-4 rounded py-4 text-[15px] font-semibold text-white/90 transition hover:text-white">
                    {item.title}
                    <Icon
                      name="chevronDown"
                      className="h-5 w-5 shrink-0 text-white/50 transition duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-mist-400">{item.body}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-mist-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.year} {SITE.name}</p>
          <p className="max-w-md sm:text-right">{SITE.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
