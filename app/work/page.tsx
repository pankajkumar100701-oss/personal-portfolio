import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ProjectShowcase } from "@/components/multitudes/Websites";
import SiteMenu from "@/components/SiteMenu";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `My work — ${profile.name}`,
  description: "Every website I've built, in one place.",
};

// Every project from data/profile.ts on one page (the multitude pages each
// show only their own). Reached from the hero's "Explore my work" link.
export default function WorkPage() {
  const { projects, multitudes, contact } = profile;
  return (
    <main className="u-detail" data-page="work" style={{ "--c": "var(--m-lime)" } as CSSProperties}>
      <div className="u-grain" aria-hidden />
      <div className="u-detail-glow" aria-hidden />

      <nav className="u-detail-top relative z-30">
        <SiteMenu />
        <span className="flex items-center gap-5">
          <Link href="/#top" className="whitespace-nowrap">
            ← Home
          </Link>
          <span className="hidden sm:inline">{String(projects.length).padStart(2, "0")} sites</span>
        </span>
      </nav>

      <article className="u-detail-main">
        <header className="m-rise">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink">My work</p>
          <h1 className="mt-4 font-display text-[clamp(3rem,9vw,7.5rem)] italic leading-[0.95] tracking-[-0.04em]">Every site, one place.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft sm:text-xl">
            All the websites I&apos;ve built, live and clickable. Open any one to look around, or tell me about yours.
          </p>
        </header>

        <div className="mt-16 space-y-6">
          {projects.map((p, i) => {
            const m = multitudes.find((x) => x.slug === p.multitude);
            return (
              <ProjectShowcase
                key={p.title}
                p={p}
                i={i}
                kicker={m ? <Link href={`/multitudes/${m.slug}`} className="hover:underline">{m.title}</Link> : "Live"}
              />
            );
          })}
        </div>

        <section className="m-card mt-20 rounded-2xl p-6 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink">Next could be yours</p>
          <p className="mt-4 max-w-xl font-display text-3xl italic leading-tight sm:text-4xl">Want a website like these?</p>
          <p className="mt-3 text-muted">Tell me what you do — I&apos;ll reply with a plan and a price.</p>
          <div className="h-cta" style={{ justifyContent: "flex-start" }}>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="u-cta-primary">
              Chat on WhatsApp <span aria-hidden>→</span>
            </a>
            <Link href="/#multitudes" className="u-cta-ghost">
              Explore your type
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
