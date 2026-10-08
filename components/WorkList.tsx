"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectShowcase } from "@/components/multitudes/Websites";
import { findType, profile } from "@/data/profile";

const sorts = [
  { value: "new", label: "Newest first" },
  { value: "old", label: "Oldest first" },
  { value: "az", label: "A → Z" },
  { value: "type", label: "By type" },
] as const;

// The /work page's list of websites, with a type filter and a sort on top.
// (profile.projects is in the order they were built, so its end is newest.)
export default function WorkList() {
  const { projects } = profile;
  const [sort, setSort] = useState<(typeof sorts)[number]["value"]>("new");
  const [type, setType] = useState("all");
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
      </div>

      <div className="mt-10 space-y-6">
        {list.map((p, i) => {
          const t = findType(p.multitude);
          return (
            <ProjectShowcase
              key={`${sort}-${type}-${p.title}`}
              p={p}
              i={i}
              kicker={t ? <Link href={`/multitudes/${t.slug}`} className="hover:underline">{t.title}</Link> : "Live"}
            />
          );
        })}
      </div>
    </>
  );
}
