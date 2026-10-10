"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { SizeSwitch, readSize, saveSize } from "@/components/PopCard";
import { SortFilter } from "@/components/SortFilter";
import type { Template } from "@/data/templates";

const sorts = [
  { value: "new", label: "Newest first" },
  { value: "old", label: "Oldest first" },
  { value: "az", label: "A → Z" },
  { value: "kind", label: "By kind" },
] as const;
const sizes = [
  { value: "small", label: "Small" },
  { value: "large", label: "Large" },
] as const;
type Size = (typeof sizes)[number]["value"];
const SIZE_KEY = "templates-size";

// /templates: every template as a card with a live, scaled-down preview
// (`preview` is its HTML with the link guard), behind one "Sort & filter"
// button and a small / large switch. Each card opens /templates/<slug>.
export default function TemplateList({ items }: { items: (Template & { preview: string })[] }) {
  const [sort, setSort] = useState<(typeof sorts)[number]["value"]>("new");
  const [kind, setKind] = useState("all");
  const [size, setSize] = useState<Size>("large");

  // The remembered size is only readable in the browser; sync it in after hydration.
  useEffect(() => {
    const saved = readSize(SIZE_KEY, sizes);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setSize(saved);
  }, []);
  const pickSize = (v: Size) => {
    setSize(v);
    saveSize(SIZE_KEY, v);
  };

  const kinds = [...new Set(items.map((t) => t.kind))];
  let list = items.filter((t) => kind === "all" || t.kind === kind);
  if (sort === "new") list = [...list].sort((a, b) => b.added.localeCompare(a.added) || items.indexOf(b) - items.indexOf(a));
  if (sort === "old") list = [...list].sort((a, b) => a.added.localeCompare(b.added) || items.indexOf(a) - items.indexOf(b));
  if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "kind") list = [...list].sort((a, b) => a.kind.localeCompare(b.kind) || a.title.localeCompare(b.title));
  const small = size === "small";

  return (
    <>
      <div className="x-bar m-rise">
        <SortFilter
          groups={[
            { title: "Sort by", options: sorts, value: sort, onChange: (v) => setSort(v as typeof sort) },
            {
              title: "Kind",
              options: [{ value: "all", label: `All · ${items.length}` }, ...kinds.map((k) => ({ value: k, label: k }))],
              value: kind,
              onChange: setKind,
            },
          ]}
          changed={sort !== "new" || kind !== "all"}
          onReset={() => {
            setSort("new");
            setKind("all");
          }}
        />
        <SizeSwitch options={sizes} value={size} onChange={pickSize} />
      </div>
      <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "template" : "templates"}
        {kind !== "all" && <> · {kind}</>}
      </p>

      <ul className={`mt-5 grid ${small ? "grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4" : "gap-6 md:grid-cols-2 lg:grid-cols-3"}`}>
        {list.map((t, i) => (
          <li key={t.slug} className="m-rise" style={{ animationDelay: `${0.05 + Math.min(i, 8) * 0.06}s` }}>
            <Link href={`/templates/${t.slug}`} className="t-card m-card m-lift" data-size={size} style={{ "--c": t.color } as CSSProperties}>
              <div className="t-thumb">
                <iframe title={`${t.title} preview`} srcDoc={t.preview} sandbox="allow-scripts" loading="lazy" tabIndex={-1} aria-hidden />
                <span className="t-tier">{t.tier}</span>
              </div>
              <div className={small ? "p-3 sm:p-4" : "p-5 sm:p-6"}>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink">{t.kind}</p>
                <h2 className={`mt-1.5 font-display italic leading-tight ${small ? "text-lg sm:text-xl" : "text-2xl"}`}>{t.title}</h2>
                {!small && <p className="mt-2 text-sm leading-relaxed text-muted">{t.blurb}</p>}
                {!small && (
                  <span className="t-open">
                    Preview &amp; code <span aria-hidden>→</span>
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
