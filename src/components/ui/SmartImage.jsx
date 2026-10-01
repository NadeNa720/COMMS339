import { useState } from 'react';
import Icon from './Icon';

/**
 * <img> with a graceful fallback. If the asset fails to load (missing file,
 * offline preview, wrong path) it renders a branded gradient placeholder so the
 * layout never breaks and the alt text stays available to assistive tech.
 *
 * `priority` marks above-the-fold images (eager + high fetch priority).
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes,
  width,
  height,
  tone = 'dark',
  ...rest
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    const palette =
      tone === 'light'
        ? 'from-mist-100 via-mist-200 to-mist-300 text-ink-600'
        : 'from-ink-700 via-ink-800 to-ink-950 text-white/70';
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br ${palette} ${className}`}
        {...rest}
      >
        <Icon name="camera" className="h-10 w-10 opacity-60" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sizes}
      width={width}
      height={height}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
