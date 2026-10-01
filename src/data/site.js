/**
 * Global site configuration.
 * Brand copy, navigation and external links live here so nothing is duplicated in markup.
 */
export const SITE = {
  name: 'Kent’s Camera Castle',
  wordmark: 'KENT’S CAMERA CASTLE',
  tagline: 'More adventure. Every frame.',
  category: 'GoPro Action Cameras',
  year: 2026,
  /** Reassurance line used under CTAs (hero, product grid, final CTA). */
  trustLine: ['Secure checkout', 'Easy returns'],
  /** Academic-project disclaimer shown in the footer. */
  disclaimer: 'Design concept. Prices, reviews and retailer status are illustrative.',
  contactEmail: 'hello@kentscameracastle.example',
};

/** Anchor targets used across the page. Keep in sync with section ids. */
export const ANCHORS = {
  top: '#top',
  cameras: '#cameras',
  gopro: '#gopro',
  accessories: '#accessories',
  benefits: '#benefits',
  useCases: '#use-cases',
  stories: '#stories',
  support: '#support',
  shipping: '#shipping',
  returns: '#returns',
  faq: '#faq',
};

/** Primary navigation (header + mobile menu). */
export const NAV_LINKS = [
  { label: 'Cameras', href: ANCHORS.cameras },
  { label: 'Accessories', href: ANCHORS.accessories },
  { label: 'Support', href: ANCHORS.support },
];

/** Footer link column. */
export const FOOTER_LINKS = [
  { label: 'Contact', href: `mailto:${SITE.contactEmail}` },
  { label: 'Shipping', href: ANCHORS.shipping },
  { label: 'Returns', href: ANCHORS.returns },
  { label: 'FAQ', href: ANCHORS.faq },
];

/** Social profiles. Replace `href` values with real profile URLs. */
export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' },
];

/**
 * "Watch Demo" video. Uses the privacy-enhanced YouTube embed domain.
 * Swap `youtubeId` for any other video id (or point `embedUrl` at a self-hosted MP4 player).
 */
export const DEMO_VIDEO = {
  title: 'GoPro action camera demo',
  youtubeId: '_PMRqrna4sU', // "Everything New with GoPro HERO13 Black" (official GoPro channel)
  get embedUrl() {
    return `https://www.youtube-nocookie.com/embed/${this.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
  },
};

/** Compact support copy rendered in the footer accordions. Placeholder policy text. */
export const SUPPORT_ITEMS = [
  {
    id: 'shipping',
    title: 'Shipping',
    body: 'Orders ship within 1–2 business days. Standard delivery is free on orders over €50; express options are available at checkout.',
  },
  {
    id: 'returns',
    title: 'Returns',
    body: 'Changed your mind? Return unused items in original packaging within 30 days for a full refund. Start a return from your order confirmation email.',
  },
  {
    id: 'faq',
    title: 'FAQ',
    body: 'Is the GoPro waterproof without a case? Yes — the camera is waterproof out of the box for everyday adventures. Does it come with a mount? Every camera ships with a standard mounting buckle and thumb screw.',
  },
];
