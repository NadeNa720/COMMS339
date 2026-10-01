/**
 * Minimal, dependency-free conversion tracking.
 *
 * Every CTA on the page reports through `trackEvent`. Events are pushed to
 * `window.dataLayer` (Google Tag Manager) and to `window.gtag` (GA4) when those
 * are present, so wiring up analytics is a matter of adding the tag snippet to
 * index.html — no component changes required. In development, events are
 * logged to the console instead.
 *
 * Suggested GA4 conversion events: `select_item` (Shop GoPro), `add_to_cart`,
 * `view_item`, `begin_checkout`, `video_start` (Watch Demo).
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;

  const payload = { event: name, ...params };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, params);
  }
}
