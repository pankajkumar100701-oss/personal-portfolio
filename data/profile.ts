// Edit this file to personalise the portfolio — every section reads from here.

export type Multitude = {
  n: string;
  slug: string;
  title: string;
  sub: string;
  x: number;
  y: number;
  depth: number;
  color: string;
  intro: string;
  points: string[];
  link?: { label: string; href: string };
};

// Used by the contact links below and the multitude pages' calls to action.
const email = "hello@example.com";

export type Project = {
  title: string;
  description: string; // one line: who it's for and what it does
  tags: string[];
  href: string; // the live site
  color: string; // accent, and the card's backdrop when there's no screenshot
  multitude: string; // slug of the option it belongs to, e.g. "rental"; it shows on that page
  image?: string; // screenshot in public/, e.g. "/work/my-site.jpg"
  year?: string;
  concept?: boolean; // not for a real client: shows a "Concept" label
};

export const profile = {
  name: "Pankaj Kumar",
  role: "Web Developer & UI Designer",
  tagline: "I build fast, playful and beautifully crafted web experiences.",
  location: "India",
  hero: {
    first: "Pankaj",
    accent: "Multitudes",
    eyebrow: "UI Designer / Website Developer",
    subline: "interfaces · websites · art · ideas",
  },
  // Floating nodes in the hero. x/y are % positions in the hero "world"; depth sets how fast each flies toward you on zoom.
  multitudes: [
    {
      n: "01", slug: "store", title: "Store", sub: "Shop / Cart / Checkout", x: 7, y: 22, depth: 1.05, color: "var(--m-lime)",
      intro: "Online stores built to sell — easy to browse on a phone, quick to pay for and simple to run.",
      points: ["Catalogues, carts and checkouts that convert", "UPI, card and cash-on-delivery payments", "Orders and stock that stay in sync"],
      link: { label: "Browse the stores", href: "#websites" },
    },
    {
      n: "02", slug: "painting-art", title: "Painting / Art", sub: "Colour / Form / Vision", x: 69, y: 13, depth: 0.92, color: "var(--m-coral)",
      intro: "Painting keeps my eye honest. Colour, composition and texture all feed back into the way I design for the screen.",
      points: ["Experiments with colour and form", "Sketchbooks full of half-finished ideas", "Art as a way of slowing down"],
    },
    {
      n: "03", slug: "twitter", title: "Twitter / X", sub: "Thoughts / Signals", x: 79, y: 47, depth: 1.18, color: "var(--m-blue)",
      intro: "Where I think out loud — notes on building, design, tech and whatever caught my attention this week.",
      points: ["Build-in-public updates", "Threads on web, design and tools", "Signals worth sharing"],
      link: { label: "Follow on X", href: "https://x.com/" },
    },
    {
      n: "04", slug: "education", title: "Education", sub: "Learn / Unlearn / Grow", x: 12, y: 63, depth: 0.82, color: "var(--m-lime)",
      intro: "Learning never really stopped after the classroom. I keep picking up new tools, ideas and ways of seeing.",
      points: ["Formal education and the foundations it gave me", "Self-taught everything else, one project at a time", "Unlearning habits that no longer serve"],
    },
    {
      n: "05", slug: "clubbing", title: "Clubbing", sub: "Music / Night / Energy", x: 42, y: 7, depth: 1.25, color: "var(--m-coral)",
      intro: "Music, lights and a room full of energy — nights out are where I recharge.",
      points: ["Favourite venues and sounds", "Music that ends up on my coding playlists", "The rhythm that carries into the work"],
    },
    {
      n: "06", slug: "parties", title: "Parties", sub: "People / Moments", x: 53, y: 82, depth: 0.9, color: "var(--m-blue)",
      intro: "Good people, good conversations, moments worth remembering.",
      points: ["Hosting and gathering friends", "Celebrations big and small", "Memories that outlast the night"],
    },
    {
      n: "07", slug: "restaurants", title: "Restaurants", sub: "Places / Taste", x: 2, y: 43, depth: 1.12, color: "var(--m-lime)",
      intro: "Always hunting for the next great plate — street stalls to sit-down dinners.",
      points: ["Places I keep going back to", "New spots worth the trip", "Notes on taste, service and atmosphere"],
    },
    {
      n: "08", slug: "recipes", title: "Recipes", sub: "Make / Taste / Repeat", x: 30, y: 78, depth: 0.76, color: "var(--m-coral)",
      intro: "Cooking is just building with ingredients — iterate until it tastes right.",
      points: ["Everyday recipes I swear by", "Kitchen experiments, wins and failures", "Endless cups of chai"],
    },
    {
      n: "09", slug: "rental", title: "Rental", sub: "Service / System / Ride", x: 76, y: 84, depth: 1.28, color: "var(--m-blue)",
      intro: "A rental service built on simple systems — easy booking, reliable rides.",
      points: ["How the service works", "The systems behind bookings and fleet", "What's coming next"],
    },
    {
      n: "10", slug: "business", title: "Business", sub: "Ideas / Products / Systems", x: 89, y: 27, depth: 0.88, color: "var(--m-lime)",
      intro: "Ideas that grow into products, and products that need good systems behind them.",
      points: ["Ventures I'm building and backing", "Product thinking beyond code", "Open to collaborations"],
      link: { label: "Get in touch", href: `mailto:${email}` },
    },
    {
      n: "11", slug: "medical", title: "Medical", sub: "Health / Care / Science", x: 21, y: 6, depth: 1.02, color: "var(--m-coral)",
      intro: "Health, care and the science behind it — the side of me that's curious about how people heal.",
      points: ["What I'm learning about health and medicine", "Care, habits and staying well", "Where tech can help people get better care"],
    },
    {
      n: "12", slug: "stay", title: "Stay", sub: "Rooms / Rest / Travel", x: 84, y: 65, depth: 1.08, color: "var(--m-blue)",
      intro: "Good places to stay — the homestays, hotels and hideaways worth booking again.",
      points: ["Stays I keep going back to", "What makes a place feel like home", "Tips for finding the right room on the road"],
    },
  ] as Multitude[],
  about: [
    "Hi, I'm Pankaj — a web developer. Over the past year I've worked on all kinds of websites: NGO sites, e-commerce storefronts, portfolios, landing pages and even browser games.",
    "I work mostly with React, Next.js and TypeScript, and I care about the details — motion, performance and interfaces that feel good to use.",
  ],
  stats: [
    { value: "10+", label: "Projects shipped" },
    { value: "1 yr", label: "Experience" },
    { value: "∞", label: "Cups of chai" },
  ],
  // The "now" list in the About section.
  now: [
    { label: "Building", value: "this portfolio, one multitude at a time" },
    { label: "Learning", value: "motion design & 3D on the web" },
    { label: "Open to", value: "freelance websites & collaborations" },
  ],
  skills: [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"] },
    { group: "Backend", items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Prisma"] },
    { group: "Tools", items: ["Git", "Figma", "Vercel", "Docker", "Linux"] },
  ],
  // Websites you've built: each shows in the "Websites" section of its
  // multitude's page, and all of them in the hero ("Websites I've built",
  // hidden while this is empty). e.g.
  // { title: "My site", description: "…", tags: ["Next.js"], href: "https://…", color: "#38bdf8",
  //   multitude: "rental", image: "/work/my-site.jpg", year: "2026" }
  projects: [] as Project[],
  // Swap in your real email (the `email` const above) and profile links here;
  // the site menu and the hero's "Open for projects" read from this.
  contact: {
    email,
    links: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
      { label: "Twitter / X", href: "https://x.com/" },
    ],
  },
};
