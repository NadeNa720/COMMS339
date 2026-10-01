import { DEMO_VIDEO } from '../data/site';
import { useStore } from '../store/useStore';
import Modal from './ui/Modal';

/** "Watch Demo" — YouTube (privacy-enhanced) embed. The iframe is unmounted on close so playback stops. */
export default function VideoModal() {
  const { videoOpen, closeVideo } = useStore();

  return (
    <Modal open={videoOpen} onClose={closeVideo} title={DEMO_VIDEO.title} panelClassName="overflow-hidden rounded-2xl bg-ink-950 shadow-card-hover">
      <div className="aspect-video w-full bg-ink-950">
        {videoOpen ? (
          <iframe
            src={DEMO_VIDEO.embedUrl}
            title={DEMO_VIDEO.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : null}
      </div>
    </Modal>
  );
}
