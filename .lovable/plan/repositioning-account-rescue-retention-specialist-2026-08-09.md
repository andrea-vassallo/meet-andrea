# Repositioning: Account Rescue & Retention Specialist

## Note on the current page

Your brief references a few elements this page doesn't have: an "Impact dashboard" with 150+ clients / 100% escalation resolution / €200K contract value / 5 years, filter pills, an H1 reading "I bridge the gap between what gets sold and what clients actually experience", and a Routeflow 5-card timeline. What exists today is:

- H1: "Andrea Vassallo" with a mono subtitle line
- Stats row (5+ years, 50+ clients, 300+ assessments, >90% satisfaction) inside the "02 / What I do" section
- Case studies as an expandable list (Manufacturing, Food & Beverage, Energy)
- Skills already exist as data (core + domain) rendered in the Expertise section

The plan below maps your intent onto the real page. Where your brief names a figure or a headline that isn't here, I keep the existing content unless you tell me the new numbers.

## Changes

### 1. Positioning label (hero)
Replace the mono subtitle under the name with:
`Implementation Consultant — Account Rescue, Retention & Expansion · Barcelona`

Rewrite the hero paragraph to lead with rescuing at-risk accounts and turning them into retained/expanded ones, with sustainability tech named only as where it was proven. Update "Discipline" in the spec sheet to match. Name (H1) untouched.

### 2. Stats row
Left exactly as is, moved so it reads as an at-a-glance band directly under the hero statement rather than buried at the bottom of the capabilities block.

### 3. New "Method" section (right after the stats, before case studies)
Three compact, sector-agnostic steps — lighter treatment than the case list (short label + one line each, no expand):

1. **Diagnostic signals** — usage drop-off, recurring escalations, a client going quiet, gap between what was sold and what is being delivered.
2. **Intervention** — map the client's business priorities, drive adoption where usage stalled, bridge client and technical teams, rebuild stakeholder trust.
3. **Outcome** — retention, expansion, improved health score, churn risk converted into signed contract.

No ESG language in this section.

### 4. Case studies moved down and reframed
The case section moves below Method. New heading above the list: **"In-depth example: sustainability tech sector"**, with a one-line note that this is one vertical, not the whole picture. Card internals (numbered entry, click-to-expand, chips revealed on expand) unchanged. The three case entries themselves are untouched.

Structured so a second sector block can be added later and the heading flipped to plural without refactoring.

### 5. Skills tag row
A compact muted pill row placed under the stats band: Project Management, Stakeholder Management, Implementation, Requirements Gathering, Data Modelling, SaaS Configuration, Process Automation, plus the domain tags kept visually secondary. Small mono text, low contrast, non-interactive — subordinate to Method and the headline.

### 6. Section numbering and metadata
Renumber sections after the reorder (01 Statement, 02 Method, 03 In-depth example, then About / Expertise / Contact) and update the page title and meta description to lead with account rescue, retention and expansion rather than SaaS implementation alone.

## Technical notes
All work is in `src/routes/index.tsx` (copy, a new `Method` section component, a `SkillTags` row, reordered section calls in `Index`) plus the meta constants at the top of that file. No new dependencies, no backend, no styling-token changes — the Method and tag row reuse existing `smallcaps`, hairline and mono utilities.

## Open question
If the numbers in your brief (150+ clients, 100% escalation resolution, €200K contract value) are the real ones you want shown, say so and I'll swap the stats band to those instead of the current four.
