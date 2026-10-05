import type { CSSProperties } from "react";
import Image from "next/image";
import { profile, type Multitude } from "@/data/profile";
import { Heading } from "./ui";

// Closes every multitude's page: the websites built for it (projects in
// data/profile.ts whose `multitude` is this slug) as cards with a
// screenshot (or the title on the project's colour), year, Concept label,
// tags and a live link. Until there are some, a few "coming soon" slots.
export default function Websites({ m }: { m: Multitude }) {
  const sites = profile.projects.filter((p) => p.multitude === m.slug);

  return (
    <section id="websites" className="mt-24 scroll-mt-10">
      <Heading n="✦">Websites</Heading>
      {sites.length === 0 ? (
        <div className="m-workshop-empty rounded-2xl p-6 sm:p-10">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink">
            <i className="u-live" aria-hidden /> On the workbench
          </p>
          <p className="mt-4 max-w-xl font-display text-3xl italic leading-tight sm:text-4xl">{m.title} websites are on the way.</p>
          <p className="mt-3 text-muted">Each one lands here with a live link as it ships.</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-hidden>
            {[1, 2, 3].map((n, i) => (
              <li key={n} className={`m-slot rounded-xl p-4 ${n === 3 ? "hidden sm:block" : ""}`} style={{ "--k": i } as CSSProperties}>
                <span className="font-mono text-[0.625rem] text-ink">{String(n).padStart(2, "0")}</span>
                <p className="mt-2 font-semibold">Website</p>
                <span className="m-slot-soon">Coming soon</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {sites.map((p) => (
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
                  {p.year && <span className="font-mono text-xs text-muted">{p.year}</span>}
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
      )}
    </section>
  );
}
