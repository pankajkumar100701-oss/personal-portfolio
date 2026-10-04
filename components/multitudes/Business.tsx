import { business } from "@/data/multitudes";
import type { Multitude } from "@/data/profile";
import { Cta, Heading, Hero } from "./ui";

// Business: ventures as a status board, plus the principles behind them.
export default function Business({ m }: { m: Multitude }) {
  return (
    <div className="space-y-20">
      <Hero m={m}>
        <div className="mt-8"><Cta m={m} /></div>
      </Hero>
      <section>
        <Heading n="01">Ventures</Heading>
        <div className="grid gap-4 md:grid-cols-2">
          {business.ventures.map((v) => (
            <div key={v.name} className="m-card m-lift flex items-start justify-between gap-6 rounded-2xl p-6">
              <div>
                <h3 className="text-2xl font-semibold">{v.name}</h3>
                <p className="mt-2 text-muted">{v.text}</p>
              </div>
              <span className="m-status" data-status={v.status}>{v.status}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <Heading n="02">Principles</Heading>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {business.principles.map((p, i) => (
            <li key={p} className="bg-page p-8">
              <span className="font-mono text-sm text-ink">0{i + 1}</span>
              <p className="mt-6 font-display text-2xl italic leading-snug">{p}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
