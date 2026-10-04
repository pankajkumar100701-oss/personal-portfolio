import { art } from "@/data/multitudes";
import type { Multitude } from "@/data/profile";
import { Heading, Hero } from "./ui";

// Painting / Art: a gallery wall. Each "canvas" is CSS art for now — swap in
// photos of the real paintings later.
export default function Art({ m }: { m: Multitude }) {
  return (
    <div className="space-y-20">
      <Hero m={m} />
      <blockquote className="m-rise max-w-4xl font-display text-[clamp(1.75rem,3.5vw,3rem)] italic leading-tight">
        “{art.statement}”
      </blockquote>
      <section>
        <Heading n="01">Selected works</Heading>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {art.works.map((w) => (
            <figure key={w.title} className="m-frame mb-5 break-inside-avoid">
              <div className={`m-canvas m-canvas-${w.art} ${w.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
              <figcaption className="flex items-baseline justify-between gap-3 px-1 pt-3">
                <span className="font-display text-xl italic">{w.title}</span>
                <span className="text-xs uppercase tracking-widest text-muted">{w.medium} · {w.year}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
