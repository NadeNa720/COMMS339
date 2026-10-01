import { forwardRef } from 'react';
import { trackEvent } from '../../lib/analytics';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full select-none ' +
  'transition-[background-color,color,box-shadow,transform,border-color] duration-200 ease-out ' +
  'focus-ring active:translate-y-px disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  /** Dominant conversion action — GoPro blue. */
  primary:
    'bg-brand-500 text-white shadow-glow hover:bg-brand-600 hover:shadow-[0_14px_44px_-10px_rgb(10_122_255/0.7)]',
  /** Secondary action on dark photography — frosted glass. */
  glass:
    'bg-white/12 text-white ring-1 ring-inset ring-white/35 backdrop-blur-md hover:bg-white/22 hover:ring-white/60',
  /** Secondary action on light backgrounds. */
  outline:
    'bg-white text-ink-900 ring-1 ring-inset ring-mist-300 hover:ring-ink-900 hover:bg-mist-50',
  /** Solid dark button for light sections. */
  dark: 'bg-ink-950 text-white hover:bg-ink-800',
  /** Quiet text link. */
  ghost: 'bg-transparent text-ink-900 hover:bg-mist-100',
};

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

/**
 * Polymorphic button. Renders an <a> when `href` is provided, otherwise a <button>.
 * Pass `track={{ name, params }}` to fire an analytics event on click.
 */
const Button = forwardRef(function Button(
  { as, href, variant = 'primary', size = 'md', className = '', track, onClick, children, ...rest },
  ref,
) {
  const Tag = as ?? (href ? 'a' : 'button');
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const handleClick = (e) => {
    if (track) trackEvent(track.name, track.params);
    onClick?.(e);
  };

  const extra = Tag === 'button' ? { type: rest.type ?? 'button' } : {};

  return (
    <Tag ref={ref} href={href} className={classes} onClick={handleClick} {...extra} {...rest}>
      {children}
    </Tag>
  );
});

export default Button;
