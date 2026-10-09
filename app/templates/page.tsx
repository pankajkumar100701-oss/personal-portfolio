import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import SiteMenu from "@/components/SiteMenu";
import { profile } from "@/data/profile";
import { templates } from "@/data/templates";
import { templateSource } from "@/lib/templates";

export const metadata: Metadata = {
  title: `Templates — ${profile.name}`,
  description: "Free 3D and professional page templates — see them live, copy the code. No libraries needed.",
};

// Every template as a card with a live, scaled-down preview. Reached from
// the menu ("Templates"); each card opens /templates/<slug>.
export default function TemplatesPage() {
  return (
    <main className="u-detail" data-page="templates" style={{ "--c": "var(--m-lime)" } as CSSProperties}>
      <div className="u-grain" aria-hidden />
      <div className="u-detail-glow" aria-hidden />

      <nav className="u-detail-top relative z-30">
        <SiteMenu />
        <span className="flex items-center gap-5">
          <Link href="/#top" className="whitespace-nowrap">
            ← Home
          </Link>
          <span className="hidden sm:inline">{String(templates.length).padStart(2, "0")} templates</span>
        </span>
      </nav>

      <article className="u-detail-main">
        <header className="m-rise">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink">Templates · free</p>
          <h1 className="mt-4 font-display text-[clamp(3rem,9vw,7.5rem)] italic leading-[0.95] tracking-[-0.04em]">See it live. Copy the code.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft sm:text-xl">
            3D and professional pages, each one a single HTML file — no libraries, nothing to install. Paste it, open it, make it yours.
          </p>
        </header>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => (
            <li key={t.slug} className="m-rise" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <Link href={`/templates/${t.slug}`} className="t-card m-card m-lift" style={{ "--c": t.color } as CSSProperties}>
                <div className="t-thumb">
                  <iframe
                    title={`${t.title} preview`}
                    srcDoc={templateSource(t.slug)}
                    sandbox="allow-scripts"
                    loading="lazy"
                    tabIndex={-1}
                    aria-hidden
                  />
                  <span className="t-tier">{t.tier}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink">{t.kind}</p>
                  <h2 className="mt-2 font-display text-2xl italic leading-tight">{t.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.blurb}</p>
                  <span className="t-open">
                    Preview &amp; code <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
