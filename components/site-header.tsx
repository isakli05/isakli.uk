import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { localePath, type Locale } from "@/lib/locales";
import MobileMenu from "./mobile-menu";
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
          <MobileMenu
            label={content.a11y.menu}
            navLabel={content.a11y.primaryNav}
            items={content.header.nav}
          />
        </div>
      </div>
    </header>
  );
}
