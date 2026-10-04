# Kent’s Camera Castle — GoPro Action Cameras landing page

Production-ready landing page for **Kent’s Camera Castle**, featuring GoPro action cameras.
Built as an LPO (landing-page optimization) redesign concept: clarity, trust, mobile-first UX and a
single dominant conversion goal (**Shop GoPro**) with a secondary goal (**Watch Demo**).

> **Academic design concept.** Prices, customer stories, ratings and retailer status are illustrative
> placeholders and are clearly marked as such in the code (see `src/data/products.js` and
> `src/data/content.js`).

## Stack

- [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`, design tokens in `src/index.css`)
- Inter Variable font, self-hosted through `@fontsource-variable/inter`
- `serve` for the production static server (Railway)

No backend. The shopping bag, quick-view and demo-checkout are client-side only.

## Run locally

Requires Node.js **20.19+** (22 recommended — see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build -> dist/
npm run preview    # preview the production build locally (http://localhost:4173)
npm run lint       # ESLint
npm run images     # regenerate responsive WebP variants + src/data/image-manifest.json (run after adding/replacing photos)
npm start          # serve dist/ on $PORT (used by Railway; Linux/macOS shells)
```

## Deploy to Railway

The repo ships with `railway.json`, so Railway picks up the build and start commands automatically.

1. Push this folder to a Git repository (GitHub, GitLab, or Railway’s own repo).
2. In [Railway](https://railway.com): **New Project → Deploy from GitHub repo** and select the repo.
   - If this folder is a sub-directory of a larger repo, set **Settings → Root Directory** to `kents-camera-castle`.
3. Railway (Railpack) installs dependencies, runs `npm run build` (from `railway.json`), then `npm start`, which serves `dist/` on the
   port Railway injects via `$PORT`.
4. Open **Settings → Networking → Generate Domain** to get a public URL.

Alternatively, with the Railway CLI:

```bash
npm i -g @railway/cli
railway login
railway init          # create / link a project
railway up            # build & deploy
railway domain        # generate a public domain
```

No environment variables are required.

## Project structure

```
kents-camera-castle/
├─ index.html                 # SEO meta, Open Graph, JSON-LD, hero image preload
├─ public/
│  ├─ images/                 # all photography (local, no hotlinks)
│  ├─ favicon.svg
│  └─ robots.txt
├─ src/
│  ├─ main.jsx                # entry (font + global CSS)
│  ├─ App.jsx                 # page composition, section order
│  ├─ index.css               # Tailwind v4 theme tokens + utilities
│  ├─ components/
│  │  ├─ Header.jsx           # sticky nav, search, bag, mobile menu
│  │  ├─ Hero.jsx             # cinematic hero + floating product card
│  │  ├─ TrustBar.jsx
│  │  ├─ FeatureCards.jsx     # "Big adventures. Small camera."
│  │  ├─ UseCases.jsx         # dark lifestyle cards (mobile carousel)
│  │  ├─ ProductGrid.jsx      # GoPro + accessories
│  │  ├─ Testimonials.jsx     # sample stories (placeholder social proof)
│  │  ├─ FinalCTA.jsx
│  │  ├─ Footer.jsx           # links, support accordions, disclaimer
│  │  ├─ VideoModal.jsx       # Watch Demo (YouTube nocookie embed)
│  │  ├─ QuickViewModal.jsx   # "View product"
│  │  ├─ CartDrawer.jsx       # shopping bag (demo checkout)
│  │  ├─ Toast.jsx
│  │  └─ ui/                  # Button, Modal, SmartImage, Icon, Stars, SectionHeading, TrustLine
│  ├─ data/
│  │  ├─ site.js              # brand copy, nav, anchors, footer, demo video id
│  │  ├─ images.js            # centralized image registry + alt text
│  │  ├─ products.js          # products & PLACEHOLDER prices
│  │  └─ content.js           # trust items, benefits, use cases, PLACEHOLDER testimonials
│  ├─ lib/
│  │  ├─ analytics.js         # trackEvent() -> dataLayer / gtag when present
│  │  └─ format.js            # price formatting (USD)
│  └─ store/                  # StoreProvider + useStore (bag, modals, toast)
├─ railway.json               # Railway build/start config
├─ vite.config.js
├─ eslint.config.js
└─ package.json
```

## Editing content

| What | Where |
| --- | --- |
| Prices, product names, descriptions | `src/data/products.js` (prices are marked `// PLACEHOLDER`) |
| Testimonials, rating, trust bar, benefits, use cases | `src/data/content.js` |
| Brand copy, nav links, footer, support text, demo video | `src/data/site.js` |
| Images and alt text | `src/data/images.js` + files in `public/images/` |
| Colors, fonts, shadows, radii | `@theme` block in `src/index.css` |

Images are served from `public/images/`. If any file is missing, `SmartImage` renders a branded
gradient placeholder so the layout never breaks.

Mobile performance: `npm run images` (sharp) generates WebP variants at 480 / 768 / native width for
every JPEG and writes `src/data/image-manifest.json`; `images.js` turns that into `srcSet` +
intrinsic `width`/`height`, so phones download ~20–60 KB per photo instead of 200–450 KB and
there is no layout shift. Keep the original JPEG — it stays the `src` fallback.

## Analytics

Every CTA calls `trackEvent()` (`src/lib/analytics.js`) with GA4-style event names
(`select_item`, `add_to_cart`, `view_item`, `begin_checkout`, `video_start`, `search`).
Add your Google Tag Manager / GA4 snippet to `index.html` and events flow automatically via
`window.dataLayer` / `window.gtag`. In development they are logged to the console.

## Accessibility & performance notes

- Semantic landmarks (`header`, `main`, `section[aria-labelledby]`, `footer`), one `h1`, ordered headings
- Skip link, visible focus rings, `aria-expanded` / `aria-controls` on toggles, labelled icon buttons
- Modals use the native `<dialog>` (focus trap, Escape, inert background)
- `prefers-reduced-motion` respected; smooth anchor scrolling with sticky-header offset
- Hero image preloaded with `fetchpriority="high"`; all other images lazy-loaded
