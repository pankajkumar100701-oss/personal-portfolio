// Content for each multitude's page (/multitudes/<slug>). Every page has its own
// layout in components/multitudes/, and reads its words from here — edit this
// file to grow a page; add fields when a layout needs more.
//
// Everything below is starter content. Swap in your real projects, places,
// recipes and links as they come.

export const store = {
  // The hero terminal, as a shopper's session: commands ("cmd"), their
  // output ("out") and a final "ok".
  terminal: [
    { kind: "cmd", text: "open store" },
    { kind: "out", text: "248 products · 6 categories · search ready" },
    { kind: "cmd", text: "cart add handmade-mug --qty 2" },
    { kind: "out", text: "added to cart · ₹1,198" },
    { kind: "cmd", text: "checkout --pay upi" },
    { kind: "out", text: "razorpay · payment confirmed" },
    { kind: "cmd", text: "order track" },
    { kind: "ok", text: "✓ packed and shipped — arriving thursday" },
  ] as { kind: "cmd" | "out" | "ok"; text: string }[],
  features: [
    { title: "Catalogue", text: "Products, categories and search that feel quick on a phone." },
    { title: "Cart & checkout", text: "Fewer steps between liking something and buying it." },
    { title: "Payments", text: "UPI, cards and cash on delivery through Razorpay." },
    { title: "Orders", text: "Updates on WhatsApp and email, and a simple admin to run it." },
  ],
  process: [
    { step: "Plan", text: "Your products, prices and how you ship." },
    { step: "Design", text: "A storefront that looks like your brand." },
    { step: "Build", text: "Fast pages, real payments, stock that stays in sync." },
    { step: "Launch", text: "Go live, track orders and keep growing." },
  ],
};

export const fitness = {
  headline: "Stronger every week.",
  sub: "Modern equipment, expert trainers, flexible plans.",
  // price is per month; longer plans cost less per month.
  plans: [
    { name: "Monthly", months: 1, price: 1500, perks: ["Full gym access", "1 personal training session"] },
    { name: "Quarterly", months: 3, price: 1200, perks: ["Full gym access", "4 personal training sessions", "Diet plan"] },
    { name: "Yearly", months: 12, price: 900, perks: ["Full gym access", "Unlimited group classes", "Diet plan", "Free locker"] },
  ],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  classes: [
    { time: "06:00", name: "Morning Yoga", trainer: "Asha", days: ["Mon", "Wed", "Fri"] },
    { time: "07:00", name: "Strength Basics", trainer: "Rohit", days: ["Mon", "Tue", "Thu", "Sat"] },
    { time: "08:00", name: "HIIT Burn", trainer: "Karan", days: ["Tue", "Thu", "Sat"] },
    { time: "18:00", name: "Zumba", trainer: "Neha", days: ["Mon", "Wed", "Fri"] },
    { time: "19:00", name: "Power Lifting", trainer: "Rohit", days: ["Tue", "Wed", "Fri"] },
    { time: "19:30", name: "Stretch & Mobility", trainer: "Asha", days: ["Thu", "Sat"] },
  ],
  trainers: [
    { name: "Rohit", role: "Strength & conditioning", years: 8 },
    { name: "Asha", role: "Yoga & mobility", years: 6 },
    { name: "Karan", role: "HIIT & fat loss", years: 5 },
    { name: "Neha", role: "Dance fitness", years: 4 },
  ],
  steps: ["Book a free trial", "Meet your trainer", "Pick a plan & start"],
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
