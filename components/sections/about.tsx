import type { SiteContent } from "@/lib/content";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";

export default function About({ content }: { content: SiteContent }) {
  const { about } = content;

  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20 md:pb-28"
    >
      <SectionHeader index="04" kicker={about.kicker} heading={about.heading} />
      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-9 md:col-start-4">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delay={i * 40}>
              <p className="max-w-[66ch] leading-relaxed text-muted [&:not(:first-child)]:mt-5">
                {i === 0 ? (
                  <>
                    <span className="font-serif text-lg font-medium text-ink">
                      {paragraph.split(".")[0]}.
                    </span>
                    {paragraph.slice(paragraph.indexOf(".") + 1)}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
