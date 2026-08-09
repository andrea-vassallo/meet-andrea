import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";


const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/389c451f-b211-444c-9754-0080fbddbaf6/id-preview-a7cda95f--8a706a7c-1838-498a-b824-5980252f6a15.lovable.app-1785353203641.png";

const TITLE =
  "Andrea Vassallo — Account Rescue, Retention & Expansion, Barcelona";
const DESCRIPTION =
  "Implementation consultant in Barcelona specialising in account rescue, retention and expansion — spotting at-risk accounts, driving adoption, and turning churn risk into signed contracts.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
});

const EMAIL = "andreamaria.vassallo@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/andreamariavassallo/";

type AtlasEntry = {
  id: string;
  filed: string;
  industry: string;
  chips: string[];
  client: string;
  project: string;
  delivered: string;
  description: string;
};

const atlas: AtlasEntry[] = [
  {
    id: "MFG-01",
    filed: "2025",
    industry: "Manufacturing",
    chips: ["Module rollout", "Executive stakeholders", "CSRD · GRI"],
    client: "US-based industrial manufacturer, $100M+ revenue",
    project:
      "Rolled out a new reporting module across a regulated, deadline-driven disclosure program.",
    delivered:
      "Requirements gathering · Module configuration · Executive alignment · Disclosure workflow",
    description:
      "Co-led the implementation of a non-financial reporting module, working directly with senior executives and individual contributors as stakeholders. Ran discovery, translated regulatory requirements into system configuration, and shipped against a fixed compliance deadline.",
  },
  {
    id: "F&B-02",
    filed: "2024",
    industry: "Food & Beverage",
    chips: ["Data governance", "Value-chain modelling", "GHG Protocol"],
    client: "$500M+ revenue manufacturer of bakery products",
    project:
      "Built data governance across a fragmented, multi-tier value chain.",
    delivered:
      "Data model design · Supplier data collection · Methodology application · Client enablement",
    description:
      "Designed how value-chain data was collected, structured, and validated, then applied a standardised calculation methodology across it. The output was a repeatable process the client's own team could run without me.",
  },
  {
    id: "ENR-03",
    filed: "2024",
    industry: "Energy",
    chips: ["Pipeline automation", "Source mapping", "Audit-ready"],
    client: "Large European energy utility, €60B+ revenue",
    project:
      "Turned scattered operational data into an automated, audit-ready structure.",
    delivered:
      "Source system mapping · Categorisation logic · Automated data pipelines · QA",
    description:
      "Mapped heterogeneous source data into a single categorisation model and built predictable, automated pipelines to replace manual consolidation — cutting reporting effort and making the numbers defensible under audit.",
  },
];

const method = [
  {
    title: "Diagnostic signals",
    note: "Usage drop-off, recurring escalations, a client that has gone quiet, and any gap between what was sold and what is actually being delivered.",
  },
  {
    title: "Intervention",
    note: "Map the client's business priorities, drive adoption where usage has stalled, bridge client and technical teams, and rebuild trust with the stakeholders who matter.",
  },
  {
    title: "Outcome",
    note: "Retention secured, account expanded, health score recovered — churn risk converted into a signed contract.",
  },
];

const stats = [
  { label: "Years in Tech & Consulting", value: "5+" },
  { label: "Clients Served", value: "50+" },
  { label: "Assessments Delivered", value: "300+" },
  { label: "Client Satisfaction", value: ">90%" },
];

const coreSkills = [
  "Project management",
  "Stakeholder management",
  "Implementation",
  "Requirements gathering",
  "Data modelling",
  "SaaS configuration",
  "Process automation",
];

const domainSkills = [
  "ESG reporting",
  "Carbon accounting",
  "Supply chain data",
  "EcoVadis",
  "CSRD · GRI · GHG Protocol",
];

const tagSkills = [...coreSkills, "Adoption & enablement", "Escalation management"];

function Index() {
  return (
    <main className="relative min-h-screen grid-bg">
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <TopBar />
        <Hero />
        <StatsBand />
        <Method />
        <Atlas />
        <About />
        <Expertise />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

/* ---------- Decorative layer ---------- */

function ModuleMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 8.5h7.5v7.5M26 23.5h-7.5V16"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M13.5 12.25 16 14.75l2.5-2.5M18.5 19.75 16 17.25l-2.5 2.5"
        stroke="var(--accent-ink)"
        strokeWidth="2.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M6 23.5v-7.5h7.5M26 8.5V16h-7.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.38"
      />
    </svg>
  );
}

