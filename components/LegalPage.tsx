import Link from "next/link";
import type { CSSProperties } from "react";
import SiteMenu from "@/components/SiteMenu";
import ThemeButton from "@/components/ThemeButton";
import { formatDate } from "@/data/blog";
import type { LegalDoc } from "@/data/legal";

// The Privacy Policy and Terms & Conditions pages (data/legal.ts), laid out like a blog post.
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const other = doc.slug === "privacy" ? { href: "/terms", label: "Terms & Conditions" } : { href: "/privacy", label: "Privacy Policy" };
  return (
    <main className="u-detail" data-page={doc.slug} style={{ "--c": "var(--m-coral)" } as CSSProperties}>
      <div className="u-grain" aria-hidden />
      <div className="u-detail-glow" aria-hidden />

      <nav className="u-detail-top relative z-30">
        <SiteMenu />
        <span className="flex items-center gap-5">
          <Link href="/#top" className="whitespace-nowrap">
            ← Home
          </Link>
          <ThemeButton />
        </span>
      </nav>

      <article className="u-detail-main f-post">
        <header className="m-rise">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ink">Last updated {formatDate(doc.updated)}</p>
          <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.03em]">{doc.title}</h1>
        </header>

        <div className="f-post-body">
          {doc.body.map((b, i) =>
            "h" in b ? (
              <h2 key={i}>{b.h}</h2>
            ) : "p" in b ? (
              <p key={i}>{b.p}</p>
            ) : (
              <ul key={i}>
                {b.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ),
          )}
        </div>

        <div className="h-cta mt-12" style={{ justifyContent: "flex-start" }}>
          <Link href="/contact" className="u-cta-primary">
            Talk to me <span aria-hidden>→</span>
          </Link>
          <Link href={other.href} className="u-cta-ghost">
            {other.label}
          </Link>
        </div>
      </article>
    </main>
  );
}
