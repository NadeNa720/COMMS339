import { useEffect, useRef } from 'react';
import Icon from './Icon';

/**
 * Accessible modal built on the native <dialog> element:
 * focus trapping, Escape-to-close and inert background come for free.
 *
 * `layout="center"` renders a centered panel; `layout="drawer"` slides in from the right.
 */
export default function Modal({
  open,
  onClose,
  title,
  layout = 'center',
  panelClassName = '',
  closeLabel = 'Close',
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Prevent background scroll while open.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleBackdropClick = (e) => {
    if (e.target === ref.current) onClose();
  };

  // Phones: centered dialogs become a bottom sheet that can scroll; the drawer
  // takes the full width. Tablet and up keep the desktop layouts.
  const layoutClasses =
    layout === 'drawer'
      ? 'm-0 ml-auto h-dvh max-h-dvh w-full max-w-md animate-drawer-in'
      : 'm-0 mt-auto mb-0 w-full max-h-[92dvh] animate-sheet-in sm:m-auto sm:w-[calc(100%-2rem)] sm:max-w-4xl sm:animate-fade-up';

  return (
    <dialog
      ref={ref}
      className={`${layoutClasses} open:flex`}
      aria-label={title}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative flex w-full max-h-[inherit] flex-col ${
          layout === 'drawer' ? '' : 'pb-[env(safe-area-inset-bottom)] sm:pb-0'
        } ${panelClassName}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="focus-ring absolute top-3 right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink-950/70 text-white backdrop-blur transition hover:bg-ink-950"
          aria-label={closeLabel}
        >
          <Icon name="close" className="h-5 w-5" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
