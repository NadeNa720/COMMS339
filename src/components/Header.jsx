import { useEffect, useId, useRef, useState } from 'react';
import { ANCHORS, NAV_LINKS, SITE } from '../data/site';
import { useStore } from '../store/useStore';
import { trackEvent } from '../lib/analytics';
import Button from './ui/Button';
import Icon from './ui/Icon';
import Logo from './Logo';

const iconButton =
  'focus-ring-light inline-flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white sm:h-11 sm:w-11';

export default function Header() {
  const { count, openCart } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const searchInput = useRef(null);
  const menuId = useId();
  const searchId = useId();

  // Subtle border/shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close overlays with Escape.
  useEffect(() => {
    if (!menuOpen && !searchOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, searchOpen]);

  // Close mobile menu when the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)');
    const onChange = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  const toggleSearch = () => {
    setSearchOpen((v) => !v);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((v) => !v);
    setSearchOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    trackEvent('search', { search_term: query.trim() });
    setSearchOpen(false);
    setQuery('');
    // All products live in one section on this landing page.
    window.location.hash = ANCHORS.cameras;
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-ink-950/90 text-white backdrop-blur-md transition-shadow ${
        scrolled ? 'shadow-[0_1px_0_rgb(255_255_255/0.08),0_10px_30px_-20px_rgb(0_0_0/0.8)]' : ''
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="container-x flex h-16 items-center justify-between gap-3 sm:gap-4 lg:h-[72px]">
        {/* Wordmark */}
        <a
          href={ANCHORS.top}
          className="focus-ring-light -ml-1 flex min-w-0 items-center gap-2 rounded-lg px-1 sm:gap-2.5"
          aria-label={`${SITE.name} — home`}
        >
          <Logo className="h-6 w-6 shrink-0 text-brand-400 sm:h-7 sm:w-7" />
          <span className="truncate text-[10px] font-extrabold tracking-[0.08em] whitespace-nowrap min-[400px]:text-[11px] min-[400px]:tracking-[0.1em] sm:text-sm sm:tracking-[0.16em]">
            {SITE.wordmark}
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="focus-ring-light relative rounded-full px-4 py-2 text-[15px] font-medium text-white/80 transition hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="-mr-1.5 flex shrink-0 items-center gap-0.5 sm:mr-0 sm:gap-1">
          <button
            type="button"
            className={iconButton}
            onClick={toggleSearch}
            aria-label={searchOpen ? 'Close search' : 'Search'}
            aria-expanded={searchOpen}
            aria-controls={searchId}
          >
            <Icon name={searchOpen ? 'close' : 'search'} className="h-[22px] w-[22px]" />
          </button>

          <button
            type="button"
            className={`${iconButton} relative`}
            onClick={() => {
              trackEvent('view_cart', { source: 'header' });
              openCart();
            }}
            aria-label={`Shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <Icon name="bag" className="h-[22px] w-[22px]" />
            {count > 0 ? (
              <span
                className="absolute top-1 right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold tabular-nums"
                aria-hidden="true"
              >
                {count}
              </span>
            ) : null}
          </button>

          <div className="ml-2 hidden lg:block">
            <Button href={ANCHORS.gopro} size="sm" track={{ name: 'select_item', params: { source: 'header' } }}>
              Shop GoPro
            </Button>
          </div>

          <button
            type="button"
            className={`${iconButton} lg:hidden`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={menuId}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div
        id={searchId}
        hidden={!searchOpen}
        className="border-t border-white/10 bg-ink-950/95"
      >
        <form onSubmit={handleSearch} role="search" className="container-x flex items-center gap-3 py-3">
          <label htmlFor={`${searchId}-input`} className="sr-only">
            Search cameras and accessories
          </label>
          <div className="relative flex-1">
            <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/50" />
            <input
              ref={searchInput}
              id={`${searchId}-input`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search GoPro, mounts, batteries…"
              autoComplete="off"
              className="focus-ring-light h-12 w-full rounded-full bg-white/10 pr-4 pl-12 text-base text-white placeholder:text-white/45"
            />
          </div>
          <Button type="submit" size="md" className="shrink-0">
            Search
          </Button>
        </form>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        hidden={!menuOpen}
        className="border-t border-white/10 bg-ink-950 lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x py-4">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="focus-ring-light flex items-center justify-between rounded-xl px-3 py-4 text-lg font-semibold text-white transition hover:bg-white/8"
                >
                  {link.label}
                  <Icon name="arrowRight" className="h-5 w-5 text-white/40" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-5 pb-2">
            <Button
              href={ANCHORS.gopro}
              size="lg"
              className="w-full"
              onClick={() => setMenuOpen(false)}
              track={{ name: 'select_item', params: { source: 'mobile_menu' } }}
            >
              Shop GoPro
            </Button>
            <p className="text-center text-sm text-white/60">
              {SITE.trustLine.join(' · ')}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
