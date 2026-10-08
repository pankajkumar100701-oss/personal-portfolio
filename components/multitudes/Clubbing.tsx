import { clubbing } from "@/data/multitudes";
import type { CSSProperties } from "react";
import type { WebsiteType } from "@/data/profile";
import { Heading } from "./ui";

// Clubbing: a night-poster. Always dark, whatever the site theme — it's a club.
export default function Clubbing({ m }: { m: WebsiteType }) {
  return (
    <div className="m-club space-y-16 rounded-3xl px-5 py-12 sm:px-12 sm:py-14 lg:px-16">
      <header className="m-rise">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-ink">{m.sub}</p>
        <h1 className="m-neon mt-4 font-sans text-[clamp(2.5rem,14vw,12rem)] font-black uppercase leading-[0.85] tracking-[-0.05em]">
          {m.title}
        </h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-xl text-lg text-white/70">{m.intro}</p>
          <div className="m-eq" aria-hidden>
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} style={{ "--i": i } as CSSProperties} />
            ))}
          </div>
        </div>
        <p className="mt-6 font-display text-3xl italic text-white">{clubbing.tagline}</p>
      </header>

      <section>
        <Heading n="01">Weekly nights</Heading>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {clubbing.nights.map((n) => (
            <li key={n.name} className="m-night grid items-center gap-2 py-6 sm:grid-cols-[6rem_1fr_auto]">
              <span className="font-mono text-2xl font-bold text-ink">{n.day}</span>
              <span>
                <span className="block text-2xl font-bold uppercase tracking-tight text-white">{n.name}</span>
                <span className="text-sm text-white/55">{n.place}</span>
              </span>
              <span className="font-mono text-sm text-white/70">{n.time}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading n="02">On repeat</Heading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {clubbing.playlist.map((p, i) => (
            <div key={p} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="m-disc" style={{ animationDuration: `${3 + i}s` }} aria-hidden />
              <span className="text-white">{p}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
