# Visual redesign: from "filed ESG document" to "delivery systems"

The content now says implementation and delivery, but the visual system still says sustainability audit: green ink, paper-cream surface, cartographic contours, compass, seals, § marks. A tech recruiter reads that as environmental consulting before reading a word. This redesign keeps the precision and restraint (that is what makes the page look senior) and swaps the metaphor from *filed document* to *systems and delivery*.

## Direction: "Blueprint / Console"

Precise, engineered, neutral. Mono still carries the structure, but the surface reads like technical documentation and delivery tooling rather than an audit binder.

### 1. Color

Move off green-on-cream to a neutral graphite base with one cool accent.

- Surface: near-white cool grey (`#F7F8F8`) instead of the warm `#FAFAF7` paper
- Ink: graphite near-black (`#16181B`) instead of forest green `#1A3427`
- Accent: single cool signal color for links, active states, seals — a restrained slate blue (`#2F5FA8`) or, if you prefer to keep a green thread as a nod to the domain, a desaturated teal (`#1E6E68`)
- Hairlines: cool grey `#E1E3E4`; secondary/muted text in cool greys
- Optional dark mode for the Contact band stays, now graphite rather than green

All values become oklch tokens in `src/styles.css` — no hardcoded colors in components.

### 2. Typography

- Headings: swap **Clash Display** (fashion/editorial flavor) for a technical grotesk — **Space Grotesk** — which reads engineered rather than boutique
- Body: keep **Manrope**; it is neutral and legible
- Mono: keep **IBM Plex Mono** for labels, IDs, stats, chips — this is the strongest asset on the page
- Tighten the type scale: bigger hero statement, one clear step down for section headings, tighter smallcaps labels

### 3. Graphics and motifs

Retire the cartography layer; replace with a build/systems layer.

- Remove the contour-line background and the decorative map SVGs
- Replace with a faint technical grid (blueprint dot/line grid) at very low opacity — same "quiet texture," different genre
- `§` section marks become numbered mono tags (`01 / CAPABILITIES`) — reads like documentation sections, not legal clauses
- Case-study "seals" become status pills (`DELIVERED`) in mono
- Compass: replace the 3D compass mark with a small 3D **isometric module/node** mark in the same slot — same interaction (pointer tilt, idle drift), new metaphor: a stacked block or connected-node cube. Same three.js component, new geometry.

### 4. Layout adjustments

- Hero: keep the two-column split, but relabel the cover sheet as a compact **spec panel** (Role / Based in / Languages / Open to / Status) with mono keys and left hairline rule
- Capabilities: three columns get a numbered index and a thin top rule each, so they read like a delivery framework
- Selected Implementations: add a left rail with the ID and year so entries scan like tickets in a delivery log; keep the expand/collapse mechanic exactly as is
- Expertise: keep the Core / Domain depth split, but visually downweight Domain depth (smaller chips, muted) to reinforce it as proof rather than identity

## What stays

- All copy and positioning from the previous pass
- Section order, expand/collapse interaction, contact band inversion
- Mono-label discipline and generous whitespace

## Technical notes

- `src/styles.css`: replace the Ledger Line palette tokens with the new graphite/accent oklch tokens; swap `contour-bg` for a `grid-bg` utility
- `src/routes/__root.tsx`: swap the Fontshare Clash Display link for Space Grotesk via Google Fonts; update `--font-display`
- `src/routes/index.tsx`: remove contour/map SVGs, update section marks, spec panel, atlas rail, chip weights
- `src/components/Compass3D.tsx`: replace with `Mark3D.tsx` rendering the isometric module geometry (same lifecycle, lighting, and cleanup code)

No new dependencies, no backend changes.

## One decision for you

Accent color: **slate blue** (fully industry-neutral) or **desaturated teal** (neutral, but keeps a quiet thread to the sustainability work). I will use slate blue unless you say otherwise.
