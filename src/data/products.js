import { IMAGES } from './images';

/**
 * ============================================================================
 *  PLACEHOLDER PRICING — REPLACE BEFORE ANY REAL COMMERCIAL USE
 * ----------------------------------------------------------------------------
 *  All `price` values below are ILLUSTRATIVE placeholders for an academic
 *  landing-page-optimization (LPO) design concept. They are not real offers.
 *  Prices are stored as whole euros; change `currency` / `locale` in
 *  `formatPrice` (src/lib/format.js) if you switch markets.
 * ============================================================================
 */
export const CURRENCY = 'EUR';

export const PRODUCTS = [
  {
    id: 'gopro-action-camera',
    name: 'GoPro Action Camera',
    price: 349, // PLACEHOLDER
    shortDescription: 'Smooth 4K video, rugged waterproof body and best-in-class stabilization.',
    description:
      'The camera that started it all. Shoot smooth 4K video, dive in without a housing and mount it anywhere. Ships with a mounting buckle, thumb screw and a rechargeable battery.',
    specs: ['4K video', 'Waterproof out of the box', 'HyperSmooth-style stabilization', 'Voice control'],
    image: IMAGES.products.gopro,
    /** The hero product: rendered with extra visual emphasis in the grid. */
    featured: true,
    badge: 'Best seller',
    cta: 'Shop GoPro',
    category: 'cameras',
  },
  {
    id: 'adventure-mount-kit',
    name: 'Adventure Mount Kit',
    price: 39, // PLACEHOLDER
    shortDescription: 'Helmet, handlebar, chest and flat mounts in one kit.',
    description:
      'Everything you need to mount your camera on a helmet, bike, board or chest harness. Includes adhesive mounts, a handlebar clamp, an extension arm and spare thumb screws.',
    specs: ['6 mounts + hardware', 'Fits all GoPro models', 'Weather-resistant adhesives'],
    image: IMAGES.products.mountKit,
    featured: false,
    cta: 'View product',
    category: 'accessories',
  },
  {
    id: 'spare-battery',
    price: 29, // PLACEHOLDER
    name: 'Spare Battery',
    shortDescription: 'Keep shooting through long days on the trail.',
    description:
      'A rechargeable spare battery so a full day of adventure never ends early. Charges in-camera or with any compatible dual charger.',
    specs: ['Cold-weather optimised', 'Up to 2 hours of recording', 'Charges in-camera'],
    image: IMAGES.products.battery,
    featured: false,
    cta: 'View product',
    category: 'accessories',
  },
  {
    id: 'protective-case',
    name: 'Protective Case',
    price: 25, // PLACEHOLDER
    shortDescription: 'Semi-hard shell with custom foam. Clip it to any bag.',
    description:
      'A compact, semi-hard travel case with a custom-cut foam interior for your camera, two batteries and a spare mount. Carabiner included.',
    specs: ['Crush-resistant EVA shell', 'Fits camera + 2 batteries', 'Carabiner clip'],
    image: IMAGES.products.case,
    featured: false,
    cta: 'View product',
    category: 'accessories',
  },
];

export const FEATURED_PRODUCT = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
