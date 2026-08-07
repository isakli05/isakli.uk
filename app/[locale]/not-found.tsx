import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-strong">
        404
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight">
        Page not found / Sayfa bulunamadı
      </h1>
      <p className="mt-6">
        <Link href="/" className="link-underline text-muted hover:text-ink">
          isakli.uk
        </Link>
      </p>
    </div>
  );
}
