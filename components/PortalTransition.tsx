"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArtIcon, DEFAULT_ART, MULTITUDE_ART } from "@/components/MultitudeArt";
import { allTypes } from "@/data/profile";
import { motionReduced } from "@/lib/prefs";

const ENTER = 320; // ms: the cover fades in
const EXIT = 380; // ms: and out again over the new page

// Clicking any link to a website type fades in a cover in that type's own
// gradient, names the page, navigates underneath, then fades away onto the
// new page. Only opacity animates, so it runs on the compositor (the old
// clip-path / mask "ring" repainted the whole screen every frame). Lives in
// the root layout so it survives the navigation. Skipped on phones, for
// reduced motion, modified clicks and back/forward.
export default function PortalTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);
  const exitRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = rootRef.current!;
    const label = root.querySelector<HTMLElement>(".portal-x-label")!;
    let safety = 0;
    let go = 0;

    const finish = () => {
      root.removeAttribute("data-on");
      for (const a of [...root.getAnimations(), ...label.getAnimations()]) a.cancel();
      busy.current = false;
      pending.current = null;
    };

    exitRef.current = () => {
      clearTimeout(safety);
      root
        .animate([{ opacity: 1 }, { opacity: 0 }], { duration: EXIT, delay: 80, easing: "ease-out", fill: "forwards" })
        .finished.then(finish, finish);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="/websites/"]');
      // Links inside an open pop-up just navigate: the dialog would cover the disk.
      if (!a || (a.target && a.target !== "_self") || a.closest("dialog[open]")) return;
      const href = a.getAttribute("href")!.split(/[?#]/)[0];
      const m = allTypes.find((x) => href === `/websites/${x.slug}`);
      if (!m || href === location.pathname) return;
      if (motionReduced() || !window.matchMedia("(min-width: 800px)").matches) return;
      e.preventDefault();
      if (busy.current) return;
      busy.current = true;

      const art = MULTITUDE_ART[m.slug];
      root.style.setProperty("--from", art?.from ?? m.color);
      root.style.setProperty("--to", art?.to ?? m.color);
      root.style.setProperty("--art-ink", (art ?? DEFAULT_ART).ink);
      setSlug(m.slug);
      root.setAttribute("data-on", "");
      root.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ENTER, easing: "ease-out", fill: "forwards" });
      label.animate([{ opacity: 0, transform: "translateY(0.75rem)" }, { opacity: 1, transform: "none" }], {
        duration: 300,
        delay: ENTER * 0.4,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "both",
      });
      go = window.setTimeout(() => {
        go = 0;
        pending.current = href;
        router.push(href);
        // If the new page never shows up, don't leave the screen covered.
        safety = window.setTimeout(() => exitRef.current(), 4000);
      }, ENTER);
    };

    // Back pressed while the disk is still growing: cancel the trip.
    const onPop = () => {
      if (!go) return;
      clearTimeout(go);
      go = 0;
      finish();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      clearTimeout(safety);
      clearTimeout(go);
    };
  }, [router]);

  // The new page has rendered under the cover: open it up.
  useEffect(() => {
    if (!pending.current || pathname !== pending.current) return;
    pending.current = null;
    requestAnimationFrame(() => requestAnimationFrame(() => exitRef.current()));
  }, [pathname]);

  const m = allTypes.find((x) => x.slug === slug);
  const icon = slug ? (MULTITUDE_ART[slug] ?? DEFAULT_ART).icon : null;
  return (
    <div ref={rootRef} className="portal-x" aria-hidden>
      {/* A huge, faint copy of the icon behind everything. */}
      {icon && <ArtIcon key={`mark-${slug}`} icon={icon} className="portal-x-mark" />}
      <div className="portal-x-label">
        {icon && (
          <span key={`icon-${slug}`} className="portal-x-icon">
            <ArtIcon icon={icon} />
          </span>
        )}
        <b>{m?.n}</b>
        <strong>{m?.title}</strong>
        <small>{m?.sub}</small>
      </div>
    </div>
  );
}
