import { education } from "@/data/multitudes";
import type { CSSProperties } from "react";
import type { WebsiteType } from "@/data/profile";
import { Card, Cta, Heading, Hero } from "./ui";

// Education: a timeline of milestones and what I'm learning right now.
export default function Education({ m }: { m: WebsiteType }) {
  return (
    <div className="space-y-20">
      <Hero m={m} />
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <Heading n="01">The path so far</Heading>
          <ol className="m-timeline">
            {education.timeline.map((t, i) => (
              <li key={t.title} className="m-rise" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="font-mono text-xs uppercase tracking-widest text-ink">{t.when}</span>
                <h3 className="mt-1 font-display text-2xl italic">{t.title}</h3>
                <p className="mt-1 text-muted">{t.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <Heading n="02">Learning now</Heading>
          <Card className="space-y-5">
            {education.learning.map((l) => (
              <div key={l.skill}>
                <div className="flex justify-between text-sm">
                  <span>{l.skill}</span>
                  <span className="font-mono text-muted">{l.level}%</span>
                </div>
                <div className="m-bar mt-2"><span style={{ "--w": `${l.level}%` } as CSSProperties} /></div>
              </div>
            ))}
          </Card>
          <div className="mt-8"><Cta m={m} /></div>
        </section>
      </div>
    </div>
  );
}
