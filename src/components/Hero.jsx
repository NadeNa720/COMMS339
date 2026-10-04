import { ANCHORS, SITE } from '../data/site';
import { IMAGES } from '../data/images';
import { FEATURED_PRODUCT } from '../data/products';
import { formatPrice } from '../lib/format';
import { useStore } from '../store/useStore';
import Button from './ui/Button';
import Icon from './ui/Icon';
import SmartImage from './ui/SmartImage';
import TrustLine from './ui/TrustLine';

export default function Hero() {
  const { openVideo } = useStore();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-ink-950 text-white lg:min-h-[min(860px,calc(100svh-72px))] lg:items-center"
      aria-labelledby="hero-title"
    >
      {/* Cinematic background */}
      <SmartImage
        {...IMAGES.hero}
        priority
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center] lg:object-center"
        sizes="100vw"
      />
      {/* Readability overlay: strong on the left, fading out to the right */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/10 lg:from-ink-950/90 lg:via-ink-950/45 lg:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent lg:h-1/2"
        aria-hidden="true"
      />

      <div className="container-x relative grid w-full gap-10 pt-24 pb-10 sm:pb-14 lg:grid-cols-12 lg:items-center lg:py-24">
        {/* Copy */}
        <div className="max-w-xl lg:col-span-7">
          <p className="eyebrow text-brand-300">{SITE.category.toUpperCase()}</p>
          <h1
            id="hero-title"
            className="text-shadow-soft mt-4 text-[2.75rem] leading-[1.02] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Capture Every Adventure.
          </h1>
          <p className="text-shadow-soft mt-5 max-w-md text-lg leading-relaxed text-white/85 sm:max-w-lg sm:text-xl">
            Smooth 5.3K video. Rugged, waterproof design.
            <br className="hidden sm:block" /> A GoPro that goes wherever you do.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={ANCHORS.gopro}
              size="lg"
              className="w-full sm:w-auto sm:min-w-44"
              track={{ name: 'select_item', params: { source: 'hero_primary' } }}
            >
              Shop GoPro
              <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
            <Button
              variant="glass"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => openVideo('hero')}
            >
              <Icon name="play" className="h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <TrustLine className="mt-5" />

          {/* Compact product chip — mobile/tablet only */}
          <a
            href={ANCHORS.gopro}
            className="focus-ring-light mt-8 flex items-center gap-4 rounded-2xl bg-white/10 p-3 pr-4 ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15 lg:hidden"
          >
            <SmartImage
              {...IMAGES.heroProduct}
              className="h-14 w-14 shrink-0 rounded-xl object-cover"
              sizes="56px"
              width={56}
              height={56}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{FEATURED_PRODUCT.name}</span>
              <span className="block text-sm text-white/70">From {formatPrice(FEATURED_PRODUCT.price)}</span>
            </span>
            <Icon name="arrowRight" className="h-5 w-5 shrink-0 text-white/70" />
          </a>
        </div>

        {/* Floating product card — desktop only */}
        <aside className="hidden lg:col-span-5 lg:block" aria-label="Featured product">
          <a
            href={ANCHORS.gopro}
            className="focus-ring-light group ml-auto block w-full max-w-sm rounded-3xl bg-white/8 p-3 ring-1 ring-white/15 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/12 hover:shadow-card-hover"
          >
            <div className="overflow-hidden rounded-2xl bg-ink-950">
              <SmartImage
                {...IMAGES.heroProduct}
                priority
                className="aspect-square w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                sizes="(min-width: 1024px) 384px, 0px"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-3 pt-4 pb-2">
              <div>
                <p className="text-xs font-semibold tracking-wider text-brand-300 uppercase">{FEATURED_PRODUCT.badge}</p>
                <p className="mt-0.5 text-lg font-bold">{FEATURED_PRODUCT.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/60">From</p>
                <p className="text-xl font-bold tabular-nums">{formatPrice(FEATURED_PRODUCT.price)}</p>
              </div>
            </div>
          </a>
        </aside>
      </div>
    </section>
  );
}
