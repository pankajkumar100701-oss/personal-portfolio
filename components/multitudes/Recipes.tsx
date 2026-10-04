"use client";

import { useState } from "react";
import { recipes } from "@/data/multitudes";
import type { Multitude } from "@/data/profile";
import { Card, Heading, Hero } from "./ui";

// Recipes: a featured recipe you can tick through while cooking, plus more.
export default function Recipes({ m }: { m: Multitude }) {
  const r = recipes.featured;
  const [done, setDone] = useState<Set<string>>(new Set());
  const toggle = (item: string) =>
    setDone((d) => {
      const next = new Set(d);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });

  return (
    <div className="space-y-16">
      <Hero m={m} />
      <section className="m-recipe grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink">Featured recipe</p>
          <h2 className="mt-3 font-display text-5xl italic">{r.title}</h2>
          <p className="mt-3 text-muted">⏱ {r.time} · 🍽 serves {r.serves}</p>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-muted">
            Ingredients <span className="font-mono text-ink">{done.size}/{r.ingredients.length}</span>
          </h3>
          <ul className="mt-3 space-y-2">
            {r.ingredients.map((i) => (
              <li key={i}>
                <label className="m-check">
                  <input type="checkbox" checked={done.has(i)} onChange={() => toggle(i)} />
                  <span>{i}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">Method</h3>
          <ol className="mt-4 space-y-5">
            {r.steps.map((s, i) => (
              <li key={s} className="flex gap-5">
                <span className="m-stepnum">{i + 1}</span>
                <p className="pt-1 text-lg">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section>
        <Heading n="01">More from the kitchen</Heading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.more.map((x) => (
            <Card key={x.title} className="m-lift">
              <span className="m-tag">{x.tag}</span>
              <h3 className="mt-4 font-display text-2xl italic">{x.title}</h3>
              <p className="mt-1 text-sm text-muted">⏱ {x.time}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
