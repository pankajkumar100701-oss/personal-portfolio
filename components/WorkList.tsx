"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ProjectShowcase } from "@/components/multitudes/Websites";
import { PopCard, SizeSwitch, readSize, saveSize } from "@/components/PopCard";
import { SortFilter } from "@/components/SortFilter";
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

// The /work page's list of websites, with one "Sort & filter" button (sort
// and type in a single card) and a card-size switch (remembered per browser;
// phones get just Small and Large). Small and medium cards pop open into the
// full card on a tap.
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
    // Phones have no Medium (it's one card a row there anyway): show Small.
    const phone = matchMedia("(max-width: 639px)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setSize(phone && saved === "medium" ? "small" : saved);
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
        <SortFilter
          groups={[
            { title: "Sort by", options: sorts, value: sort, onChange: (v) => setSort(v as typeof sort) },
            {
              title: "Type of website",
              options: [{ value: "all", label: `All · ${projects.length}` }, ...usedTypes.map((slug) => ({ value: slug, label: typeOf(slug) }))],
              value: type,
              onChange: setType,
            },
          ]}
          changed={sort !== "new" || type !== "all"}
          onReset={() => {
            setSort("new");
            setType("all");
          }}
        />
        <SizeSwitch options={sizes} value={size} onChange={pickSize} />
      </div>
      <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? "site" : "sites"}
        {type !== "all" && <> · {typeOf(type)}</>}
      </p>

      <div className={`mt-5 ${gridFor[size]}`}>
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
