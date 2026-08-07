import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { localePath, type Locale } from "@/lib/locales";
import ThemeToggle from "./theme-toggle";

function LanguageLinks({ locale, content }: { locale: Locale; content: SiteContent }) {
  const other: Locale = locale === "en" ? "tr" : "en";
  const otherContent = other === "tr" ? "TR" : "EN";
  return (
    <span
      role="group"
      aria-label={content.a11y.languageLabel}
      className="flex items-baseline gap-1 font-mono text-xs tracking-wide"
    >
      <span
        aria-current="true"
        className="text-accent-strong"
      >
        {locale.toUpperCase()}
      </span>
      <span aria-hidden="true" className="text-faint">
        /
      </span>
      <Link
        href={localePath(other)}
        hrefLang={other}
        className="text-muted transition-colors hover:text-ink"
      >
        {otherContent}
      </Link>
    </span>
  );
}

export default function SiteHeader({
  locale,
  content,
}: {
  locale: Locale;
  content: SiteContent;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href={localePath(locale)}
          className="font-serif text-lg font-medium tracking-tight text-ink"
        >
          İsa Kaya
        </Link>

        <nav
          aria-label={content.a11y.primaryNav}
          className="hidden items-center gap-7 md:flex"
        >
          {content.header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageLinks locale={locale} content={content} />
          <ThemeToggle label={content.a11y.themeToggle} />
          <details className="group relative md:hidden">
            <summary
              aria-label={content.a11y.menu}
              className="flex h-9 cursor-pointer items-center rounded-sm border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-ink hover:text-ink"
            >
              {content.a11y.menu}
            </summary>
            <nav
              aria-label={content.a11y.primaryNav}
              className="absolute right-0 top-12 flex w-44 flex-col border border-line bg-paper py-2 shadow-sm"
            >
              {content.header.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2.5 text-sm text-muted transition-colors hover:bg-paper-raised hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
