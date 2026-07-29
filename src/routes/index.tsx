import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const EMAIL = "andreamaria.vassallo@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/andreamariavassallo/";

type AtlasEntry = {
  id: string;
  filed: string;
  industry: string;
  framework: string;
  client: string;
  project: string;
  description: string;
};

const atlas: AtlasEntry[] = [
  {
    id: "MFG-01",
    filed: "2025",
    industry: "Manufacturing",
    framework: "CSRD · GRI",
    client: "US-based industrial manufacturer, $100M+ revenue",
    project:
      "Reduce ESG regulatory risk exposure ahead of CSRD disclosure deadlines.",
    description:
      "Co-led a program to implement a CSRD and GRI-aligned non-financial reporting module, working directly with senior executives and individual contributors as stakeholders on the client's disclosure process.",
  },
  {
    id: "F&B-02",
    filed: "2024",
    industry: "Food & Beverage",
    framework: "GHG Protocol · Scope 3",
    client: "$500M+ revenue manufacturer of bakery products",
    project: "Strengthen Scope 3 data governance.",
    description:
      "Helped the client apply the GHG Protocol Standard to calculate and assess Scope 3 emissions across their entire value chain.",
  },
  {
    id: "ENR-03",
    filed: "2024",
    industry: "Energy",
    framework: "Emission factor mapping",
    client: "Large European energy utility, €60B+ revenue",
    project: "Turn scattered emissions data into an audit-ready structure.",
    description:
      "Mapped carbon emissions from purchased and sold energy using emission factor mapping and categorization of source data, and built predictable, automated data pipelines.",
  },
];

const stats = [
  { label: "ESG Screenings", value: "300+" },
  { label: "Industry Experience", value: "5+", suffix: "years" },
  { label: "Clients Served", value: "50+" },
  { label: "Client Satisfaction", value: ">90%" },
];

const expertise = [
  "ESG reporting",
  "Carbon accounting",
  "ESG risk analysis",
  "Supply chain sustainability",
  "ESG ratings (EcoVadis)",
];

function Index() {
  return (
    <main className="relative min-h-screen contour-bg">
      <ContourOverlay />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <TopBar />
        <Hero />
        <TrackRecord />
        <Atlas />
        <About />
        <Expertise />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

/* ---------- Cartographer decorative layer ---------- */

function ContourOverlay() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="grid"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="#1A3427"
            strokeWidth="0.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="26" />
      <circle cx="32" cy="32" r="18" strokeDasharray="1 3" />
      <path d="M32 6 L34 32 L32 58 L30 32 Z" fill="currentColor" opacity="0.8" />
      <path d="M6 32 L32 30 L58 32 L32 34 Z" fill="currentColor" opacity="0.4" />
      <circle cx="32" cy="32" r="1.5" fill="currentColor" />
    </svg>
  );
}

/* ---------- Sections ---------- */

function TopBar() {
  return (
    <header className="flex items-center justify-between pt-8 pb-6">
      <div className="flex items-center gap-3">
        <CompassRose className="h-6 w-6 text-[color:var(--accent-ink)]" />
        <span className="smallcaps">Andrea Vassallo · Portfolio</span>
      </div>
      <span className="smallcaps hidden sm:block">
        Filed · Barcelona, ES · MMXXV
      </span>
    </header>
  );
}

function Hero() {
  const meta = [
    ["Ref.", "AV / PORTFOLIO / 001"],
    ["Filed", "Barcelona, ES"],
    ["Discipline", "ESG data implementation"],
    ["Languages", "EN · IT · ES"],
    ["Status", "Open to conversations"],
  ];
  return (
    <section className="hairline pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">§01 — Statement</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
        <span className="smallcaps">Rev. 2025.11</span>
      </div>

      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_260px] md:gap-16">
        <div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] text-[color:var(--ink)]">
            Andrea Vassallo
          </h1>
          <p className="font-mono text-sm mt-3 text-[color:var(--accent-ink)] uppercase tracking-[0.18em]">
            ESG Tech &amp; SaaS Solutions
          </p>

          <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--secondary-ink)]">
            I help companies turn ESG reporting, carbon data, and supply chain
            sustainability requirements into actionable resources — and a
            competitive advantage.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <CTA href={LINKEDIN} label="LinkedIn" external primary />
            <CTA href={`mailto:${EMAIL}`} label="Email" />
          </div>
        </div>

        {/* Cover-sheet metadata block */}
        <aside className="md:border-l md:border-[color:var(--hairline)] md:pl-8 md:pt-2">
          <div className="smallcaps mb-5">Cover sheet</div>
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
          <CompassRose className="mt-8 h-12 w-12 text-[color:var(--accent-ink)] opacity-60" />
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

