"use client";

import { useState } from "react";
import { restaurants } from "@/data/multitudes";
import type { WebsiteType } from "@/data/profile";
import { Heading, Hero } from "./ui";

// Restaurants: a little food guide with cuisine filters.
export default function Restaurants({ m }: { m: WebsiteType }) {
  const cuisines = ["All", ...new Set(restaurants.places.map((p) => p.cuisine))];
  const [filter, setFilter] = useState("All");
  const shown = restaurants.places.filter((p) => filter === "All" || p.cuisine === filter);

  return (
    <div className="space-y-16">
      <Hero m={m} />
      <section>
        <Heading n="01">The guide</Heading>
        <div role="group" aria-label="Filter by cuisine" className="mb-8 flex flex-wrap gap-2">
          {cuisines.map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)} className="m-pill">
              {c}
            </button>
          ))}
        </div>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <li key={p.name} className="m-card m-lift m-pop rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl italic">{p.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted">{p.cuisine} · {p.price}</p>
                </div>
                <span className="m-score">{p.rating}.0</span>
              </div>
              <p className="mt-3 text-ink" aria-label={`${p.rating} out of 5`}>
                {"★".repeat(p.rating)}
                <span className="opacity-25">{"★".repeat(5 - p.rating)}</span>
              </p>
              <p className="mt-3 text-soft">{p.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
