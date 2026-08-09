import { notFound } from "next/navigation";
import Hero from "@/components/sections/hero";
import Work from "@/components/sections/work";
import Experience from "@/components/sections/experience";
import Capabilities from "@/components/sections/capabilities";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import { getContent } from "@/lib/content";
import { isLocale } from "@/lib/locales";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const content = getContent(locale);

  return (
    <>
      <Hero content={content} locale={locale} />
      <Work content={content} />
      <Experience content={content} />
      <Capabilities content={content} />
      <About content={content} />
      <Contact content={content} />
    </>
  );
}
