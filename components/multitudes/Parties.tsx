import { parties } from "@/data/multitudes";
import type { CSSProperties } from "react";
import type { Multitude } from "@/data/profile";
import { Card, Heading, Hero } from "./ui";

// Parties: a wall of polaroids (CSS placeholders until real photos go in).
export default function Parties({ m }: { m: Multitude }) {
  return (
    <div className="space-y-20">
      <Hero m={m} />
      <section>
        <Heading n="01">Moments</Heading>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-10">
          {parties.moments.map((p, i) => (
            <figure key={p.caption} className="m-polaroid" style={{ "--r": `${[-4, 3, -2, 5, -3, 2][i % 6]}deg` } as CSSProperties}>
              <div className={`m-photo m-photo-${p.art}`} />
              <figcaption className="font-display text-lg italic">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="max-w-2xl">
        <Heading n="02">House rules</Heading>
        <Card>
          <ol className="space-y-4">
            {parties.rules.map((r, i) => (
              <li key={r} className="flex gap-4 text-lg">
                <span className="font-mono text-sm text-ink">0{i + 1}</span> {r}
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </div>
  );
}
