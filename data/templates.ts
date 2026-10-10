// The free templates on /templates. Each one is a single, self-contained HTML
// file in data/templates/<slug>.html (no libraries): the page shows it live
// and hands out that same file as the code. Add one by dropping in a file and
// an entry here.
export type Template = {
  slug: string;
  title: string;
  kind: "3D" | "WebGL" | "Scroll";
  tier: "Free" | "Pro";
  color: string;
  blurb: string;
  features: string[];
  added: string; // YYYY-MM-DD, for "Newest first"
};

export const templates: Template[] = [
  {
    slug: "tilt-hero",
    title: "3D Tilt Hero",
    kind: "3D",
    tier: "Free",
    color: "var(--m-blue)",
    blurb: "A fintech hero with a layered card that tilts in 3D toward your cursor — pure CSS perspective, no 3D library.",
    features: ["CSS 3D layers", "Follows the cursor", "Idle sway on touch"],
    added: "2026-10-07",
  },
  {
    slug: "dot-globe",
    title: "Dot Globe",
    kind: "3D",
    tier: "Free",
    color: "var(--m-blue)",
    blurb: "A logistics landing page around a rotating dotted globe with glowing shipping routes, drawn on a plain canvas.",
    features: ["Canvas 3D projection", "Animated routes", "Re-themes from CSS"],
    added: "2026-10-10",
  },
  {
    slug: "cylinder-gallery",
    title: "Cylinder Gallery",
    kind: "3D",
    tier: "Free",
    color: "var(--m-coral)",
    blurb: "A photography portfolio whose projects wrap around a 3D cylinder you can spin by dragging or scrolling.",
    features: ["CSS 3D carousel", "Drag & scroll to spin", "Inline SVG artwork"],
    added: "2026-10-10",
  },
  {
    slug: "wave-terrain",
    title: "Wave Terrain",
    kind: "WebGL",
    tier: "Free",
    color: "var(--m-lime)",
    blurb: "A data-platform hero flying over a living wireframe terrain, rendered with raw WebGL shaders.",
    features: ["Raw WebGL shaders", "Colours from CSS tokens", "Tunable CONFIG"],
    added: "2026-10-10",
  },
  {
    slug: "depth-scroll",
    title: "Depth Scroll Story",
    kind: "Scroll",
    tier: "Free",
    color: "var(--m-lime)",
    blurb: "A fintech story where cards fly toward you through 3D space as you scroll, on a pinned stage.",
    features: ["Pinned 3D stage", "Scroll-driven depth", "Per-card accents"],
    added: "2026-10-10",
  },
  {
    slug: "book-launch",
    title: "3D Book Launch",
    kind: "3D",
    tier: "Free",
    color: "var(--m-coral)",
    blurb: "A book launch page with a real 3D hardcover that turns in space and swaps cover colours per edition.",
    features: ["CSS 3D book", "Edition colour swatches", "Animated @property colours"],
    added: "2026-10-10",
  },
];

export const findTemplate = (slug: string) => templates.find((t) => t.slug === slug);
