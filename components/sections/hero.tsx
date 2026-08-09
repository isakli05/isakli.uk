import type { SiteContent } from "@/lib/content";
import { LINKS, type Locale } from "@/lib/locales";
import Portrait from "@/components/portrait";
import Reveal from "@/components/reveal";

export default function Hero({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const { hero, a11y } = content;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="grid items-start gap-12 md:grid-cols-12 md:gap-8">
        <div className="min-w-0 md:col-span-8 lg:col-span-7">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-strong">
              {hero.kicker}
              <span className="text-faint"> · </span>
              <span className="text-muted">{hero.location}</span>
            </p>
          </Reveal>

          <Reveal delay={40}>
            <h1 className="mt-6 font-serif text-6xl font-medium leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-8xl">
              {hero.name}
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-muted">
              {hero.lede}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-faint">
              {hero.stackLabel}
            </p>
            <p className="mt-2 font-serif text-xl font-medium text-ink sm:text-2xl">
              {hero.stack.map((tech, i) => (
                <span key={tech}>
                  {i > 0 && <span className="text-accent"> · </span>}
                  {tech}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="inline-flex h-11 items-center bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                {hero.primaryCta}
              </a>
              <a
                href={locale === "tr" ? LINKS.cvTr : LINKS.cvEn}
                download
                className="inline-flex h-11 items-center border border-line px-6 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                {hero.cvCta}
              </a>
              <span className="flex items-center gap-5 font-mono text-sm text-muted">
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-ink"
                >
                  GitHub ↗<span className="sr-only">({a11y.externalLink})</span>
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-ink"
                >
                  LinkedIn ↗
                  <span className="sr-only">({a11y.externalLink})</span>
                </a>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="md:col-span-4 lg:col-span-4 lg:col-start-9">
          <div className="max-w-[240px] md:max-w-none">
            <Portrait alt={a11y.portraitAlt} caption={hero.portraitCaption} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
