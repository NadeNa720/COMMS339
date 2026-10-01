import { getProduct } from '../data/products';
import { formatPrice } from '../lib/format';
import { useStore } from '../store/useStore';
import Button from './ui/Button';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import SmartImage from './ui/SmartImage';
import TrustLine from './ui/TrustLine';

/** "View product" — compact product detail dialog with add-to-bag. */
export default function QuickViewModal() {
  const { quickViewId, closeQuickView, addToCart } = useStore();
  const product = quickViewId ? getProduct(quickViewId) : null;

  return (
    <Modal
      open={Boolean(product)}
      onClose={closeQuickView}
      title={product ? `${product.name} details` : 'Product details'}
      panelClassName="max-w-3xl mx-auto overflow-hidden rounded-t-3xl bg-white text-ink-950 shadow-card-hover sm:rounded-3xl"
    >
      {product ? (
        <div className="grid min-h-0 overflow-y-auto overscroll-contain sm:grid-cols-2 sm:overflow-visible">
          <div className={`${product.featured ? 'bg-ink-950' : 'bg-mist-100'}`}>
            <SmartImage
              {...product.image}
              tone={product.featured ? 'dark' : 'light'}
              className="aspect-[16/10] h-full w-full object-cover sm:aspect-square"
              sizes="(min-width: 640px) 384px, 100vw"
            />
          </div>
          <div className="flex flex-col p-5 sm:p-8">
            <p className="eyebrow text-brand-600">{product.category}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">{product.name}</h2>
            <p className="mt-1 text-2xl font-bold tabular-nums">{formatPrice(product.price)}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-mist-500">{product.description}</p>

            <ul className="mt-5 flex flex-col gap-2 text-sm text-ink-900">
              {product.specs.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-brand-600" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  addToCart(product.id, { source: 'quick_view' });
                  closeQuickView();
                }}
              >
                Add to bag · {formatPrice(product.price)}
              </Button>
              <TrustLine tone="light" className="mt-3 text-center" />
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
