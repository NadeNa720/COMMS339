import { ANCHORS } from '../data/site';
import { IMAGES } from '../data/images';
import Button from './ui/Button';
import Icon from './ui/Icon';
import SmartImage from './ui/SmartImage';
import TrustLine from './ui/TrustLine';

/** Final conversion moment: cinematic full-bleed photo, centered headline, dominant blue CTA. */
export default function FinalCTA() {
  return (
    <section
      className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-ink-950 text-white sm:min-h-[600px] lg:min-h-[680px]"
      aria-labelledby="final-cta-title"
    >
      <SmartImage
        {...IMAGES.finalCta}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-ink-950/45" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink-950/80 to-transparent"
        aria-hidden="true"
      />

      <div className="container-x py-24 text-center">
        <h2
          id="final-cta-title"
          className="text-shadow-soft mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          Ready to Capture Your Next Adventure?
        </h2>
        <p className="text-shadow-soft mx-auto mt-4 max-w-md text-lg text-balance text-white/80">
          The GoPro HERO13, adventure-ready and in stock.
        </p>
        <div className="mt-9 flex flex-col items-center gap-4">
          <Button
            href={ANCHORS.gopro}
            size="lg"
            className="w-full max-w-xs sm:w-auto sm:min-w-56"
            track={{ name: 'select_item', params: { source: 'final_cta' } }}
          >
            Shop GoPro
            <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
          <TrustLine />
        </div>
      </div>
    </section>
  );
}
