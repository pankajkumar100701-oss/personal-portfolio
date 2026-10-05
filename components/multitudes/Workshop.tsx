"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { profile, type ProjectCategory } from "@/data/profile";

// The kinds of site the workshop is meant to hold, shown as "coming soon"
// slots until real websites are added to data/profile.ts.
const PLANNED: { type: string; note: string }[] = [
  { type: "Booking site", note: "Pick, schedule, pay" },
  { type: "Homestay", note: "Rooms, gallery, enquiries" },
  { type: "Online store", note: "Catalogue, cart, checkout" },
  { type: "Café & restaurant", note: "Menu, photos, tables" },
  { type: "NGO & causes", note: "Stories, impact, donate" },
  { type: "Dashboard", note: "Data, charts, admin" },
  { type: "Creative build", note: "Motion, 3D, play" },
];

// Web Development's workshop: the websites I've built as cards (screenshot,
// year, concept label, tags, live link) with category filters, or the
// planned slots while it's still empty.
export default function Workshop() {
  const { projects } = profile;
  const categories = ["All", ...new Set(projects.map((p) => p.category))] as ("All" | ProjectCategory)[];
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  if (projects.length === 0) {
    return (
      <div className="m-workshop-empty rounded-2xl p-6 sm:p-10">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink">
          <i className="u-live" aria-hidden /> On the workbench
        </p>
        <p className="mt-4 max-w-xl font-display text-3xl italic leading-tight sm:text-4xl">Fresh websites are being set up in here.</p>
        <p className="mt-3 text-muted">Here&apos;s what&apos;s lined up — each slot fills with a live site as it ships.</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PLANNED.map((s, i) => (
            <li key={s.type} className="m-slot rounded-xl p-4" style={{ "--k": i } as CSSProperties}>
              <span className="font-mono text-[0.625rem] text-ink">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-semibold">{s.type}</p>
              <p className="mt-0.5 text-xs text-muted">{s.note}</p>
              <span className="m-slot-soon">Coming soon</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      {categories.length > 2 && (
        <div role="group" aria-label="Filter websites" className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)} className="m-pill">
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {shown.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="m-card m-lift m-pop group flex flex-col overflow-hidden rounded-2xl"
            style={{ "--p": p.color } as CSSProperties}
          >
            <span className="m-shot relative block aspect-[16/10] overflow-hidden">
              {p.image ? (
                <Image src={p.image} alt={`${p.title} — screenshot`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top transition duration-700 group-hover:scale-[1.04]" />
              ) : (
                <span className="m-shot-blank" aria-hidden>
                  {p.title}
                </span>
              )}
              {p.concept && <span className="m-concept">Concept</span>}
            </span>
            <span className="flex flex-1 flex-col p-5 sm:p-6">
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-xl font-semibold">{p.title}</span>
                <span className="font-mono text-xs text-muted">{[p.category, p.year].filter(Boolean).join(" · ")}</span>
              </span>
              <span className="mt-2 text-sm leading-relaxed text-muted">{p.description}</span>
              <span className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="m-tag">
                    {t}
                  </span>
                ))}
              </span>
              <span className="mt-auto pt-5 text-sm font-semibold text-ink">
                Visit site <span className="inline-block transition group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
