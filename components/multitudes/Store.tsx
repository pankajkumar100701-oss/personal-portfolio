import { store } from "@/data/multitudes";
import type { WebsiteType } from "@/data/profile";
import { Card, Cta, Heading, Hero } from "./ui";

// Store: online stores. A terminal hero (a shopper's session), what every
// store gets and how one comes together; the page adds the store websites.
export default function Store({ m }: { m: WebsiteType }) {
  return (
    <div className="space-y-24">
      <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Hero m={m}>
          <div className="mt-8"><Cta m={m} /></div>
        </Hero>
        <div className="m-terminal m-rise" style={{ animationDelay: "0.15s" }}>
          <div className="m-terminal-bar"><i /><i /><i /><span>store — checkout</span></div>
          <div className="space-y-1.5 p-5 font-mono text-sm">
            {store.terminal.map((line, i) => (
              <p key={line.text} className={`m-type ${line.kind === "cmd" && i > 0 ? "pt-2" : ""}`} style={{ animationDelay: `${0.5 + i * 0.45}s` }}>
                {line.kind === "cmd" && <><span className="text-ink">❯</span> {line.text}</>}
                {line.kind === "out" && <span className="text-[#8b93a7]">{line.text}</span>}
                {line.kind === "ok" && <span className="text-ink">{line.text}</span>}
              </p>
            ))}
          </div>
        </div>
      </div>

      <section>
        <Heading n="01">What every store gets</Heading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {store.features.map((s, i) => (
            <Card key={s.title} className="m-lift">
              <span className="font-mono text-xs text-ink">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Heading n="02">How a store comes together</Heading>
        <ol className="m-steps grid gap-6 md:grid-cols-4">
          {store.process.map((p) => (
            <li key={p.step}>
              <h3 className="font-display text-3xl italic">{p.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
