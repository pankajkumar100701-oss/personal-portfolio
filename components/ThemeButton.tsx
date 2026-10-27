"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArtIcon } from "@/components/MultitudeArt";
import { DEFAULT_PREFS, motionChosen, PREFS_EVENT, readPrefs, savePrefs, type Prefs } from "@/lib/prefs";

// Line icons (24×24, stroked like ArtIcon).
const I = {
  // A painter's palette with three dabs of paint.
  paint: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z" />
      <circle cx="7.5" cy="11" r="1.1" fill="currentColor" />
      <circle cx="10.5" cy="7.2" r="1.1" fill="currentColor" />
      <circle cx="15.2" cy="7.8" r="1.1" fill="currentColor" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />,
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
};

const options: { value: Prefs["theme"]; label: string; icon: ReactNode }[] = [
  { value: "light", label: "Light", icon: I.sun },
  { value: "dark", label: "Dark", icon: I.moon },
  { value: "system", label: "System", icon: I.monitor },
];

// The paint-palette button at the top right of every page: picks the theme
// (Light, Dark, or follow the device). Text size and Motion stay in the site menu.
export default function ThemeButton() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Prefs["theme"]>(DEFAULT_PREFS.theme);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Stored prefs are only readable in the browser; sync them in after
  // hydration, and again whenever they change (another tab, the OS theme).
  useEffect(() => {
    const sync = () => setTheme(readPrefs().theme);
    sync();
    window.addEventListener(PREFS_EVENT, sync);
    return () => window.removeEventListener(PREFS_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const pick = (value: Prefs["theme"]) => {
    setTheme(value);
    // Fresh from storage, so a text size or motion picked in the menu isn't undone.
    savePrefs({ ...readPrefs(), theme: value }, motionChosen());
  };

  return (
    <div ref={rootRef} className="theme-pick">
      <button
        ref={buttonRef}
        type="button"
        className="theme-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Change theme"
        title="Theme"
        onClick={() => setOpen((o) => !o)}
      >
        <ArtIcon icon={I.paint} className="theme-btn-ico" />
      </button>

      <div id={panelId} className="theme-panel" data-open={open || undefined} inert={!open} role="dialog" aria-label="Theme">
        <p className="theme-title">Theme</p>
        <div role="radiogroup" aria-label="Theme" className="theme-options">
          {options.map((o) => (
            <button key={o.value} type="button" role="radio" aria-checked={theme === o.value} onClick={() => pick(o.value)}>
              <span className="theme-swatch" data-swatch={o.value} aria-hidden>
                <ArtIcon icon={o.icon} />
              </span>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
