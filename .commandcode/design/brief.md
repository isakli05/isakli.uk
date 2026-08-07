# Design Brief — isakli.uk

## Invariants

- **Name**: İsa Kaya
- **Category**: personal portfolio / professional profile of a Full Stack Developer
- **User**: technical recruiters, engineering managers, founders, CTOs hiring remote developers; scanning fast (10–20 s to orientation)
- **Job**: believe + decide — understand who he is, what he builds, verify real shipped products, reach contact/CV quickly
- **Artifact**: the shipped products — MenuRevo, Techsimum, MaPos Digital Signage, ASPOWER engineering work — plus a precise experience timeline
- **Evidence**: named products with live domains, factual role descriptions from the CV, a coherent stack story, no invented metrics
- **Drift to refuse**: generic dark dev-portfolio, gradient blobs, mono-everywhere "hacker" reflex, card-grid monotony, fake terminals, typing animations, logo clouds, percentage skill bars

## Register & lane

Brand register (voice). Lane: **editorial engineering** — a well-set engineering journal page: precise rules, numbered sections, monospace metadata, generous whitespace, hairline dividers. Rigor over decoration.

## Typography

IBM Plex superfamily (engineering heritage, covers TR diacritics via latin-ext):

- Display/headlines: IBM Plex Serif 500–600
- Body/UI: IBM Plex Sans 400–500
- Metadata/labels/tech lists/section numbers: IBM Plex Mono 400–500, uppercase micro-labels with tracking

Hierarchy: mono kicker → serif display → sans bridge → sans body. Measure 60–72ch.

## Color

Whisper level. Warm paper neutrals tinted toward the accent hue; one controlled accent used <10%.

- Light: paper `#FAF8F5`, ink `#1C1917`, muted `#6F6960`, hairline `#E4DFD6`, accent vermilion `#C2410C` (international-orange family — engineering drawing / instrumentation provenance)
- Dark: surface `#16130F`, ink `#EDE7DE`, muted `#A39B90`, hairline `#2C2721`, accent `#E05938`
- Accent jobs: section numbers, link underlines on hover, focus rings, key rules, active nav. Never fills large areas.

## Grid & composition

- Max content width 1152px (6xl), 12-col mental grid, 1-4-9 spacing rhythm
- Section label sits in a left margin column on desktop (mono, index + name); content occupies the main measure
- Hero: asymmetric two-column — type block left, portrait right with hairline frame + mono caption; stack on mobile
- Selected Work: full-width editorial rows separated by hairlines, varying composition (feature rows for MenuRevo/Techsimum, compact rows for MaPos/ASPOWER) — never identical cards
- Experience: table-like timeline, mono dates column
- Cliffhanger principle between sections; squint test: name → work → contact

## Imagery

One decisive portrait (isakaya11.jpeg): rectangle, hairline frame, grayscale that settles to full color on hover/focus, mono caption. AVIF/WebP responsive sources. No stock imagery.

## Motion

Minimal and purposeful: single reveal (opacity + 12px rise, ~500ms ease-out, stagger ≤40ms) via IntersectionObserver; link underline transitions; theme cross-fade. `prefers-reduced-motion` disables all. No scroll-jacking, no parallax.

## Dark mode

Class strategy, system preference default, localStorage persist, no-FOUC inline script. Warm near-black (not pure black), contrast-verified.

## Anti-scope

No database, auth, CMS, animation framework, icon library, shadcn/ui. Minimal client JS: theme toggle + reveal observer only.
