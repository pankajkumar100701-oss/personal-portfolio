"use client";

import { useState } from "react";
import { PopCard } from "@/components/PopCard";

export type FilterGroup = {
  title: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
};

// One "Sort & filter" button that opens every option in a single card (a
// sheet from the bottom on phones), instead of rows of pills on the page.
// The button shows what's picked right now.
export function SortFilter({ groups, onReset, changed }: { groups: FilterGroup[]; onReset: () => void; changed: boolean }) {
  const [open, setOpen] = useState(false);
  const summary = groups.map((g) => g.options.find((o) => o.value === g.value)?.label).filter(Boolean).join(" · ");

  return (
    <>
      <button type="button" className="x-folder" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
        <span className="min-w-0">
          <b>Sort &amp; filter</b>
          <small>{summary}</small>
        </span>
        {changed && <i aria-label="Changed" />}
      </button>

      <PopCard open={open} onClose={() => setOpen(false)} label="Sort & filter">
        <p className="font-display text-3xl italic">Sort &amp; filter</p>
        {groups.map((g) => (
          <fieldset key={g.title} className="x-folder-group">
            <legend>{g.title}</legend>
            <div className="flex flex-wrap gap-2">
              {g.options.map((o) => (
                <button key={o.value} type="button" className="m-pill" aria-pressed={g.value === o.value} onClick={() => g.onChange(o.value)}>
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="x-folder-foot">
          <button type="button" className="x-share" onClick={onReset} disabled={!changed}>
            Reset
          </button>
          <button type="button" className="m-cta m-cta-sm" onClick={() => setOpen(false)}>
            Show results
          </button>
        </div>
      </PopCard>
    </>
  );
}
