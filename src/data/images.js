/**
 * Centralized image registry.
 *
 * Every photo used on the page is referenced from here so assets can be swapped
 * in one place. Files live in /public/images and are served from the site root,
 * so there are no third-party hotlinks. If a file is missing, <SmartImage />
 * falls back to a branded gradient placeholder and the layout still renders.
 *
 * Alt text is descriptive on purpose (accessibility + on-site SEO).
 *
 * Responsive variants: `npm run images` generates WebP files at 480/768/native
 * widths and writes image-manifest.json. `img()` turns that into a `srcSet`
 * plus intrinsic width/height (no layout shift), while the original JPEG stays
 * the `src` fallback.
 */
import manifest from './image-manifest.json';

const BASE = `${import.meta.env.BASE_URL}images/`;

const img = (file, alt) => {
  const meta = manifest[file];
  if (!meta) return { src: `${BASE}${file}`, alt };
  return {
    src: `${BASE}${file}`,
    srcSet: meta.variants.map((v) => `${BASE}${v.file} ${v.width}w`).join(', '),
    width: meta.width,
    height: meta.height,
    alt,
  };
};

export const IMAGES = {
  hero: img(
    'hero-mountain-biker.jpg',
    'Mountain biker riding a rocky alpine ridge at sunset, the kind of adventure a GoPro action camera is built to capture',
  ),
  heroProduct: img(
    'product-gopro-hero.jpg',
    'GoPro-style action camera with a large lens and front screen, studio shot on a black background',
  ),
  finalCta: img(
    'cta-mountain-lake.jpg',
    'Hiker standing beside a still alpine lake at blue hour with snow-capped mountains reflected in the water',
  ),

  benefits: {
    waterproof: img(
      'benefit-waterproof.jpg',
      'Surfer duck-diving under a turquoise wave with an action camera mounted on the surfboard',
    ),
    stabilized: img(
      'benefit-stabilized.jpg',
      'First-person view from a mountain bike racing down a forest trail, filmed with a chest-mounted action camera',
    ),
    fourK: img(
      'benefit-4k.jpg',
      'Snowboarder carving a turn and throwing a fan of powder against a deep blue sky',
    ),
    compact: img(
      'benefit-compact.jpg',
      'Hiker holding a compact action camera in the palm of one hand above a sea of clouds',
    ),
  },

  useCases: {
    travel: img(
      'usecase-travel.jpg',
      'Traveler filming a Mediterranean bay at sunset with a handheld action camera',
    ),
    sports: img(
      'usecase-sports.jpg',
      'Skateboarder mid-air at a skatepark at dusk wearing a helmet-mounted action camera',
    ),
    vlogging: img(
      'usecase-vlogging.jpg',
      'Smiling vlogger talking to an action camera on a grip in a lantern-lit night market',
    ),
    outdoor: img(
      'usecase-outdoor.jpg',
      'Climber in a red jacket scrambling up a granite ridge above the clouds at dawn with a chest-mounted action camera',
    ),
  },

  products: {
    gopro: img(
      'product-gopro-hero.jpg',
      'GoPro action camera, front three-quarter view on a black background',
    ),
    mountKit: img(
      'product-mount-kit.jpg',
      'Adventure mount kit: helmet and flat adhesive mounts, handlebar clamp, chest harness, extension arm and thumb screws',
    ),
    battery: img('product-battery.jpg', 'Spare rechargeable action camera battery with a blue accent band'),
    case: img(
      'product-case.jpg',
      'Compact black protective carrying case with foam interior and carabiner clip, open',
    ),
  },

  stories: {
    alex: img('story-alex.jpg', 'Mud-splattered mountain biker in a full-face helmet grinning at the camera after a trail descent'),
    jamie: img('story-jamie.jpg', 'Kayaker on a glassy fjord with an action camera clipped to her life vest'),
    sam: img('story-sam.jpg', 'Traveler leaning out of a vintage tram filming cobblestone streets at golden hour'),
  },
};
