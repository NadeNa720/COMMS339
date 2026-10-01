import { ANCHORS } from '../data/site';
import { formatPrice } from '../lib/format';
import { trackEvent } from '../lib/analytics';
import { useStore } from '../store/useStore';
import Button from './ui/Button';
import Icon from './ui/Icon';
import Modal from './ui/Modal';
import SmartImage from './ui/SmartImage';
import TrustLine from './ui/TrustLine';

/**
 * Shopping bag drawer. Checkout is a demo action — this concept site does not
 * process orders. Wire `handleCheckout` to your commerce backend when ready.
 */
export default function CartDrawer() {
  const { cartOpen, closeCart, lines, count, subtotal, setQty, removeFromCart, showToast } = useStore();

  const handleCheckout = () => {
    trackEvent('begin_checkout', { value: subtotal, items: count });
    showToast('Demo checkout — this concept site does not process orders.');
    closeCart();
  };

  return (
    <Modal open={cartOpen} onClose={closeCart} title="Shopping bag" layout="drawer" panelClassName="h-full bg-white text-ink-950 shadow-card-hover">
      <div className="flex h-full flex-col">
        <header className="border-b border-mist-200 px-6 py-5">
          <h2 className="text-lg font-bold">
            Your bag <span className="text-mist-500">({count})</span>
          </h2>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mist-100 text-ink-900">
              <Icon name="bag" className="h-7 w-7" />
            </span>
            <p className="text-lg font-semibold">Your bag is empty</p>
            <p className="max-w-xs text-sm text-mist-500">Start with the GoPro action camera, then add mounts and spares.</p>
            <Button href={ANCHORS.gopro} onClick={closeCart} track={{ name: 'select_item', params: { source: 'empty_bag' } }}>
              Shop GoPro
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-mist-200 overflow-y-auto overscroll-contain px-5 sm:px-6">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <SmartImage
                    {...product.image}
                    tone={product.featured ? 'dark' : 'light'}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    sizes="80px"
                    width={80}
                    height={80}
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold">{product.name}</p>
                      <p className="shrink-0 font-semibold tabular-nums">{formatPrice(product.price * qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-full ring-1 ring-mist-300" role="group" aria-label={`Quantity for ${product.name}`}>
                        <button
                          type="button"
                          className="focus-ring flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-mist-100"
                          onClick={() => setQty(product.id, qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Icon name="minus" className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          type="button"
                          className="focus-ring flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-mist-100"
                          onClick={() => setQty(product.id, qty + 1)}
                          aria-label="Increase quantity"
                        >
                          <Icon name="plus" className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-mist-500 transition hover:bg-mist-100 hover:text-ink-950"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                      >
                        <Icon name="trash" className="h-[18px] w-[18px]" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-mist-200 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-mist-500">Subtotal</span>
                <span className="text-xl font-bold tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-mist-400">Shipping calculated at checkout. Prices are illustrative.</p>
              <Button size="lg" className="mt-4 w-full" onClick={handleCheckout}>
                Checkout
                <Icon name="arrowRight" className="h-5 w-5" />
              </Button>
              <TrustLine tone="light" className="mt-3 text-center" />
            </footer>
          </>
        )}
      </div>
    </Modal>
  );
}
