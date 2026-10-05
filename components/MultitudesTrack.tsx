"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { ArtIcon, artIcon, artVars } from "@/components/MultitudeArt";
import { profile } from "@/data/profile";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

// After the arrival: the multitudes as a row of big cards that slides
// sideways as you scroll down (the stage is pinned while the row travels).
// The card nearest the centre sits straight and full size; the others lean,
// shrink and dim toward the edges. Desktop + motion-allowed only; elsewhere
// it's a plain swipeable row.
export default function MultitudesTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const { multitudes } = profile;

  useEffect(() => {
    const section = sectionRef.current!;
    const row = rowRef.current!;
    // Grab the nodes now: refs go null on unmount a moment before this
    // effect's cleanup runs, and a frame can land in between.
    const count = countRef.current!;
    const bar = barRef.current!;
    let alive = true;
    const cards = [...row.querySelectorAll<HTMLElement>(".u-card")];
    const wide = window.matchMedia("(min-width: 800px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Card centres along the row, measured untransformed.
    let travel = 0;
    let centres: number[] = [];
    let vw = 0;
    const measure = () => {
      vw = row.parentElement!.clientWidth;
      travel = Math.max(0, row.scrollWidth - vw);
      centres = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
    };

    let cur = 0;
    let target = 0;
    let frame = 0;
    let last = 0;
    let shownIndex = -1;

    const apply = () => {
      const x = -travel * cur;
      row.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      let nearest = 0;
      let best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.max(-1, Math.min(1, (centres[i] + x - vw / 2) / vw));
        c.style.setProperty("--d", d.toFixed(3));
        c.style.setProperty("--a", Math.abs(d).toFixed(3));
        if (Math.abs(d) < best) {
          best = Math.abs(d);
          nearest = i;
        }
      });
      if (nearest !== shownIndex) {
        shownIndex = nearest;
        count.textContent = multitudes[nearest].n;
      }
      bar.style.scale = `${cur} 1`;
    };

    const reset = () => {
      row.style.transform = "";
      for (const c of cards) {
        c.style.removeProperty("--d");
        c.style.removeProperty("--a");
      }
    };

    const tick = (now: number) => {
      if (!alive) return;
      const dt = last ? Math.min(64, now - last) : 16.7;
      last = now;
      cur += (target - cur) * (1 - Math.exp(-dt / 120));
      if (Math.abs(target - cur) < 0.0002) cur = target;
      apply();
      if (cur === target) {
        frame = 0;
        last = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const active = () => wide.matches && !reduce.matches;
    const onScroll = () => {
      if (!active()) return;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      // A short hold at each end so the first and last cards get a beat.
      target = span > 0 ? clamp01((-rect.top / span - 0.06) / 0.88) : 0;
      if (!frame && target !== cur) frame = requestAnimationFrame(tick);
    };
    const onResize = () => {
      if (!alive) return;
      if (!active()) return reset();
      measure();
      apply();
      onScroll();
    };

    // Without the pinned row (phones, reduced motion) there's no hover: the
    // card snapped into view gets the hover look instead.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.target as HTMLElement).toggleAttribute("data-active", !active() && e.intersectionRatio > 0.7);
      },
      { root: row, threshold: [0, 0.7, 1] },
    );
    cards.forEach((c) => io.observe(c));

    onResize();
    document.fonts?.ready.then(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    wide.addEventListener("change", onResize);
    reduce.addEventListener("change", onResize);
    return () => {
      alive = false;
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      wide.removeEventListener("change", onResize);
      reduce.removeEventListener("change", onResize);
    };
  }, [multitudes]);

  return (
    <section ref={sectionRef} id="multitudes" className="u-track" aria-label="The multitudes">
      <div className="u-track-stage">
        <div ref={rowRef} className="u-track-row">
          <div className="u-track-intro">
            <p className="u-track-kicker">The multitudes</p>
            <h2>
              {WORDS[multitudes.length] ?? multitudes.length} of me,
              <br />
              <em>one by one.</em>
            </h2>
            <p className="u-track-hint">Scroll (or swipe) to meet each side of me. Pick any to dive in.</p>
          </div>
          {multitudes.map((m) => (
            <Link key={m.slug} href={`/multitudes/${m.slug}`} className="u-card" style={{ "--c": m.color, ...artVars(m.slug, m.color) } as CSSProperties}>
              {/* Hover (or, on phones, the snapped card) floods it with its gradient. */}
              <span className="u-card-flood" aria-hidden />
              <ArtIcon icon={artIcon(m.slug)} className="u-card-mark" />
              <span className="u-card-top">
                <b>{m.n}</b>
                <span className="u-card-icon">
                  <ArtIcon icon={artIcon(m.slug)} />
                </span>
              </span>
              <strong>{m.title}</strong>
              <small>{m.sub}</small>
              <p>{m.intro}</p>
              <span className="u-card-go">
                Open <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="u-track-meter" aria-hidden>
          <span ref={countRef}>{multitudes[0].n}</span> / {String(multitudes.length).padStart(2, "0")}
          <i>
            <b ref={barRef} />
          </i>
        </div>
      </div>
    </section>
  );
}
