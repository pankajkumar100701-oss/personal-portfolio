import { webDev } from "@/data/multitudes";
import { profile, type Multitude } from "@/data/profile";
import { Card, Cta, Heading, Hero } from "./ui";

// Web Development: a terminal hero, services, process and live projects.
export default function WebDev({ m }: { m: Multitude }) {
  return (
    <div className="space-y-24">
      <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Hero m={m}>
          <div className="mt-8"><Cta m={m} /></div>
        </Hero>
        <div className="m-terminal m-rise" style={{ animationDelay: "0.15s" }}>
          <div className="m-terminal-bar"><i /><i /><i /><span>zsh — pankaj</span></div>
          <div className="space-y-2 p-5 font-mono text-sm">
            {webDev.terminal.map((line, i) => (
              <p key={line} className="m-type" style={{ animationDelay: `${0.5 + i * 0.7}s` }}>
                {line.startsWith("✓") ? <span className="text-ink">{line}</span> : <><span className="text-ink">❯</span> {line}</>}
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

      {profile.projects.length > 0 && (
        <section>
          <Heading n="03">Recent work</Heading>
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
        </section>
      )}
    </div>
  );
}
