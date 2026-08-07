import type { SiteContent } from "@/lib/content";
import { LINKS, localePath, type Locale } from "@/lib/locales";

export default function SiteFooter({
  locale,
  content,
}: {
  locale: Locale;
  content: SiteContent;
}) {
  const other: Locale = locale === "en" ? "tr" : "en";

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-serif text-base font-medium">İsa Kaya</p>
          <p className="font-mono text-xs text-faint">
            © 2026 · {content.footer.note}
          </p>
          <p className="font-mono text-xs text-faint">
            {content.footer.builtWith}
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-ink"
          >
            GitHub<span className="sr-only"> ({content.a11y.externalLink})</span>
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-ink"
          >
            LinkedIn
            <span className="sr-only"> ({content.a11y.externalLink})</span>
          </a>
          <a
            href={`mailto:${LINKS.email}`}
            className="link-underline transition-colors hover:text-ink"
          >
            {LINKS.email}
          </a>
          <a
            href={localePath(other)}
            hrefLang={other}
            className="link-underline text-accent-strong transition-colors hover:text-accent"
          >
            {other === "tr" ? "Türkçe" : "English"}
          </a>
        </nav>
      </div>
    </footer>
  );
}
