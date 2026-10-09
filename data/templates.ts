// The free templates on /templates. Each one is a single, self-contained HTML
// file in data/templates/<slug>.html (no libraries): the page shows it live
// and hands out that same file as the code. Add one by dropping in a file and
// an entry here.
export type Template = {
  slug: string;
  title: string;
  kind: "3D" | "Shader" | "Professional";
  tier: "Free" | "Pro";
  color: string;
  blurb: string;
  features: string[];
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
  },
  {
    slug: "shader-landing",
    title: "Shader Gradient Landing",
    kind: "Shader",
    tier: "Free",
    color: "var(--m-coral)",
    blurb: "A SaaS landing page over a living, flowing gradient drawn by a WebGL shader, with glass cards on top.",
    features: ["Raw WebGL shader", "Reacts to the pointer", "Waitlist form"],
  },
  {
    slug: "studio-agency",
    title: "Studio Agency Page",
    kind: "Professional",
    tier: "Free",
    color: "var(--m-lime)",
    blurb: "A complete, polished agency site: masked headline, client marquee, services, work grid and counters on scroll.",
    features: ["Scroll reveals", "Count-up stats", "Scroll progress bar"],
  },
];

export const findTemplate = (slug: string) => templates.find((t) => t.slug === slug);
