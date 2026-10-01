import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { getProduct } from '../data/products';
import { trackEvent } from '../lib/analytics';
import { StoreContext } from './store-context';

/**
 * Lightweight app store: shopping bag, quick-view, demo video and toast state.
 * No backend — this is a landing-page concept, so "checkout" is a demo action.
 * Consume it with `useStore()` from ./useStore.
 */

const CART_KEY = 'kcc-bag-v1';

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.find((i) => i.id === action.id);
      if (existing) {
        return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + action.qty } : i));
      }
      return [...state, { id: action.id, qty: action.qty }];
    }
    case 'setQty':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

function loadCart() {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((i) => getProduct(i.id)) : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  // Persist bag between visits.
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode) — ignore */
    }
  }, [items]);

  const showToast = useCallback((message, action) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, action });
    toastTimer.current = window.setTimeout(() => setToast(null), 3600);
  }, []);

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addToCart = useCallback(
    (id, { qty = 1, source = 'unknown' } = {}) => {
      const product = getProduct(id);
      if (!product) return;
      dispatch({ type: 'add', id, qty });
      trackEvent('add_to_cart', { item_id: id, item_name: product.name, value: product.price * qty, source });
      showToast(`${product.name} added to your bag`, { label: 'View bag', onClick: openCart });
    },
    [showToast, openCart],
  );

  const openQuickView = useCallback((id, source = 'grid') => {
    const product = getProduct(id);
    if (!product) return;
    trackEvent('view_item', { item_id: id, item_name: product.name, source });
    setQuickViewId(id);
  }, []);

  const openVideo = useCallback((source = 'hero') => {
    trackEvent('video_start', { source });
    setVideoOpen(true);
  }, []);

  const value = useMemo(() => {
    const lines = items
      .map((i) => ({ ...i, product: getProduct(i.id) }))
      .filter((l) => l.product);
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0);

    return {
      // cart
      lines,
      count,
      subtotal,
      addToCart,
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      removeFromCart: (id) => dispatch({ type: 'remove', id }),
      clearCart: () => dispatch({ type: 'clear' }),
      cartOpen,
      openCart,
      closeCart,
      // quick view
      quickViewId,
      openQuickView,
      closeQuickView: () => setQuickViewId(null),
      // demo video
      videoOpen,
      openVideo,
      closeVideo: () => setVideoOpen(false),
      // toast
      toast,
      showToast,
      dismissToast,
    };
  }, [items, cartOpen, quickViewId, videoOpen, toast, addToCart, openCart, closeCart, openQuickView, openVideo, showToast, dismissToast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
