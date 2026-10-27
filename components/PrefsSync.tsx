"use client";

import { useLayoutEffect } from "react";
import { applyPrefs, PREFS_EVENT, PREFS_KEY, readPrefs } from "@/lib/prefs";

// Keeps <html>'s data-* attributes in sync with the stored prefs: re-applies
// them after React's dev remount resets <html>, and follows the OS theme when
// the theme is set to "system", and picks up a change made in another tab.
export default function PrefsSync() {
  useLayoutEffect(() => {
    applyPrefs(readPrefs());
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = () => {
      const p = readPrefs();
      if (p.theme !== "system") return;
      applyPrefs(p);
      window.dispatchEvent(new Event(PREFS_EVENT));
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key !== null && e.key !== PREFS_KEY) return;
      applyPrefs(readPrefs());
      window.dispatchEvent(new Event(PREFS_EVENT));
    };
    mq.addEventListener("change", onSystem);
    window.addEventListener("storage", onStorage);
    return () => {
      mq.removeEventListener("change", onSystem);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return null;
}
