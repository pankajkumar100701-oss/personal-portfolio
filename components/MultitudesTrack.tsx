"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { ArtIcon, artIcon, artVars } from "@/components/MultitudeArt";
import { AddToMessage } from "@/components/MessageActions";
import { findType, profile } from "@/data/profile";
import { motionReduced, PREFS_EVENT } from "@/lib/prefs";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// Pixels the row slides sideways per pixel scrolled down. Lower is slower.
const SPEED = 0.85;
// Share of the pinned scroll spent holding still at each end.
const HOLD = 0.06;

// The cards in the row: profile.trackTypes (max 10), numbered in row order.
const types = profile.trackTypes
  .map(findType)
  .filter((t) => t !== undefined)
  .slice(0, 10);
const num = (i: number) => String(i + 1).padStart(2, "0");
// What the meter shows for each card, the last one being "My work".
const labels = [...types.map((_, i) => num(i)), "Work"];

// After the arrival: the trending types as a row of big cards (and a last
// "My work" card opening /work) that slides
// sideways as you scroll down (the stage is pinned while the row travels).
// The card nearest the centre sits straight and full size; the others lean,
// shrink and dim toward the edges. Desktop + motion-allowed only; elsewhere
// it's a plain swipeable row.
export default function MultitudesTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);

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
    
    // Card centres along the row, measured untransformed.
    let travel = 0;
    let centres: number[] = [];
    let vw = 0;
    const measure = () => {
      vw = row.parentElement!.clientWidth;
      travel = Math.max(0, row.scrollWidth - vw);
      centres = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
      // Size the pinned scroll from the row's length, so the pace stays the
      // same however many cards there are or however wide the screen is.
      section.style.height = `${window.innerHeight + travel / SPEED / (1 - 2 * HOLD)}px`;
    };

    let cur = 0;
    let target = 0;
    let frame = 0;
    let last = 0;
    let shownIndex = -1;
    // Last lean written per card, so cards parked at the edges aren't touched.
    let shownD: string[] = [];

    const apply = () => {
      const x = -travel * cur;
      row.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      let nearest = 0;
      let best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.max(-1, Math.min(1, (centres[i] + x - vw / 2) / vw));
        // Written straight to rotate / scale / opacity (composited, see the
        // CSS), not as custom properties: those inherit, so setting them
        // restyled and repainted every card's whole subtree each frame.
        const key = d.toFixed(3);
        if (shownD[i] !== key) {
          shownD[i] = key;
          const a = Math.abs(d);
          c.style.rotate = `${(d * -5).toFixed(2)}deg`;
          c.style.scale = (1 - a * 0.12).toFixed(4);
          c.style.opacity = (1 - a * 0.45).toFixed(3);
        }
        if (Math.abs(d) < best) {
          best = Math.abs(d);
          nearest = i;
        }
      });
      if (nearest !== shownIndex) {
        shownIndex = nearest;
        count.textContent = labels[nearest];
      }
      bar.style.scale = `${cur} 1`;
    };

    const reset = () => {
      row.style.transform = "";
      section.style.removeProperty("height");
      shownD = [];
      for (const c of cards) for (const v of ["rotate", "scale", "opacity"]) c.style.removeProperty(v);
    };

    const tick = (now: number) => {
      if (!alive) return;
      const dt = last ? Math.min(64, now - last) : 16.7;
      last = now;
      cur += (target - cur) * (1 - Math.exp(-dt / 160));
      if (Math.abs(target - cur) < 0.0002) cur = target;
      apply();
      if (cur === target) {
        frame = 0;
        last = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const active = () => wide.matches && !motionReduced();
    const onScroll = () => {
      if (!active()) return;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      // A short hold at each end so the first and last cards get a beat.
      target = span > 0 ? clamp01((-rect.top / span - HOLD) / (1 - 2 * HOLD)) : 0;
      if (!frame && target !== cur) frame = requestAnimationFrame(tick);
    };
    const onResize = () => {
      if (!alive) return;
      if (!active()) return reset();
      measure();
      apply();
      onScroll();
    };

    // Phones have no hover: the card snapped into view gets the hover look
    // instead. (Wide screens in Lite show every card at once, so none.)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.target as HTMLElement).toggleAttribute("data-active", !wide.matches && e.intersectionRatio > 0.7);
      },
      { root: row, threshold: [0, 0.7, 1] },
    );
    cards.forEach((c) => io.observe(c));

    onResize();
    document.fonts?.ready.then(onResize);
    // Cards are sized in rem, so the "Large text" setting (or a late font)
    // changes the row's length without a window resize: re-measure then too.
    const ro = new ResizeObserver(onResize);
    ro.observe(row);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    wide.addEventListener("change", onResize);
    window.addEventListener(PREFS_EVENT, onResize);
    return () => {
      alive = false;
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      wide.removeEventListener("change", onResize);
      window.removeEventListener(PREFS_EVENT, onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} id="multitudes" className="u-track" aria-label="The multitudes">
      <div className="u-track-stage">
        <div ref={rowRef} className="u-track-row">
          <div className="u-track-intro">
            <p className="u-track-kicker">In demand this year</p>
            <h2>
              Find your kind.
              <br />
              <em>I&apos;ll build the rest.</em>
            </h2>
            <p className="u-track-hint">
              From gyms and clinics to stores and homestays: the {types.length} websites people ask me for most. Open one to see what goes inside, or add it to your plan.
            </p>
            <Link href="/work" className="u-track-work">
              See my work <span aria-hidden>→</span>
            </Link>
          </div>
          {types.map((m, i) => (
            // The whole card opens the multitude (a stretched link); its
            // "Add to message" button sits above that and adds it instead.
            <div key={m.slug} className="u-card" style={{ "--c": m.color, ...artVars(m.slug, m.color) } as CSSProperties}>
              {/* Hover (or, on phones, the snapped card) floods it with its gradient. */}
              <span className="u-card-flood" aria-hidden />
              <ArtIcon icon={artIcon(m.slug)} className="u-card-mark" />
              <Link href={`/multitudes/${m.slug}`} className="u-card-link" aria-label={`${m.title}: open`} />
              <span className="u-card-top">
                <b>{num(i)}</b>
                <span className="u-card-icon">
                  <ArtIcon icon={artIcon(m.slug)} />
                </span>
              </span>
              <strong>{m.title}</strong>
              <small>{m.sub}</small>
              <p>{m.intro}</p>
              <span className="u-card-actions">
                <span className="u-card-go">
                  Open <span aria-hidden>→</span>
                </span>
                <AddToMessage kind="types" id={m.slug} className="u-card-msg" label="Add to message" />
              </span>
            </div>
          ))}
          <div className="u-card u-card-all" style={{ "--c": "var(--m-lime)", ...artVars("all", "var(--m-lime)"), "--art-ink": "#0b0d10" } as CSSProperties}>
            <span className="u-card-flood" aria-hidden />
            <Link href="/work" className="u-card-link" aria-label="My work: every website I've built" />
            <span className="u-card-top">
              <b>Work</b>
              <span className="u-card-icon" aria-hidden>
                →
              </span>
            </span>
            <strong>My work</strong>
            <small>Live sites / filter / sort</small>
            <p>Every website I&apos;ve built, live and clickable. Filter by type, sort your way and pick the one you&apos;d like yours to be like.</p>
            <span className="u-card-actions">
              <span className="u-card-go">
                See my work <span aria-hidden>→</span>
              </span>
            </span>
          </div>
        </div>
        <div className="u-track-meter" aria-hidden>
          <span ref={countRef}>{labels[0]}</span> / {num(types.length - 1)}
          <i>
            <b ref={barRef} />
          </i>
        </div>
      </div>
    </section>
  );
}
