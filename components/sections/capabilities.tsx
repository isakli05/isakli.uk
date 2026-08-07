import type { SiteContent } from "@/lib/content";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";

export default function Capabilities({ content }: { content: SiteContent }) {
  const { capabilities } = content;

  return (
    <section
      id="capabilities"
      className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20 md:pb-28"
    >
      <SectionHeader
        index="03"
        kicker={capabilities.kicker}
        heading={capabilities.heading}
      />
      <div className="mt-10">
        {capabilities.groups.map((group, i) => (
          <Reveal key={group.label} delay={i * 25}>
            <div className="grid gap-2 border-t border-line py-5 md:grid-cols-12 md:gap-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:col-span-3">
                {group.label}
              </h3>
              <p className="text-sm leading-relaxed text-ink md:col-span-9">
                {group.items.map((item, j) => (
                  <span key={item}>
                    {j > 0 && <span className="text-faint"> · </span>}
                    {item}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
