import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "../globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getContent } from "@/lib/content";
import { isLocale, LINKS, LOCALES, localePath, SITE_URL, type Locale } from "@/lib/locales";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#151210" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const valid: Locale = isLocale(locale) ? locale : "en";
  const content = getContent(valid);
  const canonical = `${SITE_URL}${localePath(valid)}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical,
      languages: {
        en: SITE_URL,
        tr: `${SITE_URL}/tr`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      type: "website",
      siteName: "İsa Kaya",
      title: content.meta.title,
      description: content.meta.description,
      url: canonical,
      locale: valid === "tr" ? "tr_TR" : "en_US",
      alternateLocale: valid === "tr" ? "en_US" : "tr_TR",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: content.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
  document.documentElement.classList.add("js");
})();
`;

function personJsonLd(locale: Locale) {
  const content = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "İsa Kaya",
    jobTitle: content.hero.title,
    url: SITE_URL,
    email: `mailto:${LINKS.email}`,
    image: `${SITE_URL}/portrait/isa-kaya-608.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    sameAs: [LINKS.github, LINKS.linkedin],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Sequelize ORM",
      "PHP",
      "REST APIs",
      "SaaS",
      "Digital Signage",
      "POS systems",
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const content = getContent(locale);

  return (
    <html
      lang={locale}
      className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
        >
          {content.a11y.skipToContent}
        </a>
        <SiteHeader locale={locale} content={content} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} content={content} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
