"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ProjectShowcase } from "@/components/multitudes/Websites";
import { PopCard, SizeSwitch, readSize, saveSize } from "@/components/PopCard";
import { findType, profile } from "@/data/profile";

const sorts = [
  { value: "new", label: "Newest first" },
  { value: "old", label: "Oldest first" },
  { value: "az", label: "A → Z" },
  { value: "type", label: "By type" },
] as const;

const sizes = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
] as const;
type Size = (typeof sizes)[number]["value"];
const SIZE_KEY = "work-size";
// The grid for each card size (small is two across even on phones).
const gridFor: Record<Size, string> = {
  large: "space-y-6",
  medium: "grid gap-5 md:grid-cols-2",
  small: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3",
};

// The /work page's list of websites, with a sort and a card-size switch
// (remembered per browser) on top, then a type filter. Small and medium
// cards pop open into the full card on a tap.
// (profile.projects is in the order they were built, so its end is newest.)
export default function WorkList() {
  const { projects } = profile;
  const [sort, setSort] = useState<(typeof sorts)[number]["value"]>("new");
  const [type, setType] = useState("all");
  const [size, setSize] = useState<Size>("large");
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  // The remembered size is only readable in the browser; sync it in after hydration.
  useEffect(() => {
    const saved = readSize(SIZE_KEY, sizes);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setSize(saved);
  }, []);

  const pickSize = (s: Size) => {
    setSize(s);
    saveSize(SIZE_KEY, s);
  };
  const typeOf = (slug: string) => findType(slug)?.title ?? slug;
  const usedTypes = [...new Set(projects.map((p) => p.multitude))];

  let list = projects.filter((p) => type === "all" || p.multitude === type);
  if (sort === "new") list = [...list].reverse();
  if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "type") list = [...list].sort((a, b) => typeOf(a.multitude).localeCompare(typeOf(b.multitude)));

  const opened = projects.find((p) => p.title === openTitle);

  return (
    <>
      <div className="x-bar m-rise">
        <div className="x-tools">
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
          <SizeSwitch options={sizes} value={size} onChange={pickSize} />
        </div>
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
              onOpen={size === "large" ? undefined : () => setOpenTitle(p.title)}
            />
          );
        })}
      </div>

      <PopCard open={opened !== undefined} onClose={() => setOpenTitle(null)} label={opened?.title ?? "Website"} style={opened ? ({ "--c": opened.color } as CSSProperties) : undefined}>
        {opened && <ProjectShowcase p={opened} i={list.indexOf(opened)} kicker={findType(opened.multitude)?.title ?? "Live"} size="medium" />}
      </PopCard>
    </>
  );
}
