import type { ProjectEntry, SiteContent } from "@/lib/content";
import Reveal from "@/components/reveal";
import SectionHeader from "@/components/section-header";

function TechLine({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <p className="font-mono text-xs leading-loose text-muted">
      <span className="uppercase tracking-[0.12em] text-faint">{label}: </span>
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && <span className="text-faint"> · </span>}
          {item}
        </span>
      ))}
    </p>
  );
}

function FeatureProject({
  project,
  techLabel,
}: {
  project: ProjectEntry;
  techLabel: string;
}) {
  return (
    <Reveal>
      <article className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
        <div className="flex flex-row items-baseline justify-between gap-2 md:col-span-3 md:flex-col md:items-start md:justify-start md:gap-4">
          <p className="font-mono text-xs text-accent-strong">{project.index}</p>
          <div className="text-right md:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
              {project.tag}
            </p>
            <p className="mt-1 font-mono text-xs text-faint">{project.period}</p>
          </div>
        </div>

        <div className="md:col-span-9">
          <h3 className="font-serif text-3xl font-medium tracking-tight text-ink md:text-4xl">
            {project.name}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline ml-3 align-middle font-mono text-sm font-normal text-accent-strong hover:text-accent"
              >
                {project.url.replace("https://", "")} ↗
              </a>
            )}
          </h3>
          <p className="mt-4 max-w-[64ch] leading-relaxed text-muted">
            {project.summary}
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {project.bullets.map((bullet) => (
              <li
                key={bullet}
                className="border-l border-line pl-4 text-sm leading-relaxed text-ink"
              >
                {bullet}
              </li>
            ))}
          </ul>
          {project.tech && (
            <div className="mt-6">
              <TechLine label={techLabel} items={project.tech} />
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function SignageProject({
  project,
  focusLabel,
}: {
  project: ProjectEntry;
  focusLabel: string;
}) {
  return (
    <Reveal>
      <article className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
        <div className="flex flex-row items-baseline justify-between gap-2 md:col-span-3 md:flex-col md:items-start md:justify-start md:gap-4">
          <p className="font-mono text-xs text-accent-strong">{project.index}</p>
          <div className="text-right md:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
              {project.tag}
            </p>
            <p className="mt-1 font-mono text-xs text-faint">{project.period}</p>
          </div>
        </div>

        <div className="md:col-span-6">
          <h3 className="font-serif text-2xl font-medium tracking-tight text-ink md:text-3xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-[58ch] leading-relaxed text-muted">
            {project.summary}
          </p>
          <ul className="mt-6 space-y-2">
            {project.bullets.map((bullet) => (
              <li
                key={bullet}
                className="border-l border-line pl-4 text-sm leading-relaxed text-ink"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {project.focus && (
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
              {focusLabel}
            </p>
            <ul className="mt-3 space-y-1.5 font-mono text-xs leading-relaxed text-muted">
              {project.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </Reveal>
  );
}

function AspowerProject({ project }: { project: ProjectEntry }) {
  return (
    <Reveal>
      <article className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
        <div className="flex flex-row items-baseline justify-between gap-2 md:col-span-3 md:flex-col md:items-start md:justify-start md:gap-4">
          <p className="font-mono text-xs text-accent-strong">{project.index}</p>
          <div className="text-right md:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
              {project.tag}
            </p>
            <p className="mt-1 font-mono text-xs text-faint">{project.period}</p>
          </div>
        </div>

        <div className="md:col-span-9">
          <h3 className="font-serif text-2xl font-medium tracking-tight text-ink md:text-3xl">
            {project.name}
          </h3>
          <p className="mt-4 max-w-[64ch] leading-relaxed text-muted">
            {project.summary}
          </p>
          <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {project.subItems?.map((item) => (
              <div key={item.label} className="border-l border-line pl-4">
                <dt className="text-sm font-medium text-ink">{item.label}</dt>
                <dd className="mt-1 font-mono text-xs leading-relaxed text-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </Reveal>
  );
}

export default function Work({ content }: { content: SiteContent }) {
  const { work } = content;
  const [menurevo, techsimum, signage, aspower] = work.projects;

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20 md:pb-28">
      <SectionHeader index="01" kicker={work.kicker} heading={work.heading} />
      <Reveal>
        <p className="mt-8 max-w-[62ch] leading-relaxed text-muted md:ml-[26%]">
          {work.intro}
        </p>
      </Reveal>
      <div className="mt-10">
        <FeatureProject project={menurevo} techLabel={work.techLabel} />
        <FeatureProject project={techsimum} techLabel={work.techLabel} />
        <SignageProject project={signage} focusLabel={work.focusLabel} />
        <AspowerProject project={aspower} />
      </div>
    </section>
  );
}
