"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { DEFAULT_PREFS, readPrefs, savePrefs, type Prefs } from "@/lib/prefs";

const settings: { key: keyof Prefs; label: string; options: { value: string; label: string }[] }[] = [
  {
    key: "theme",
    label: "Theme",
    options: [
      { value: "dark", label: "Dark" },
      { value: "light", label: "Light" },
      { value: "system", label: "System" },
    ],
  },
  {
    key: "text",
    label: "Text size",
    options: [
      { value: "default", label: "Default" },
      { value: "large", label: "Large" },
    ],
  },
  {
    key: "motion",
    label: "Motion",
    options: [
      { value: "full", label: "Full" },
      { value: "reduce", label: "Reduced" },
    ],
  },
];

// The logo doubles as the site menu: navigation, the trending website types,
// viewer settings and contact details in one panel.
export default function SiteMenu() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Stored prefs are only readable in the browser; sync them in after hydration.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setPrefs(readPrefs()), []);

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

  const update = (key: keyof Prefs, value: string) => {
    const next = { ...prefs, [key]: value } as Prefs;
    setPrefs(next);
    savePrefs(next);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="menu-trigger"
      >
        <span className="whitespace-nowrap text-lg font-semibold tracking-[-0.02em] sm:text-xl" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
          {profile.hero.first} <span className="font-normal italic">{profile.hero.accent}</span>
        </span>
        <span className="menu-caret" aria-hidden />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div id={panelId} className="menu-panel" data-open={open || undefined} inert={!open}>
        <MenuGroup title="Pages">
          <ul className="flex flex-wrap gap-1.5">
            <li>
              <Link href="/#top" className="menu-chip">Home</Link>
            </li>
            <li>
              <Link href="/explore" className="menu-chip">Explore types</Link>
            </li>
            <li>
              <Link href="/work" className="menu-chip">My work</Link>
            </li>
            <li>
              <Link href="/#about" className="menu-chip">About</Link>
            </li>
          </ul>
          {/* Contact is its own page, where visitors write their message to me. */}
          <Link href="/contact" className="menu-contact">
            <span>
              <b>Contact</b>
              <small>Customise your website plans &amp; send</small>
            </span>
            <span aria-hidden>→</span>
          </Link>
        </MenuGroup>

        <MenuGroup title="Trending websites">
          <ul className="flex flex-wrap gap-1.5">
            {profile.multitudes.map((m) => (
              <li key={m.slug}>
                <Link href={`/multitudes/${m.slug}`} className="menu-chip" style={{ "--c": m.color } as CSSProperties}>
                  {m.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/explore" className="menu-chip">
                All types →
              </Link>
            </li>
          </ul>
        </MenuGroup>

        <MenuGroup title="Settings">
          <div className="space-y-2.5">
            {settings.map((s) => (
              <div key={s.key} className="flex items-center justify-between gap-3">
                <span className="text-sm text-fg/70">{s.label}</span>
                <div role="radiogroup" aria-label={s.label} className="menu-segment">
                  {s.options.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      role="radio"
                      aria-checked={prefs[s.key] === o.value}
                      onClick={() => update(s.key, o.value)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MenuGroup>

        <MenuGroup title="Get in touch">
          <ul className="flex flex-wrap gap-1.5">
            <li>
              <a href={profile.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="menu-chip">
                WhatsApp ↗
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.contact.email}`} className="menu-chip" title={profile.contact.email}>
                Email ↗
              </a>
            </li>
            {profile.contact.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="menu-chip">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </MenuGroup>

        <p className="px-1 pt-1 text-xs text-fg/45">
          {profile.role} · {profile.location}
        </p>
      </div>
    </div>
  );
}

function MenuGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-fg/10 pb-4">
      <h2 className="mb-2.5 px-1 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-fg/45">{title}</h2>
      {children}
    </section>
  );
}
