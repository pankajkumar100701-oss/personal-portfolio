"use client";

import { useEffect } from "react";

// Fades [data-reveal] elements up as they scroll into view (once each).
export default function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-shown", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.documentElement.setAttribute("data-reveal-ready", "");
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
