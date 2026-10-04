import { IMAGES } from './images';
import { ANCHORS } from './site';

/* --------------------------------------------------------------------------
 * Trust bar (directly under the hero)
 * NOTE: "Authorized retailer" and the customer rating are ILLUSTRATIVE
 * placeholders for an academic design concept — verify before real use.
 * ------------------------------------------------------------------------ */
export const TRUST_ITEMS = [
  { id: 'secure', icon: 'shield', label: 'Secure checkout' },
  { id: 'shipping', icon: 'truck', label: 'Fast shipping' },
  { id: 'returns', icon: 'returns', label: 'Easy returns' },
  { id: 'authorized', icon: 'badge', label: 'Authorized retailer', placeholder: true },
  { id: 'rating', icon: 'stars', label: '4.8/5 customer rating', rating: 4.8, placeholder: true },
];

/* --------------------------------------------------------------------------
 * Product benefits — "Big adventures. Small camera."
 * ------------------------------------------------------------------------ */
export const BENEFITS = [
  { id: 'waterproof', title: 'Waterproof', tagline: 'Dive into the action.', image: IMAGES.benefits.waterproof },
  { id: 'stabilized', title: 'Stabilized video', tagline: 'Keep the moment smooth.', image: IMAGES.benefits.stabilized },
  { id: '5k', title: '5.3K recording', tagline: 'Bring every detail home.', image: IMAGES.benefits.fourK },
  { id: 'compact', title: 'Compact & durable', tagline: 'Pack light. Go further.', image: IMAGES.benefits.compact },
];

/* --------------------------------------------------------------------------
 * Use cases — "Your life. Every angle."
 * ------------------------------------------------------------------------ */
export const USE_CASES = [
  { id: 'travel', title: 'Travel', caption: 'Every trip, in your pocket.', image: IMAGES.useCases.travel, href: ANCHORS.cameras },
  { id: 'sports', title: 'Sports', caption: 'Mount it. Send it.', image: IMAGES.useCases.sports, href: ANCHORS.cameras },
  { id: 'vlogging', title: 'Vlogging', caption: 'Talk. Walk. Publish.', image: IMAGES.useCases.vlogging, href: ANCHORS.cameras },
  { id: 'outdoor', title: 'Outdoor adventures', caption: 'Built for the summit.', image: IMAGES.useCases.outdoor, href: ANCHORS.cameras },
];

/* --------------------------------------------------------------------------
 * Customer stories
 * ============================================================================
 *  PLACEHOLDER SOCIAL PROOF — NOT VERIFIED CUSTOMER REVIEWS
 *  The quotes, names and the aggregate rating below are fictional samples
 *  created for an academic LPO design concept. Replace with real, consented
 *  reviews (and a real ratings source) before any commercial use.
 * ============================================================================
 */
export const RATING = { value: 4.8, outOf: 5, placeholder: true };

export const TESTIMONIALS = [
  {
    id: 'alex',
    quote: 'Steady footage, even on rough trails.',
    name: 'Alex M.',
    activity: 'Mountain biking',
    image: IMAGES.stories.alex,
    placeholder: true,
  },
  {
    id: 'jamie',
    quote: 'Small enough to take everywhere.',
    name: 'Jamie R.',
    activity: 'Kayaking',
    image: IMAGES.stories.jamie,
    placeholder: true,
  },
  {
    id: 'sam',
    quote: 'My new travel essential.',
    name: 'Sam T.',
    activity: 'City travel',
    image: IMAGES.stories.sam,
    placeholder: true,
  },
];
