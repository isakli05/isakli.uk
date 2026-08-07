"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: "4rem 1.5rem",
          maxWidth: "40rem",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 500 }}>
          Something went wrong / Bir hata oluştu
        </h1>
        <p style={{ marginTop: "1rem" }}>
          {/* plain anchor: full navigation must work even when the client router has crashed */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">isakli.uk</a>
          {" · "}
          <button onClick={reset} style={{ textDecoration: "underline" }}>
            Try again / Tekrar deneyin
          </button>
        </p>
      </body>
    </html>
  );
}
