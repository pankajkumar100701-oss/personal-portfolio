// Content for each multitude's page (/multitudes/<slug>). Every page has its own
// layout in components/multitudes/, and reads its words from here — edit this
// file to grow a page; add fields when a layout needs more.
//
// Everything below is starter content. Swap in your real projects, places,
// recipes and links as they come.

export const webDev = {
  // The hero terminal: commands ("cmd"), their output ("out") and a final "ok".
  terminal: [
    { kind: "cmd", text: "whoami" },
    { kind: "out", text: "pankaj — web developer & ui designer" },
    { kind: "cmd", text: "cat stack.txt" },
    { kind: "out", text: "react · next.js · typescript · tailwind · three.js" },
    { kind: "cmd", text: "ls ./i-build" },
    { kind: "out", text: "websites  e-commerce  landing-pages  web-apps" },
    { kind: "cmd", text: "npm run ship" },
    { kind: "ok", text: "✓ shipped — fast, polished and built with care" },
  ] as { kind: "cmd" | "out" | "ok"; text: string }[],
  services: [
    { title: "Websites", text: "Fast, responsive sites for brands, NGOs and creators." },
    { title: "E-commerce", text: "Storefronts that are easy to browse and easy to buy from." },
    { title: "Landing pages", text: "One page, one goal — built to convert." },
    { title: "Web apps", text: "Dashboards, tools and interactive experiences." },
  ],
  process: [
    { step: "Discover", text: "What you need, who it's for, what success looks like." },
    { step: "Design", text: "Layouts and a look that fit your brand." },
    { step: "Build", text: "Clean, fast code with React and Next.js." },
    { step: "Launch", text: "Deploy, test, and keep improving." },
  ],
};

export const art = {
  statement: "I paint to slow down. Colour first, then form, then whatever the canvas wants to become.",
  works: [
    { title: "Monsoon", medium: "Acrylic on canvas", year: "2025", art: "a", tall: true },
    { title: "Saffron Hours", medium: "Watercolour", year: "2025", art: "b" },
    { title: "City at 2am", medium: "Digital", year: "2024", art: "c" },
    { title: "Hills", medium: "Oil pastel", year: "2024", art: "d", tall: true },
    { title: "Static", medium: "Mixed media", year: "2024", art: "e" },
    { title: "Bloom", medium: "Acrylic", year: "2023", art: "f" },
  ],
};

export const twitter = {
  handle: "@pankaj",
  bio: "Web developer. Building in public. Chai > coffee.",
  posts: [
    { text: "Shipped a portfolio where you dive into the dot of an i. Scroll-driven, no WebGL, smooth on old laptops.", likes: 128, replies: 14, pinned: true },
    { text: "Hot take: most websites don't need a framework. Most portfolios do need personality.", likes: 64, replies: 22 },
    { text: "Today I learned: backdrop-filter over a moving background re-blurs every frame. My scroll jank is gone.", likes: 91, replies: 9 },
    { text: "Design tip — if it looks off, it's usually spacing. Then it's colour. It's almost never the font.", likes: 47, replies: 5 },
  ],
};

export const education = {
  timeline: [
    { when: "School", title: "Where it started", text: "Curious about how things work — and why they break." },
    { when: "College", title: "Formal foundations", text: "Computers, logic and the habit of learning on deadline." },
    { when: "2024", title: "First website", text: "Built something real, broke it, fixed it, shipped it." },
    { when: "2025", title: "10+ projects", text: "NGO sites, storefronts, games — learning by building." },
    { when: "Now", title: "Always learning", text: "Motion, 3D on the web, and better design." },
  ],
  learning: [
    { skill: "Motion design", level: 60 },
    { skill: "Three.js / WebGL", level: 40 },
    { skill: "UI design", level: 70 },
    { skill: "Backend & databases", level: 55 },
  ],
};

export const clubbing = {
  tagline: "Lights low. Volume up. Recharge.",
  nights: [
    { day: "FRI", name: "Deep House Fridays", place: "Somewhere loud", time: "22:00 — late" },
    { day: "SAT", name: "Techno Underground", place: "The basement", time: "23:00 — 04:00" },
    { day: "SUN", name: "Sunset Sessions", place: "Rooftop", time: "17:00 — 22:00" },
  ],
  playlist: ["Late Night Drive", "Warehouse Hours", "Focus but Make it Groovy", "Sunrise Set"],
};

export const parties = {
  moments: [
    { caption: "Birthday chaos", art: "a" },
    { caption: "Diwali night", art: "b" },
    { caption: "Rooftop hangout", art: "c" },
    { caption: "Game night", art: "d" },
    { caption: "New Year, new us", art: "e" },
    { caption: "Road trip stop", art: "f" },
  ],
  rules: ["Good music is non-negotiable", "Phones down, people up", "Someone has to make chai at 3am", "Everyone leaves with a story"],
};

export const restaurants = {
  places: [
    { name: "Corner Dhaba", cuisine: "North Indian", rating: 5, price: "₹", note: "The dal makhani that ruined all others." },
    { name: "Noodle Bar", cuisine: "Asian", rating: 4, price: "₹₹", note: "Spicy ramen, quick service." },
    { name: "Café Blue", cuisine: "Café", rating: 4, price: "₹₹", note: "Good coffee, better window seats." },
    { name: "Street Momos", cuisine: "Street food", rating: 5, price: "₹", note: "Steamed, fried, tandoori — all of it." },
    { name: "Trattoria", cuisine: "Italian", rating: 3, price: "₹₹₹", note: "Great pasta, slow on weekends." },
    { name: "South Spice", cuisine: "South Indian", rating: 5, price: "₹", note: "Crispy dosa, endless chutney." },
  ],
};

export const recipes = {
  featured: {
    title: "Masala Chai",
    time: "10 min",
    serves: "2",
    ingredients: ["2 cups water", "1 cup milk", "2 tsp tea leaves", "2 tsp sugar", "1 inch ginger, crushed", "2 cardamom pods"],
    steps: ["Boil water with ginger and cardamom.", "Add tea leaves, simmer 2 minutes.", "Add milk and sugar, bring to a boil.", "Strain and serve hot."],
  },
  more: [
    { title: "Maggi, upgraded", time: "8 min", tag: "Quick" },
    { title: "Paneer Bhurji", time: "20 min", tag: "Protein" },
    { title: "Lemon Rice", time: "15 min", tag: "Comfort" },
    { title: "Cold Coffee", time: "5 min", tag: "Drink" },
  ],
};

export const rental = {
  headline: "Rent a ride in minutes.",
  sub: "Simple booking, clean vehicles, fair prices.",
  fleet: [
    { name: "Scooter", detail: "City rides · 2 seats", price: 400 },
    { name: "Bike", detail: "Highways · 2 seats", price: 700 },
    { name: "Car", detail: "Family trips · 5 seats", price: 2000 },
  ],
  steps: ["Pick a vehicle", "Choose your dates", "Confirm & ride"],
};

export const business = {
  ventures: [
    { name: "Rental service", status: "Live", text: "Vehicle rentals with simple booking." },
    { name: "Web studio", status: "Live", text: "Websites for small businesses and NGOs." },
    { name: "Next idea", status: "Building", text: "Something new is in the works." },
    { name: "Your idea?", status: "Open", text: "Have a product in mind? Let's build it." },
  ],
  principles: ["Start small, ship fast", "Solve a real problem", "Systems over hustle", "Keep it simple"],
};
