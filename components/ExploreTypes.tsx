"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArtIcon, artIcon, artVars } from "@/components/MultitudeArt";
import { AddToMessage, ShareLink } from "@/components/MessageActions";
import { allTypes, profile } from "@/data/profile";

const trending = new Set(profile.multitudes.map((m) => m.slug));
const examples = (slug: string) => profile.projects.filter((p) => p.multitude === slug);

const filters = [
  { value: "all", label: "All" },
  { value: "trending", label: "Trending" },
  { value: "more", label: "More types" },
  { value: "live", label: "With live examples" },
] as const;
const sorts = [
  { value: "trending", label: "Trending first" },
  { value: "az", label: "A → Z" },
  { value: "examples", label: "Most examples" },
] as const;

// The Explore page's body: every website type as a card, with search, a
// filter and a sort on top. Each card opens its own page, can be added to the
// visitor's message, or shared as a link.
export default function ExploreTypes() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");
  const [sort, setSort] = useState<(typeof sorts)[number]["value"]>("trending");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = allTypes.filter((t) => {
      if (filter === "trending" && !trending.has(t.slug)) return false;
      if (filter === "more" && trending.has(t.slug)) return false;
      if (filter === "live" && examples(t.slug).length === 0) return false;
      if (!needle) return true;
      return [t.title, t.sub, t.idealFor, ...t.features].some((s) => s.toLowerCase().includes(needle));
    });
    if (sort === "az") return [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "examples") return [...list].sort((a, b) => examples(b.slug).length - examples(a.slug).length);
    return list;
  }, [q, filter, sort]);

  return (
    <>
      <div className="x-bar m-rise">
        <label className="x-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search: salon, booking, payments…" aria-label="Search website types" />
        </label>
        <div className="x-filters" role="group" aria-label="Show">
          {filters.map((f) => (
            <button key={f.value} type="button" className="m-pill" aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
        <label className="x-sort">
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted" aria-live="polite">
        {shown.length} {shown.length === 1 ? "type" : "types"}
      </p>

      {shown.length === 0 ? (
        <div className="m-card mt-6 rounded-2xl p-8 text-center">
          <p className="font-display text-3xl italic">Not listed? I can still build it.</p>
          <p className="mt-2 text-muted">Tell me what you have in mind on the Contact page.</p>
          <Link href="/contact" className="u-cta-primary x-btn mt-6">
            Customise your website <span aria-hidden>→</span>
          </Link>
        </div>
      ) : (
        <ul className="x-grid">
          {shown.map((t, i) => {
            const live = examples(t.slug);
            return (
              <li key={t.slug} id={t.slug} className="x-type m-rise" style={{ "--c": t.color, ...artVars(t.slug, t.color), animationDelay: `${Math.min(i, 8) * 0.04}s` } as CSSProperties}>
                <div className="x-type-top">
                  <span className="x-type-icon">
                    <ArtIcon icon={artIcon(t.slug)} />
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.15em] text-ink">{t.n}</span>
                  {trending.has(t.slug) && <span className="x-badge">Trending</span>}
                </div>
                <h2 className="mt-5 font-display text-3xl italic leading-none">
                  <Link href={`/multitudes/${t.slug}`} className="hover:underline">
                    {t.title}
                  </Link>
                </h2>
                <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-muted">{t.sub}</p>
                <p className="mt-4 text-sm leading-relaxed text-soft">{t.intro}</p>
                <p className="mt-4 text-xs text-muted">
                  <b className="font-semibold text-soft">For:</b> {t.idealFor}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Can include">
                  {t.features.slice(0, 5).map((f) => (
                    <li key={f} className="m-tag">
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="x-type-live">
                  {live.length > 0 ? (
                    <>
                      <i className="u-live" aria-hidden /> Live:{" "}
                      {live.map((p, k) => (
                        <span key={p.title}>
                          {k > 0 && ", "}
                          <a href={p.href} target="_blank" rel="noopener noreferrer">
                            {p.title} ↗
                          </a>
                        </span>
                      ))}
                    </>
                  ) : (
                    <span className="text-muted">Examples on the way</span>
                  )}
                </p>
                <div className="x-type-actions">
                  <Link href={`/multitudes/${t.slug}`} className="x-open">
                    Details <span aria-hidden>→</span>
                  </Link>
                  <AddToMessage kind="types" id={t.slug} />
                  <ShareLink path={`/multitudes/${t.slug}`} title={`${t.title} websites — ${profile.name}`} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