/* ---------- Sections ---------- */

function TopBar() {
  return (
    <header className="flex items-center justify-between pt-8 pb-6">
      <div className="flex items-center gap-3">
        <ModuleMark className="h-8 w-8 text-[color:var(--ink)]" />
        <span className="smallcaps">Andrea Vassallo · Portfolio</span>
      </div>
      <span className="smallcaps hidden sm:block">
        Barcelona, ES · Available 2026
      </span>
    </header>
  );
}

function Hero() {
  const meta = [
    ["Ref.", "AV / PORTFOLIO / 001"],
    ["Discipline", "Account rescue · Retention · Expansion"],
    ["Based", "Barcelona, ES · Remote-EU"],
    ["Open to", "Tech · Fintech · Supply chain · Climate"],
    ["Languages", "EN · IT · ES"],
    ["Status", "Open to conversations"],
  ];
  return (
    <section className="hairline pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">01 / STATEMENT</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
        <span className="smallcaps">Rev. 2026.08</span>
      </div>

      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_280px] md:gap-16">
        <div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] text-[color:var(--ink)]">
            Andrea Vassallo
          </h1>
          <p className="font-mono text-sm mt-3 text-[color:var(--accent-ink)] uppercase tracking-[0.18em]">
            Implementation Consultant — Account Rescue, Retention &amp;
            Expansion · Barcelona
          </p>

          <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--secondary-ink)]">
            I take on accounts that are drifting — stalled adoption, escalations
            piling up, a client questioning the renewal — and turn them back
            into retained, expanding relationships. I proved that pattern in
            sustainability tech, where the deadlines are legal and the numbers
            have to survive an audit, but the work travels to any vertical.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <CTA href={LINKEDIN} label="LinkedIn" external primary />
            <CTA href={`mailto:${EMAIL}`} label="Email" />
          </div>
        </div>

        {/* Spec panel */}
        <aside className="md:border-l md:border-[color:var(--hairline)] md:pl-8 md:pt-2">
          <div className="smallcaps mb-5">Spec sheet</div>
          <dl className="space-y-4">
            {meta.map(([k, v]) => (
              <div key={k} className="border-b border-[color:var(--hairline)] pb-3">
                <dt className="smallcaps">{k}</dt>
                <dd className="font-mono text-[0.78rem] leading-snug mt-1.5 text-[color:var(--ink)]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}


function CTA({
  href,
  label,
  external,
  primary,
}: {
  href: string;
  label: string;
  external?: boolean;
  primary?: boolean;
}) {
  const base =
    "group inline-flex items-center gap-3 px-5 py-3 text-sm font-mono uppercase tracking-[0.14em] transition-colors";
  const cls = primary
    ? `${base} bg-[color:var(--ink)] text-[color:var(--surface)] hover:bg-[color:var(--accent-ink)]`
    : `${base} border border-[color:var(--ink)] text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-[color:var(--surface)]`;
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span>{label}</span>
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

function StatsBand() {
  return (
    <section className="hairline py-14 md:py-16">
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="smallcaps mb-3">{s.label}</dt>
            <dd className="font-mono text-[color:var(--ink)] text-3xl md:text-4xl leading-none">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-10 flex flex-wrap gap-2 border-t border-[color:var(--hairline)] pt-6">
        {tagSkills.map((skill) => (
          <li
            key={skill}
            className="font-mono text-[0.62rem] uppercase tracking-[0.16em] px-2 py-1 border border-[color:var(--hairline)] text-[color:var(--muted-ink)]"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Method() {
  return (
    <section className="hairline py-20 md:py-28">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">02 / METHOD</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
        <span className="smallcaps hidden sm:block">How I work</span>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {method.map((m, i) => (
          <div key={m.title} className="border-t border-[color:var(--ink)] pt-4">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--muted-ink)] mb-2">
              Step {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-[color:var(--ink)]">
              {m.title}
            </h3>
            <p className="mt-3 text-sm md:text-base text-[color:var(--secondary-ink)] leading-relaxed">
              {m.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Atlas() {
  const [open, setOpen] = useState<string | null>("MFG-01");
  return (
    <section className="hairline py-20 md:py-28">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">03 / SELECTED IMPLEMENTATIONS</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-8 md:items-end mb-14">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-[color:var(--ink)] leading-tight">
            How complex data requirements become working systems.
          </h2>
          <p className="mt-5 max-w-xl text-[color:var(--secondary-ink)] leading-relaxed">
            Field notes from delivery work across regulated industries —
            manufacturing, food &amp; beverage, energy. Different sectors, same
            pattern: messy requirements in, a system people actually use out.
          </p>
        </div>
        <div className="font-mono text-xs text-[color:var(--muted-ink)] uppercase tracking-widest">
          <div>Entries · 03</div>
          <div>Last updated · 2025</div>
        </div>
      </div>

      <ul className="border-t border-[color:var(--hairline)]">
        {atlas.map((entry, i) => (
          <AtlasCard
            key={entry.id}
            entry={entry}
            index={i + 1}
            isOpen={open === entry.id}
            onToggle={() => setOpen(open === entry.id ? null : entry.id)}
          />
        ))}
      </ul>
    </section>
  );
}

function AtlasCard({
  entry,
  index,
  isOpen,
  onToggle,
}: {
  entry: AtlasEntry;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="border-b border-[color:var(--hairline)]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left py-8 md:py-10 grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-start group"
      >
        <Seal open={isOpen} />

        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
              № {String(index).padStart(2, "0")} · {entry.id} · {entry.industry}
            </span>
          </div>

          <p className="text-[color:var(--ink)] text-lg md:text-xl leading-snug max-w-2xl">
            {entry.project}
          </p>
          <p className="mt-3 text-[color:var(--secondary-ink)] text-sm md:text-base">
            {entry.client}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {entry.chips.map((chip) => (
              <span
                key={chip}
                className="font-mono text-[0.65rem] uppercase tracking-[0.16em] px-2 py-1 border border-[color:var(--hairline)] text-[color:var(--ink)]"
              >
                {chip}
              </span>
            ))}
          </div>

          <span className="md:hidden mt-4 inline-flex items-center gap-2 border border-[color:var(--hairline)] px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--accent-ink)]">
            {isOpen ? "Collapse" : "Expand"}
            <span aria-hidden>{isOpen ? "−" : "+"}</span>
          </span>


          <div
            className={`grid transition-all duration-500 ease-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100 mt-6"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-l-2 border-[color:var(--accent-ink)] pl-5 max-w-2xl">
                <div className="smallcaps mb-2">Delivered</div>
                <p className="font-mono text-[0.78rem] leading-relaxed text-[color:var(--ink)]">
                  {entry.delivered}
                </p>
                <div className="smallcaps mt-5 mb-2">My role</div>
                <p className="text-[color:var(--secondary-ink)] leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--muted-ink)] pt-1">
          <span>Shipped · {entry.filed}</span>
          <span
            className={`inline-flex items-center gap-2 border px-2 py-1 transition-colors ${
              isOpen
                ? "border-[color:var(--accent-ink)] text-[color:var(--accent-ink)]"
                : "border-[color:var(--hairline)] text-[color:var(--ink)] group-hover:border-[color:var(--accent-ink)] group-hover:text-[color:var(--accent-ink)]"
            }`}
          >
            {isOpen ? "Collapse" : "Expand"}
            <span aria-hidden>{isOpen ? "−" : "+"}</span>
          </span>
        </div>

      </button>
    </li>
  );
}

function Seal({ open }: { open: boolean }) {
  return (
    <div className="shrink-0 pt-1">
      <span
        className={`inline-flex items-center gap-2 border px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-colors ${
          open
            ? "bg-[color:var(--accent-ink)] border-[color:var(--accent-ink)] text-[color:var(--surface)]"
            : "border-[color:var(--hairline)] text-[color:var(--muted-ink)]"
        }`}
      >
        <span
          aria-hidden
          className={`h-1.5 w-1.5 ${
            open
              ? "bg-[color:var(--surface)]"
              : "bg-[color:var(--accent-ink)]"
          }`}
        />
        Delivered
      </span>
    </div>
  );
}


function About() {
  const roles = [
    {
      company: "Sphera",
      role: "Implementation Consultant",
      period: "2025 – Present",
      note: "Lead delivery of enterprise data solutions for EMEA accounts: run discovery, translate requirements into configuration, align stakeholders, and ship to go-live.",
    },
    {
      company: "EcoVadis",
      role: "Senior Analyst → Analyst",
      period: "2022 – 2025",
      note: "Owned client-facing analysis engagements at scale across the EMEA market, working to strict quality standards and turnaround times.",
    },
    {
      company: "Merck · Impaakt",
      role: "Early career",
      period: "2019 – 2022",
      note: "Tender management in life sciences and data-driven analysis for finance — first exposure to enterprise processes and structured evaluation frameworks.",
    },
  ];
  return (
    <section className="hairline py-20 md:py-28">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">04 / ABOUT</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
      </div>

      <p className="max-w-2xl text-xl md:text-2xl leading-relaxed text-[color:var(--ink)] font-display font-medium">
        Five-plus years in tech and consulting, spent turning complex
        requirements into implementations that actually work.
      </p>

      <div className="mt-16 grid gap-0">
        {roles.map((r) => (
          <div
            key={r.company}
            className="grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-4 md:gap-8 py-8 border-t border-[color:var(--hairline)]"
          >
            <div>
              <div className="font-display text-2xl text-[color:var(--ink)]">
                {r.company}
              </div>
              <div className="smallcaps mt-1">{r.role}</div>
            </div>
            <p className="text-[color:var(--secondary-ink)] leading-relaxed max-w-xl">
              {r.note}
            </p>
            <div className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted-ink)] md:text-right">
              {r.period}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-[color:var(--secondary-ink)] leading-relaxed border-l-2 border-[color:var(--accent-ink)] pl-5">
        The work travels. The same delivery pattern applies wherever
        enterprise systems meet data that has to be right — finance, supply
        chain, operations, climate.
      </p>
    </section>
  );
}

function Expertise() {
  return (
    <section className="hairline py-20 md:py-28">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">05 / EXPERTISE</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <div className="smallcaps mb-5">Core — transferable</div>
          <ul className="flex flex-wrap gap-3">
            {coreSkills.map((e) => (
              <li
                key={e}
                className="px-4 py-2 border border-[color:var(--ink)] text-sm text-[color:var(--ink)] font-mono uppercase tracking-[0.12em] hover:bg-[color:var(--ink)] hover:text-[color:var(--surface)] transition-colors"
              >
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="smallcaps mb-5">Domain depth — sustainability data</div>
          <ul className="flex flex-wrap gap-3">
            {domainSkills.map((e) => (
              <li
                key={e}
                className="px-3 py-1.5 border border-[color:var(--hairline)] text-xs text-[color:var(--muted-ink)] font-mono uppercase tracking-[0.12em]"
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 smallcaps border-t border-[color:var(--hairline)] pt-6">
        <span>Languages · English</span>
        <span>Italiano</span>
        <span>Español</span>
        <span className="text-[color:var(--accent-ink)]">Based · Barcelona 41.38°N 2.17°E</span>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="hairline py-20 md:py-28">
      <div className="relative overflow-hidden bg-[color:var(--ink)] text-[color:var(--surface)] px-6 py-16 md:px-14 md:py-20">
        <div className="relative">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[color:var(--surface)]/60">
              06 / CONTACT
            </span>
            <span className="h-px flex-1 bg-[color:var(--surface)]/25" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[1]">
            Let's connect.
          </h2>
          <p className="mt-6 max-w-lg text-[color:var(--surface)]/70 text-lg">
            Open to implementation, delivery, and project management roles in
            Barcelona and remote-EU — any vertical where systems and data have
            to work together.
          </p>

          <div className="mt-12 grid gap-5 max-w-xl">
            <ContactLine label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            <ContactLine
              label="LinkedIn"
              value="andreamariavassallo"
              href={LINKEDIN}
              external
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLine({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group grid grid-cols-[5.5rem_1fr_1.5rem] items-baseline gap-4 border-b border-[color:var(--surface)]/20 pb-3 hover:border-[color:var(--surface)]/60 transition-colors"
    >
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[color:var(--surface)]/55">
        {label}
      </span>
      <span className="font-mono text-sm md:text-base break-all text-[color:var(--surface)]">
        {value}
      </span>
      <span
        aria-hidden
        className="justify-self-end text-[color:var(--surface)]/70 transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}


function Footer() {
  return (
    <footer className="hairline py-10 flex flex-wrap items-center justify-between gap-4">
      <span className="smallcaps">© {new Date().getFullYear()} · Andrea Vassallo</span>
      <span className="smallcaps">End of document · 06 / 06</span>
    </footer>
  );
}
