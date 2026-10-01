/**
 * Consistent section heading block: optional eyebrow, h2, optional lead text.
 * `tone="dark"` flips colors for sections on near-black backgrounds.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  as = 'h2',
  className = '',
  id,
}) {
  const Tag = as;
  const dark = tone === 'dark';
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        <p className={`eyebrow ${dark ? 'text-brand-400' : 'text-brand-600'}`}>{eyebrow}</p>
      ) : null}
      <Tag
        id={id}
        className={`text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] ${
          dark ? 'text-white' : 'text-ink-950'
        }`}
      >
        {title}
      </Tag>
      {lead ? (
        <p className={`text-lg leading-relaxed text-pretty ${dark ? 'text-mist-300' : 'text-mist-500'}`}>{lead}</p>
      ) : null}
    </div>
  );
}
