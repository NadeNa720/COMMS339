import { PRODUCTS } from '../data/products';
import { SITE } from '../data/site';
import { formatPrice } from '../lib/format';
import { useStore } from '../store/useStore';
import Button from './ui/Button';
import Icon from './ui/Icon';
import SectionHeading from './ui/SectionHeading';
import SmartImage from './ui/SmartImage';

/**
 * E-commerce grid: the GoPro card is the hero product and receives extra emphasis
 * (dark tile, badge, primary CTA); accessories use quiet light tiles.
 */
export default function ProductGrid() {
  const { addToCart, openQuickView } = useStore();
  const firstAccessoryId = PRODUCTS.find((p) => !p.featured)?.id;

  return (
    <section id="cameras" className="section-y scroll-mt-20 bg-mist-50" aria-labelledby="shop-title">
      <div className="container-x">
        <SectionHeading
          id="shop-title"
          title="Gear up for your next adventure."
          lead="Start with GoPro. Make it yours."
        />

        {/* Mobile: hero product full-width, accessories as a compact 2-up grid → half the scroll depth. */}
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {PRODUCTS.map((p) => (
            <li
              key={p.id}
              id={p.featured ? 'gopro' : p.id === firstAccessoryId ? 'accessories' : undefined}
              className={`scroll-mt-24 ${p.featured ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <ProductCard
                product={p}
                onPrimary={() =>
                  p.featured ? addToCart(p.id, { source: 'grid' }) : openQuickView(p.id, 'grid')
                }
              />
            </li>
          ))}
        </ul>

        {/* Reassurance row */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-mist-500 lg:mt-10">
          {SITE.trustLine.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-600 ring-1 ring-mist-200">
                <Icon name={i === 0 ? 'shield' : 'returns'} className="h-3.5 w-3.5" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductCard({ product, onPrimary }) {
  const { featured } = product;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-card transition duration-300 ease-out hover:-translate-y-1 ${
        featured
          ? 'bg-ink-950 text-white shadow-card-hover ring-1 ring-ink-800'
          : 'bg-white text-ink-950 shadow-card ring-1 ring-mist-200 hover:shadow-card-hover'
      }`}
    >
      {product.badge ? (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
          {product.badge}
        </span>
      ) : null}

      <button
        type="button"
        onClick={onPrimary}
        className={`focus-ring block w-full overflow-hidden ${featured ? 'bg-ink-950' : 'bg-mist-100'}`}
        aria-label={`${featured ? 'Add' : 'View'} ${product.name}`}
        tabIndex={-1}
      >
        <SmartImage
          {...product.image}
          tone={featured ? 'dark' : 'light'}
          className={`w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04] ${
            featured ? 'aspect-[4/3] sm:aspect-square' : 'aspect-square'
          }`}
          sizes={
            featured
              ? '(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw'
              : '(min-width: 1024px) 300px, 50vw'
          }
        />
      </button>

      <div className={`flex flex-1 flex-col ${featured ? 'p-5' : 'p-3.5 sm:p-5'}`}>
        <div
          className={`flex gap-1 ${
            featured ? 'items-start justify-between gap-3' : 'flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-3'
          }`}
        >
          <h3 className={`font-bold tracking-tight ${featured ? 'text-xl' : 'text-[15px] leading-snug sm:text-lg'}`}>
            {product.name}
          </h3>
          <p
            className={`shrink-0 font-bold tabular-nums ${
              featured ? 'text-lg text-white' : 'text-base text-ink-950 sm:text-lg'
            }`}
            aria-label={`Price ${formatPrice(product.price)}`}
          >
            {formatPrice(product.price)}
          </p>
        </div>
        <p
          className={`mt-1.5 leading-relaxed ${
            featured ? 'text-sm text-white/70' : 'hidden text-sm text-mist-500 sm:block'
          }`}
        >
          {product.shortDescription}
        </p>

        <div className={`mt-auto ${featured ? 'pt-5' : 'pt-3.5 sm:pt-5'}`}>
          <Button
            variant={featured ? 'primary' : 'outline'}
            size={featured ? 'md' : 'sm'}
            className={`w-full ${featured ? '' : 'sm:h-12 sm:px-6 sm:text-[15px]'}`}
            onClick={onPrimary}
            track={{ name: 'select_item', params: { item_id: product.id, source: 'product_card' } }}
          >
            {product.cta}
            {featured ? <Icon name="arrowRight" className="h-4 w-4" /> : null}
          </Button>
        </div>
      </div>
    </article>
  );
}
