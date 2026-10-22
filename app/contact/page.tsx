import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import SiteMenu from "@/components/SiteMenu";
import TalkToMe from "@/components/TalkToMe";
import ThemeButton from "@/components/ThemeButton";
import { profile } from "@/data/profile";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta(`Talk to me — ${profile.brand}`, "Want a website? Just message or call me on WhatsApp, or email. No forms.", "/contact");

// Its own page, away from the home page's scroll: no form, just a quick way to
// message or call me on WhatsApp, or email me (see TalkToMe).
export default function ContactPage() {
  return (
    <main className="u-detail" data-page="contact" style={{ "--c": "var(--m-coral)" } as CSSProperties}>
      <div className="u-grain" aria-hidden />
      <div className="u-detail-glow" aria-hidden />

      <nav className="u-detail-top relative z-30">
        <SiteMenu />
        <span className="flex items-center gap-5">
          <Link href="/explore" className="hidden whitespace-nowrap sm:inline">
            Explore types
          </Link>
          <Link href="/#top" className="whitespace-nowrap">
            ← Home
          </Link>
          <ThemeButton />
        </span>
      </nav>

      <article className="u-detail-main">
        <header className="m-rise">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ink">Contact · Talk to me</p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em]">
            Just
            <br />
            talk to me.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft sm:text-xl">
            No forms. Message or call me on WhatsApp, or email me, even if it&apos;s just a rough idea. We&apos;ll have a quick chat, I&apos;ll show you what I&apos;ve built, and we&apos;ll figure it out together.
          </p>
        </header>

        <div className="mt-12">
          <TalkToMe />
        </div>
      </article>
    </main>
  );
}
