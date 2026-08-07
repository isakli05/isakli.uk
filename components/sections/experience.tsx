import type { SiteContent } from "@/lib/content";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";

export default function Experience({ content }: { content: SiteContent }) {
  const { experience } = content;

  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20 md:pb-28"
    >
      <SectionHeader
        index="02"
        kicker={experience.kicker}
        heading={experience.heading}
      />
      <div className="mt-10">
        {experience.entries.map((entry, i) => (
          <Reveal key={entry.company} delay={i * 30}>
            <article className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="font-mono text-xs leading-relaxed text-muted">
                  {entry.period}
                </p>
                {entry.location && (
                  <p className="mt-1 font-mono text-xs text-faint">
                    {entry.location}
                  </p>
                )}
              </div>
              <div className="md:col-span-9">
                <h3 className="font-serif text-xl font-medium tracking-tight text-ink md:text-2xl">
                  {entry.role}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-accent-strong">
                  {entry.company}
                </p>
                <p className="mt-3 max-w-[66ch] text-sm leading-relaxed text-muted">
                  {entry.summary}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
