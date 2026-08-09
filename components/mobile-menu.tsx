"use client";

import { useEffect, useRef } from "react";

export default function MobileMenu({
  label,
  navLabel,
  items,
}: {
  label: string;
  navLabel: string;
  items: { label: string; href: string }[];
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => ref.current?.removeAttribute("open");

  useEffect(() => {
    const details = ref.current;
    if (!details) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        event.preventDefault();
        details.removeAttribute("open");
        details.querySelector("summary")?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        details.open &&
        event.target instanceof Node &&
        !details.contains(event.target)
      ) {
        details.removeAttribute("open");
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <details ref={ref} className="group relative md:hidden">
      <summary
        aria-label={label}
        className="flex h-9 cursor-pointer items-center rounded-sm border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-ink hover:text-ink"
      >
        {label}
      </summary>
      <nav
        aria-label={navLabel}
        className="absolute right-0 top-12 flex w-44 flex-col border border-line bg-paper py-2 shadow-sm"
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="px-4 py-2.5 text-sm text-muted transition-colors hover:bg-paper-raised hover:text-ink"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
