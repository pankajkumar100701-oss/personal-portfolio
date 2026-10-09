"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProjectShowcase } from "@/components/multitudes/Websites";
import { findType, profile } from "@/data/profile";

const sorts = [
  { value: "new", label: "Newest first" },
  { value: "old", label: "Oldest first" },
  { value: "az", label: "A → Z" },
  { value: "type", label: "By type" },
] as const;

const sizes = [
  { value: "large", label: "Large", hint: "One per row, all the details" },
  { value: "medium", label: "Medium", hint: "Two per row" },
  { value: "small", label: "Small", hint: "Three per row, quick look" },
] as const;
type Size = (typeof sizes)[number]["value"];
const SIZE_KEY = "work-size";
// The grid for each card size (one column on phones, whatever the size).
const gridFor: Record<Size, string> = {
  large: "space-y-6",
  medium: "grid gap-5 md:grid-cols-2",
  small: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
};

// The /work page's list of websites, with a type filter and a sort on top,
// and a ⋮ menu (top right) to pick the card size, remembered per browser.
// (profile.projects is in the order they were built, so its end is newest.)
export default function WorkList() {
  const { projects } = profile;
  const [sort, setSort] = useState<(typeof sorts)[number]["value"]>("new");
  const [type, setType] = useState("all");
  const [size, setSize] = useState<Size>("large");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // The remembered size is only readable in the browser; sync it in after hydration.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SIZE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (sizes.some((s) => s.value === saved)) setSize(saved as Size);
    } catch {}
  }, []);

  // Close the ⋮ menu on a click outside it or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const pickSize = (s: Size) => {
    setSize(s);
    setMenuOpen(false);
    try {
      localStorage.setItem(SIZE_KEY, s);
    } catch {}
  };
  const typeOf = (slug: string) => findType(slug)?.title ?? slug;
  const usedTypes = [...new Set(projects.map((p) => p.multitude))];

  let list = projects.filter((p) => type === "all" || p.multitude === type);
  if (sort === "new") list = [...list].reverse();
  if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "type") list = [...list].sort((a, b) => typeOf(a.multitude).localeCompare(typeOf(b.multitude)));

  return (
    <>
      <div className="x-bar m-rise">
        <div className="x-filters" role="group" aria-label="Show">
          <button type="button" className="m-pill" aria-pressed={type === "all"} onClick={() => setType("all")}>
            All · {projects.length}
          </button>
          {usedTypes.map((slug) => (
            <button key={slug} type="button" className="m-pill" aria-pressed={type === slug} onClick={() => setType(slug)}>
              {typeOf(slug)}
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
        <div ref={menuRef} className="x-more">
          <button type="button" aria-label="View options" aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <circle cx="12" cy="5" r="1.8" />
              <circle cx="12" cy="12" r="1.8" />
              <circle cx="12" cy="19" r="1.8" />
            </svg>
          </button>
          {menuOpen && (
            <div role="menu" className="x-more-panel">
              <p>Card size</p>
              {sizes.map((s) => (
                <button key={s.value} type="button" role="menuitemradio" aria-checked={size === s.value} onClick={() => pickSize(s.value)}>
                  <span>
                    <b>{s.label}</b>
                    <small>{s.hint}</small>
                  </span>
                  {size === s.value && <i aria-hidden>✓</i>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`mt-10 ${gridFor[size]}`}>
        {list.map((p, i) => {
          const t = findType(p.multitude);
          return (
            <ProjectShowcase
              key={`${sort}-${type}-${p.title}`}
              p={p}
              i={i}
              kicker={t ? <Link href={`/multitudes/${t.slug}`} className="hover:underline">{t.title}</Link> : "Live"}
              size={size}
            />
          );
        })}
      </div>
    </>
  );
}
