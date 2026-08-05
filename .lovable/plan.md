# Repositioning: from ESG specialist to tech implementation & delivery

The page currently reads as an ESG portfolio with a filing/cartographer metaphor. A Barcelona tech recruiter scanning it for 10 seconds sees "sustainability analyst," not "implementation consultant / project manager." The fix is mostly content and hierarchy — the Ledger Line visual system stays, because it already reads as precise, senior, and non-generic.

## What changes

### 1. Headline and positioning (§01)
Lead with the transferable role, not the vertical.

- Kicker: `Implementation Consultant · Project Delivery · Barcelona`
- Statement rewritten to name the capability first, the domain second: implementing enterprise SaaS and data platforms end-to-end — scoping, stakeholder alignment, data modelling, rollout — with sustainability data as the domain where that was proven.
- Cover sheet rows updated: Discipline becomes `Enterprise SaaS implementation · Delivery`, add `Open to` row (`Tech, fintech, supply chain, climate`), keep Location / Languages / Status.

### 2. New section: Capabilities (§02, replaces the current Track Record position)
Three columns naming the job a recruiter is hiring for, each with one line of evidence:

- **Implementation & Rollout** — configuring and launching enterprise platforms for EMEA accounts.
- **Project & Stakeholder Management** — running programs across executives and IC teams, on deadline-driven regulatory timelines.
- **Data & Systems** — data modelling, source mapping, automated pipelines, audit-ready structures.

Stats move into a compact strip under this section, reframed so they're not all ESG: years in tech/consulting, clients served, accounts delivered, satisfaction.

### 3. Atlas → "Selected Implementations" (§03)
Same expandable card mechanic, but each entry is retitled by *what was delivered*, with industry as metadata rather than headline. Add a `Delivered` line per entry (e.g. "Module rollout, executive stakeholder alignment, disclosure workflow"), and a `Tools & Methods` chip row. Framework chips (CSRD, GHG Protocol) stay — they demonstrate rigor — but sit alongside delivery chips.

Intro copy reframed: field notes on how complex data requirements become working systems, across regulated industries.

### 4. About (§04)
Rewrite role notes so the verbs are delivery verbs (lead delivery, run discovery, align stakeholders, ship) and the domain is context. Add a short closing line making mobility explicit: the work travels — the same delivery pattern applies wherever compliance-grade data and enterprise systems meet.

### 5. Expertise (§05) — two tiers
Split the flat tag list into:

- **Core** — implementation, project management, stakeholder management, data modelling, requirements gathering, SaaS configuration, process automation.
- **Domain depth** — ESG reporting, carbon accounting, supply chain sustainability, EcoVadis, CSRD/GRI/GHG Protocol.

This is the single clearest signal that ESG is a proof point rather than the whole identity.

### 6. Contact (§06)
Subline updated to invite non-ESG conversations explicitly: implementation, delivery, or data roles in Barcelona and remote-EU.

### 7. SEO
Route `head()` title/description updated to lead with "Implementation Consultant & Project Manager · Barcelona" with sustainability data as a secondary phrase.

## What stays

- Ledger Line palette, typography, hairlines, section marks, cover sheet, seals, 3D compass in the top bar.
- The expandable case-study interaction.
- All factual claims (employers, years, metrics) — only framing changes.

## Technical notes

All edits are in `src/routes/index.tsx` (data arrays + section components + `head()`); one new small `Capabilities` section component. No new dependencies, no backend, no styling-token changes.
