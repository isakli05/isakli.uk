import type { SiteContent } from "@/lib/content";
import { LINKS } from "@/lib/locales";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";

export default function Contact({ content }: { content: SiteContent }) {
  const { contact, a11y } = content;

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24 md:pb-32"
    >
      <SectionHeader
        index="05"
        kicker={contact.kicker}
        heading={contact.heading}
      />
      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-9 md:col-start-4">
          <Reveal>
            <p className="max-w-[60ch] leading-relaxed text-muted">
              {contact.body}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <a
              href={`mailto:${LINKS.email}`}
              className="link-underline mt-8 inline-block font-serif text-3xl font-medium tracking-tight text-ink transition-colors hover:text-accent md:text-4xl"
            >
              {LINKS.email}
            </a>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${LINKS.email}`}
                className="inline-flex h-11 items-center bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                {contact.emailCta}
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center border border-line px-6 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                GitHub ↗<span className="sr-only">({a11y.externalLink})</span>
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center border border-line px-6 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                LinkedIn ↗
                <span className="sr-only">({a11y.externalLink})</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted">
              <a
                href={LINKS.cvEn}
                download
                className="link-underline transition-colors hover:text-ink"
              >
                {contact.cvEnCta} (PDF)
              </a>
              <a
                href={LINKS.cvTr}
                download
                className="link-underline transition-colors hover:text-ink"
              >
                {contact.cvTrCta} (PDF)
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
