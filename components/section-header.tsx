export default function SectionHeader({
  index,
  kicker,
  heading,
}: {
  index: string;
  kicker: string;
  heading: string;
}) {
  return (
    <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
      <p className="font-mono text-xs uppercase tracking-[0.14em] md:col-span-3">
        <span className="text-accent-strong">{index}</span>
        <span className="text-faint"> — </span>
        <span className="text-muted">{kicker}</span>
      </p>
      <h2 className="max-w-[22ch] font-serif text-3xl font-medium leading-tight tracking-tight text-ink md:col-span-9 md:text-4xl">
        {heading}
      </h2>
    </div>
  );
}
