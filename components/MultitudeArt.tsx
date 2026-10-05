import type { ReactNode } from "react";

// Per-multitude look for the page-to-page portal: a two-tone gradient, the
// text colour that reads on it, and a line icon (Lucide-style, 24×24, ISC).
// Every shape has pathLength="1" so CSS can draw it in with a dash offset.
export type MultitudeArt = { from: string; to: string; ink: string; icon: ReactNode };

const p = (d: string) => <path d={d} pathLength={1} />;

export const MULTITUDE_ART: Record<string, MultitudeArt> = {
  "web-development": {
    from: "#d7ff3f",
    to: "#14a37f",
    ink: "#07120c",
    icon: (
      <>
        {p("m16 18 6-6-6-6")}
        {p("m8 6-6 6 6 6")}
        {p("m14.5 4-5 16")}
      </>
    ),
  },
  "painting-art": {
    from: "#ff7a45",
    to: "#c2185b",
    ink: "#fff",
    icon: (
      <>
        {p("M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z")}
        {p("M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7")}
        {p("M14.5 17.5 4.5 15")}
      </>
    ),
  },
  twitter: {
    from: "#7b93ff",
    to: "#3b1fa8",
    ink: "#fff",
    icon: (
      <>
        {p("M7.9 20A9 9 0 1 0 4 16.1L2 22Z")}
        {p("M8 12h.01")}
        {p("M12 12h.01")}
        {p("M16 12h.01")}
      </>
    ),
  },
  education: {
    from: "#ffe66d",
    to: "#2f9e5a",
    ink: "#0d1f12",
    icon: (
      <>
        {p("M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z")}
        {p("M22 10v6")}
        {p("M6 12.5V16a6 3 0 0 0 12 0v-3.5")}
      </>
    ),
  },
  clubbing: {
    from: "#ff2bd6",
    to: "#2a0a7a",
    ink: "#fff",
    icon: (
      <>
        {p("M9 18V5l12-2v13")}
        <circle cx="6" cy="18" r="3" pathLength={1} />
        <circle cx="18" cy="16" r="3" pathLength={1} />
      </>
    ),
  },
  parties: {
    from: "#ffd23f",
    to: "#fb5607",
    ink: "#1f0b00",
    icon: (
      <>
        {p("M5.8 11.3 2 22l10.7-3.79")}
        {p("M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z")}
        {p("m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10")}
        {p("m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11-.11.7-.72 1.22-1.43 1.22H17")}
        {p("m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7")}
      </>
    ),
  },
  restaurants: {
    from: "#ff6b6b",
    to: "#7a1022",
    ink: "#fff",
    icon: (
      <>
        {p("M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2")}
        {p("M7 2v20")}
        {p("M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7")}
      </>
    ),
  },
  recipes: {
    from: "#ffb347",
    to: "#c2461c",
    ink: "#fff",
    icon: (
      <>
        {p("M17 21a1 1 0 0 0 1-1v-5.35c0-.46.32-.84.73-1.04a4 4 0 0 0-2.14-7.59 5 5 0 0 0-9.18 0 4 4 0 0 0-2.14 7.59c.41.2.73.58.73 1.04V20a1 1 0 0 0 1 1Z")}
        {p("M6 17h12")}
      </>
    ),
  },
  rental: {
    from: "#4cc9f0",
    to: "#3a3fd9",
    ink: "#fff",
    icon: (
      <>
        {p("m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4")}
        {p("m21 2-9.6 9.6")}
        <circle cx="7.5" cy="15.5" r="5.5" pathLength={1} />
      </>
    ),
  },
  business: {
    from: "#e9c46a",
    to: "#14284b",
    ink: "#fff",
    icon: (
      <>
        {p("M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16")}
        <rect x="2" y="6" width="20" height="14" rx="2" pathLength={1} />
      </>
    ),
  },
  medical: {
    from: "#5ee7d0",
    to: "#0b5e7a",
    ink: "#fff",
    icon: (
      <>
        {p("M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z")}
        {p("M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27")}
      </>
    ),
  },
  stay: {
    from: "#c9b6f2",
    to: "#22225e",
    ink: "#fff",
    icon: (
      <>
        {p("M2 4v16")}
        {p("M2 8h18a2 2 0 0 1 2 2v10")}
        {p("M2 17h20")}
        {p("M6 8v9")}
      </>
    ),
  },
};

// Fallback for a multitude added without its own art: a plain dot.
export const DEFAULT_ART: Omit<MultitudeArt, "from" | "to"> = {
  ink: "#fff",
  icon: <circle cx="12" cy="12" r="4" pathLength={1} />,
};

export function ArtIcon({ icon, className }: { icon: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {icon}
    </svg>
  );
}

// CSS custom properties (--from, --to, --art-ink) for an element styled with a
// multitude's gradient; falls back to its plain colour.
export function artVars(slug: string, color: string): Record<string, string> {
  const art = MULTITUDE_ART[slug];
  return { "--from": art?.from ?? color, "--to": art?.to ?? color, "--art-ink": (art ?? DEFAULT_ART).ink };
}

export const artIcon = (slug: string) => (MULTITUDE_ART[slug] ?? DEFAULT_ART).icon;
