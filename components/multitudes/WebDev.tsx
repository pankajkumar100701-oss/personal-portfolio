import { webDev } from "@/data/multitudes";
import { profile, type Multitude } from "@/data/profile";
import { Card, Cta, Heading, Hero } from "./ui";

// Web Development: a terminal hero, services, process and the workshop
// (the websites I've built; a placeholder until there are some).
export default function WebDev({ m }: { m: Multitude }) {
  return (
    <div className="space-y-24">
      <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Hero m={m}>
          <div className="mt-8"><Cta m={m} /></div>
        </Hero>
        <div className="m-terminal m-rise" style={{ animationDelay: "0.15s" }}>
          <div className="m-terminal-bar"><i /><i /><i /><span>zsh — pankaj</span></div>
          <div className="space-y-1.5 p-5 font-mono text-sm">
            {webDev.terminal.map((line, i) => (
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
        <Heading n="01">What I build</Heading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {webDev.services.map((s, i) => (
            <Card key={s.title} className="m-lift">
              <span className="font-mono text-xs text-ink">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Heading n="02">How I work</Heading>
        <ol className="m-steps grid gap-6 md:grid-cols-4">
          {webDev.process.map((p) => (
            <li key={p.step}>
              <h3 className="font-display text-3xl italic">{p.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="workshop" className="scroll-mt-10">
        <Heading n="03">The workshop</Heading>
        {profile.projects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {profile.projects.map((p) => (
              <a key={p.title} href={p.href} className="m-card m-lift group flex items-center gap-5 rounded-2xl p-5">
                <span className="h-14 w-14 shrink-0 rounded-xl" style={{ background: `linear-gradient(135deg, ${p.color}, transparent)` }} />
                <span className="min-w-0">
                  <span className="block text-lg font-semibold">{p.title}</span>
                  <span className="block truncate text-sm text-muted">{p.tags.join(" · ")}</span>
                </span>
                <span className="ml-auto text-ink transition group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            ))}
          </div>
        ) : (
          // Until websites are added to data/profile.ts.
          <div className="m-workshop-empty rounded-2xl p-8 sm:p-12">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-ink">
              <i className="u-live" aria-hidden /> On the workbench
            </p>
            <p className="mt-4 max-w-xl font-display text-3xl italic leading-tight sm:text-4xl">Fresh websites are being set up in here.</p>
            <p className="mt-3 text-muted">New builds land soon — check back, or say hi in the meantime.</p>
          </div>
        )}
      </section>
    </div>
  );
}
