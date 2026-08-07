export default function Portrait({
  alt,
  caption,
}: {
  alt: string;
  caption: string;
}) {
  return (
    <figure className="relative">
      <div
        aria-hidden="true"
        className="absolute -right-2 -top-2 h-full w-full border border-accent/40"
      />
      <picture>
        <source
          type="image/avif"
          srcSet="/portrait/isa-kaya-320.avif 320w, /portrait/isa-kaya-480.avif 480w, /portrait/isa-kaya-608.avif 608w"
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, 240px"
        />
        <source
          type="image/webp"
          srcSet="/portrait/isa-kaya-320.webp 320w, /portrait/isa-kaya-480.webp 480w, /portrait/isa-kaya-608.webp 608w"
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, 240px"
        />
        <img
          src="/portrait/isa-kaya-480.jpg"
          srcSet="/portrait/isa-kaya-320.jpg 320w, /portrait/isa-kaya-480.jpg 480w, /portrait/isa-kaya-608.jpg 608w"
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 320px, 240px"
          width={608}
          height={608}
          alt={alt}
          fetchPriority="high"
          decoding="async"
          className="portrait-img relative aspect-square w-full border border-line object-cover"
        />
      </picture>
      <figcaption className="mt-4 border-l-2 border-accent pl-3 font-mono text-xs text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
