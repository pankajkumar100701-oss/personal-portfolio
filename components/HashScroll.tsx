"use client";

import { useEffect } from "react";

// Opening the home page at a section (/#about, /#faq — e.g. from the menu on
// another page): the browser jumps there before the pinned hero and the
// sideways track have sized themselves, and lands short, in the track. Keep
// re-aiming at the section while the page settles, until the visitor scrolls.
export default function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (!el) return;
    const aim = () => el.scrollIntoView({ behavior: "instant", block: "start" });
    const stopEvents = ["wheel", "touchstart", "keydown"] as const;
    const stop = () => {
      ro.disconnect();
      clearTimeout(timer);
      for (const e of stopEvents) removeEventListener(e, stop);
    };
    const ro = new ResizeObserver(aim);
    ro.observe(document.body);
    for (const e of stopEvents) addEventListener(e, stop, { passive: true });
    const timer = setTimeout(stop, 2000);
    aim();
    return stop;
  }, []);
  return null;
}
