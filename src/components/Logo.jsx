/**
 * Brand mark: a camera lens framed by castle battlements.
 * Inherits `currentColor` so it can sit on dark or light surfaces.
 */
export default function Logo({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path
        d="M4 10h4V6h4v4h8V6h4v4h4v16H4V10Z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M4 10h4V6h4v4h8V6h4v4h4v16H4V10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="18" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="18" r="1.8" fill="currentColor" />
    </svg>
  );
}
