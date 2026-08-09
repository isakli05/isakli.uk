# isakli.uk

Personal portfolio of **İsa Kaya — Full Stack Developer** (React / Next.js, SaaS, POS & Digital Signage).

Production: **https://isakli.uk** (English) · **https://isakli.uk/tr** (Türkçe)

## Stack

- Next.js 16 (App Router, static prerendering) · React 19 · TypeScript (strict)
- Tailwind CSS 4 · IBM Plex Sans / Serif / Mono (self-hosted via `next/font`)
- Bilingual: English at `/`, Turkish at `/tr` (route-group root layouts, hreflang, per-locale metadata)
- Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`
- Playwright for visual/functional audits

## Development

```bash
npm install          # use NODE_ENV=development if your shell exports NODE_ENV=production
npm run dev          # local dev server
npm run lint         # ESLint
npm run build        # production build (next build)
npm run start        # serve the production build
```

## Visual audit

```bash
npm run build && npm run start -- -p 3100
node scripts/visual-audit.mjs http://localhost:3100 /tmp/audit   # multi-viewport checks + screenshots
node scripts/shots.mjs http://localhost:3100 /tmp/shots both     # per-section screenshots
```

## Deployment

```bash
npm run deploy       # opennextjs-cloudflare build + deploy (requires `wrangler login`)
```

- Worker: `isakli-uk` — config in `wrangler.jsonc`, OpenNext config in `open-next.config.ts`
- Custom domains `isakli.uk` and `www.isakli.uk` are attached to the Worker; `www` 308-redirects to the apex via Edge Middleware (`middleware.ts`, retained for OpenNext compatibility)
- The zone must be active in the same Cloudflare account; Wrangler manages the custom-domain DNS records

## Structure

```
app/[locale]/        locale route tree (en, tr) — layout with metadata, home page
components/          header, footer, portrait, reveal, theme toggle, mobile menu
components/sections/ hero, work, experience, capabilities, about, contact
lib/content.ts       typed EN/TR content (CV is the source of truth)
lib/locales.ts       locale helpers, site URL, external links
public/portrait/     responsive AVIF/WebP/JPEG portraits
public/cv/           downloadable CVs (EN/TR PDF)
scripts/             Playwright audit and screenshot tools
```
