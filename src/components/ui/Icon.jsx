/**
 * Inline SVG icon set (stroke icons, 24px grid). Keeping icons inline avoids an
 * extra dependency and lets them inherit `currentColor`.
 */
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />,
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17" cy="17.5" r="1.5" />
    </>
  ),
  returns: (
    <>
      <path d="M4 12a8 8 0 1 0 2.6-5.9" />
      <path d="M4 4v5h5" />
    </>
  ),
  badge: (
    <>
      <path d="m12 3 2.2 1.6 2.7-.3 1 2.5 2.4 1.3-.7 2.6.7 2.6-2.4 1.3-1 2.5-2.7-.3L12 21l-2.2-1.6-2.7.3-1-2.5L3.7 15.9l.7-2.6-.7-2.6L6.1 9.4l1-2.5 2.7.3L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  star: (
    <path
      d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9 2.9-6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrowRight: (
    <>
      <path d="M4 12h16" />
      <path d="m13 5 7 7-7 7" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="m6 7 1 13h10l1-13" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <path d="M3 8.5C3 6.6 4.5 5 6.4 5h11.2C19.5 5 21 6.6 21 8.5v7c0 1.9-1.5 3.5-3.4 3.5H6.4C4.5 19 3 17.4 3 15.5v-7Z" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V8.8c0-.5.3-.8.5-.8Z" />,
  camera: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <circle cx="9.5" cy="12.5" r="3" />
      <rect x="15" y="10" width="3.5" height="3" rx=".6" />
    </>
  ),
};

export default function Icon({ name, className = 'h-5 w-5', title, ...rest }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {path}
    </svg>
  );
}