function TrackRecord() {
  return (
    <section className="hairline py-20 md:py-28">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">§02 — Track Record</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
      </div>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="smallcaps mb-3">{s.label}</dt>
            <dd className="font-mono text-[color:var(--ink)] text-3xl md:text-4xl leading-none">
              {s.value}
              {s.suffix && (
                <span className="ml-2 text-sm text-[color:var(--muted-ink)] uppercase tracking-widest">
                  {s.suffix}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Atlas() {
  const [open, setOpen] = useState<string | null>("MFG-01");
  return (
    <section className="hairline py-20 md:py-28">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">§03 — Implementation Atlas</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-8 md:items-end mb-14">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-[color:var(--ink)] leading-tight">
            A living record of how sustainability data gets implemented.
          </h2>
          <p className="mt-5 max-w-xl text-[color:var(--secondary-ink)] leading-relaxed">
            Field notes from case work across industries. Updated as new work
            happens. Three entries so far — grid view arrives at six to eight.
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
              № {String(index).padStart(2, "0")} · {entry.id}
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] px-2 py-1 border border-[color:var(--hairline)] text-[color:var(--ink)]">
              {entry.industry}
            </span>
            {isOpen && (
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] px-2 py-1 border border-[color:var(--accent-ink)] text-[color:var(--accent-ink)]">
                {entry.framework}
              </span>
            )}
          </div>

          <p className="text-[color:var(--secondary-ink)] text-sm md:text-base mb-2">
            {entry.client}
          </p>
          <p className="text-[color:var(--ink)] text-lg md:text-xl leading-snug max-w-2xl">
            {entry.project}
          </p>

          <div
            className={`grid transition-all duration-500 ease-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100 mt-6"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-l-2 border-[color:var(--accent-ink)] pl-5 max-w-2xl">
                <div className="smallcaps mb-2">My role</div>
                <p className="text-[color:var(--secondary-ink)] leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--muted-ink)] pt-1">
          <span>Filed · {entry.filed}</span>
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
    <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0">
      <div
        className={`absolute inset-0 rounded-full border transition-colors ${
          open
            ? "bg-[color:var(--accent-ink)] border-[color:var(--accent-ink)]"
            : "border-[color:var(--ink)]"
        }`}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-[color:var(--surface)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
      </div>
    </div>
  );
}

function About() {
  const roles = [
    {
      company: "Sphera",
      role: "Implementation Consultant",
      period: "2025 – Present",
      note: "Lead the delivery of data solutions for enterprise / mid-market EMEA accounts across ESG reporting, carbon accounting, PCF, and supply chain data.",
    },
    {
      company: "EcoVadis",
      role: "Senior Analyst → Analyst",
      period: "2022 – 2025",
      note: "Led sustainability benchmarking engagements and ESG risk analysis across the EMEA market.",
    },
    {
      company: "Merck · Impaakt",
      role: "Early career",
      period: "—",
      note: "Sustainability strategy applied to tender management in life sciences, and ESG analysis for sustainable finance.",
    },
  ];
  return (
    <section className="hairline py-20 md:py-28">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">§04 — About</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
      </div>

      <p className="max-w-2xl text-xl md:text-2xl leading-relaxed text-[color:var(--ink)] font-display font-medium">
        Five-plus years in sustainability and tech, spent turning complex ESG
        data requirements into implementations that actually work.
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
    </section>
  );
}

function Expertise() {
  return (
    <section className="hairline py-20 md:py-24">
      <div className="flex items-center gap-3 mb-10">
        <span className="smallcaps">§05 — Domain Expertise</span>
        <span className="h-px flex-1 bg-[color:var(--hairline)]" />
      </div>
      <ul className="flex flex-wrap gap-3">
        {expertise.map((e) => (
          <li
            key={e}
            className="px-4 py-2 border border-[color:var(--ink)] text-sm text-[color:var(--ink)] font-mono uppercase tracking-[0.12em] hover:bg-[color:var(--ink)] hover:text-[color:var(--surface)] transition-colors"
          >
            {e}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 smallcaps">
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
    <section className="hairline py-24 md:py-32 relative overflow-hidden">
      <div className="absolute -right-16 -top-8 opacity-[0.08]">
        <CompassRose className="h-64 w-64 text-[color:var(--ink)]" />
      </div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-10">
          <span className="smallcaps">§06 — Contact</span>
          <span className="h-px flex-1 bg-[color:var(--hairline)]" />
        </div>
        <h2 className="font-display text-5xl md:text-7xl text-[color:var(--ink)] leading-[1]">
          Let's connect.
        </h2>
        <p className="mt-6 max-w-lg text-[color:var(--secondary-ink)] text-lg">
          If you're building sustainability infrastructure — or trying to make
          one work — I'd like to hear about it.
        </p>

        <div className="mt-12 grid gap-6 max-w-lg">
          <ContactLine label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
          <ContactLine
            label="LinkedIn"
            value="andreamariavassallo"
            href={LINKEDIN}
            external
          />
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
      className="group flex items-baseline justify-between gap-4 border-b border-[color:var(--hairline)] pb-3 hover:border-[color:var(--accent-ink)] transition-colors"
    >
      <div className="flex items-baseline gap-6">
        <span className="smallcaps">{label}</span>
        <span className="font-mono text-[color:var(--ink)] group-hover:text-[color:var(--accent-ink)] transition-colors text-sm md:text-base break-all">
          {value}
        </span>
      </div>
      <span
        aria-hidden
        className="text-[color:var(--accent-ink)] transition-transform group-hover:translate-x-1"
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
      <span className="smallcaps">End of document · § VI</span>
    </footer>
  );
}
