export const LOCALES = ["en", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** URL path prefix for a locale. English lives at the root. */
export function localePath(locale: Locale, path = ""): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${prefix}${path}` || "/";
}

export const SITE_URL = "https://isakli.uk";

export const LINKS = {
  github: "https://github.com/isakli05",
  linkedin: "https://tr.linkedin.com/in/isa-kaya-187653171",
  email: "isakaya709@gmail.com",
  cvEn: "/cv/isa-kaya-cv-en.pdf",
  cvTr: "/cv/isa-kaya-cv-tr.pdf",
} as const;
