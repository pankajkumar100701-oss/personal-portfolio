import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { profile, type WebsiteType, type Project } from "@/data/profile";
import { AddToMessage } from "@/components/MessageActions";
import { Heading } from "./ui";

// Closes every multitude's page: the websites built for it (projects in
// data/profile.ts whose `multitude` is this slug), each as a showcase — the
// site in a browser frame beside who it's for, what's inside, tags and a
// live link. Until there are some, a few "coming soon" slots.
export default function Websites({ m, n = "✦" }: { m: WebsiteType; n?: string }) {
  const sites = profile.projects.filter((p) => p.multitude === m.slug);

  return (
    <section id="websites" className="mt-24 scroll-mt-10">
      <Heading n={n}>{sites.length === 0 ? "Websites" : "Websites I've built"}</Heading>
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
        <div className="space-y-6">
          {sites.map((p, i) => (
            <ProjectShowcase key={p.title} p={p} i={i} />
          ))}
        </div>
      )}
    </section>
  );
}

// One website as a showcase: the site in a browser frame beside who it's for,
// what's inside, tags, a live link and "I want one like this" (adds it to the
// visitor's message). Also used by the /work page, where
// `kicker` names the multitude it belongs to and `size` (the /work page's
// card size) can stack it: "medium" puts the site above the details, "small"
// also trims it to the title, one line and the buttons.
export function ProjectShowcase({ p, i, kicker, size = "large" }: { p: Project; i: number; kicker?: ReactNode; size?: "large" | "medium" | "small" }) {
  const small = size === "small";
  // Client reviews of this site (profile.reviews with `site` set to its title).
  const reviews = profile.reviews.filter((r) => r.site === p.title);
  return (
    <article className={`m-show m-rise group grid overflow-hidden rounded-2xl ${size === "large" ? "md:grid-cols-[1.3fr_1fr]" : ""}`} data-size={size} style={{ "--p": p.color, animationDelay: `${i * 0.1}s` } as CSSProperties}>
      {/* The site in a little browser window that tilts toward you on hover. */}
      <a href={p.href} target="_blank" rel="noopener noreferrer" className="m-show-stage" aria-label={`Open ${p.title}`}>
        <span className="m-browser">
          <span className="m-browser-bar" aria-hidden>
            <i />
            <i />
            <i />
            <span>{p.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
          </span>
          <span className="m-shot relative block aspect-[16/10] overflow-hidden">
            {p.image ? (
              <Image src={p.image} alt={`${p.title} — home page`} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover object-top transition duration-[1.2s] group-hover:scale-[1.03]" />
            ) : (
              <span className="m-shot-blank" aria-hidden>
                {p.title}
              </span>
            )}
            {p.concept && <span className="m-concept">Concept</span>}
          </span>
        </span>
      </a>
      <div className={`flex flex-col justify-center ${size === "large" ? "p-5 sm:p-8 lg:px-12" : small ? "p-4 sm:p-5" : "p-5 sm:p-7"}`}>
        <p className="flex items-center justify-between gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink">
          <span>{String(i + 1).padStart(2, "0")} — {kicker ?? "Live"}</span>
          {p.year && <span className="text-muted">{p.year}</span>}
        </p>
        <h3 className={`mt-3 font-display italic leading-[1.05] ${small ? "text-2xl" : "text-3xl lg:text-4xl"}`}>{p.title}</h3>
        {p.client && !small && <p className="mt-1.5 text-sm text-muted">for {p.client}</p>}
        <p className={`mt-3 text-sm leading-relaxed text-soft ${small ? "line-clamp-2" : ""}`}>{p.description}</p>
        {p.highlights && !small && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.highlights.map((h) => (
              <li key={h} className="m-show-point">
                {h}
              </li>
            ))}
          </ul>
        )}
        <div className={`mt-3 flex-wrap gap-1.5 ${small ? "hidden" : "flex"}`}>
          {p.tags.map((t) => (
            <span key={t} className="m-tag">
              {t}
            </span>
          ))}
        </div>
        {!small && reviews.map((r) => (
          <figure key={r.name + r.text.slice(0, 20)} className="m-show-review">
            {r.rating && (
              <p className="h-stars text-xs" aria-label={`${r.rating} out of 5`}>
                {"★".repeat(r.rating)}
                <span>{"★".repeat(5 - r.rating)}</span>
              </p>
            )}
            <blockquote>“{r.text}”</blockquote>
            <figcaption>
              <strong>{r.name}</strong> · {r.role}
            </figcaption>
          </figure>
        ))}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a href={p.href} target="_blank" rel="noopener noreferrer" className="m-cta m-cta-sm">
            Visit the site <span aria-hidden>↗</span>
          </a>
          <AddToMessage kind="sites" id={p.title} label="I want one like this" />
        </div>
      </div>
    </article>
  );
}
