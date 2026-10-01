import { useStore } from '../store/useStore';
import Icon from './ui/Icon';

/** Bottom toast for lightweight feedback ("Added to your bag"). Announced politely to screen readers. */
export default function Toast() {
  const { toast, dismissToast } = useStore();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      {toast ? (
        <div
          key={toast.id}
          className="pointer-events-auto flex max-w-md animate-fade-up items-center gap-3 rounded-full bg-ink-950 py-2.5 pr-2.5 pl-4 text-sm font-medium text-white shadow-card-hover ring-1 ring-white/10"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500">
            <Icon name="check" className="h-3.5 w-3.5" />
          </span>
          <span className="truncate">{toast.message}</span>
          {toast.action ? (
            <button
              type="button"
              onClick={() => {
                toast.action.onClick();
                dismissToast();
              }}
              className="focus-ring-light shrink-0 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/22"
            >
              {toast.action.label}
            </button>
          ) : null}
          <button
            type="button"
            onClick={dismissToast}
            className="focus-ring-light flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Dismiss notification"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
