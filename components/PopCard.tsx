"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

let pendingBack: ReturnType<typeof setTimeout> | undefined;

// A card that pops open over the page (a sheet from the bottom on phones):
// used by Explore and My work to open a compact card's full details. Closes
// on ×, Escape, the phone's back button, a tap outside it, or `onClose`.
export function PopCard({ open, onClose, label, style, children }: { open: boolean; onClose: () => void; label: string; style?: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Phones: the back button closes the card instead of leaving the page. An
  // entry is pushed while it's open; closing it any other way takes it back off.
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });
  useEffect(() => {
    if (!open) return;
    let viaBack = false;
    // A close that's immediately followed by an open (React re-running the
    // effect) keeps the entry rather than going back and forth.
    if (pendingBack) {
      clearTimeout(pendingBack);
      pendingBack = undefined;
    }
    if (!history.state?.popCard) history.pushState({ ...history.state, popCard: true }, "");
    const onPop = () => {
      viaBack = true;
      closeRef.current();
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (viaBack) return;
      pendingBack = setTimeout(() => {
        pendingBack = undefined;
        if (history.state?.popCard) history.back();
      });
    };
  }, [open]);

  // Don't let the page behind scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="pop"
      aria-label={label}
      style={style}
      onClose={onClose}
      // A click on the backdrop (the dialog itself, outside its panel) closes it.
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="pop-panel">
        <button type="button" className="pop-x" onClick={onClose} aria-label="Close">
          ×
        </button>
        {open && children}
      </div>
    </dialog>
  );
}

// The "small / large" switch for a list of cards, shown at the top of it.
export function SizeSwitch<T extends string>({ options, value, onChange }: { options: readonly { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="x-size" role="radiogroup" aria-label="Card size">
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value} data-size={o.value} onClick={() => onChange(o.value)}>
          <SizeIcon size={o.value} />
          {o.label}
        </button>
      ))}
    </div>
  );
}

function SizeIcon({ size }: { size: string }) {
  // Large: one wide block; medium: two; small: a grid of four.
  const rects =
    size === "large" ? [[3, 3, 18, 18]] : size === "medium" ? [[3, 3, 8, 18], [13, 3, 8, 18]] : [[3, 3, 8, 8], [13, 3, 8, 8], [3, 13, 8, 8], [13, 13, 8, 8]];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      {rects.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="2" />
      ))}
    </svg>
  );
}

// A size remembered per browser under `key`, read after hydration.
export function readSize<T extends string>(key: string, allowed: readonly { value: T }[]): T | null {
  try {
    const saved = localStorage.getItem(key);
    return allowed.some((s) => s.value === saved) ? (saved as T) : null;
  } catch {
    return null;
  }
}
export function saveSize(key: string, v: string) {
  try {
    localStorage.setItem(key, v);
  } catch {}
}
