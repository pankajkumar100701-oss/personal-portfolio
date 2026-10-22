// The home page's FAQ (components/FaqSection.tsx). Each answer is a few short
// paragraphs; `link` adds a button under it. Maintenance and domain costs
// come from data/pricing.ts.
import { allTypes } from "@/data/profile";
import { domainHosting, maintenance, money, startsAt } from "@/data/pricing";

export type Faq = { q: string; a: string[]; link?: { label: string; href: string } };

export const faqs: Faq[] = [
  {
    q: "How much does a website cost?",
    a: [
      `Websites start from ${money(startsAt)}. The final price depends on what you're looking for and the time it takes me to build it.`,
      "Just message me what you need. We'll have a quick chat and I'll send a fixed price before any work starts, so there are no surprises later.",
    ],
    link: { label: "Talk to me", href: "/contact" },
  },
  {
    q: "How long does it take?",
    a: [
      "Most sites are ready within a week: a day or two for the plan, 1 to 2 days for the design and 1 to 2 days to build. Bigger sites like online stores can take a little longer.",
      "The biggest thing that speeds it up is having your photos, text and logo ready. If you need it sooner, ask and I'll tell you honestly whether it's possible.",
    ],
  },
  {
    q: "What kinds of websites can you build?",
    a: [
      `Pretty much anything a business or a person needs. Right now I list ${allTypes.length} types: shops, restaurants, gyms, salons, clinics, schools, hotels, travel, real estate, NGOs, portfolios and more.`,
      "If yours isn't on the list, ask anyway. Chances are I can build it.",
    ],
    link: { label: "Explore every type", href: "/explore" },
  },
  {
    q: "What do I need to give you?",
    a: [
      "Your business name and logo (if you have one), a few good photos, your phone number and address, and a rough idea of what you want people to do on the site: call you, book, buy or visit.",
      "Don't have a logo or good photos? That's fine. I can help with a simple logo and use quality stock photos to start with.",
    ],
  },
  {
    q: "What happens after the site goes live?",
    a: [
      `I'm still around. Small fixes in the first month are free. After that, maintenance starts at ${money(maintenance.from)} a month and goes up to ${money(maintenance.to)}, depending on what your site needs:`,
      `${money(maintenance.small.from)} to ${money(maintenance.small.to)} a month for small changes: updating text, prices and photos, plus keeping the site fast, secure and working on new phones.`,
      `${money(maintenance.big.from)} to ${money(maintenance.big.to)} a month for bigger work: adding new pages, changing whole sections, or a big update to the design.`,
      "Don't want a monthly plan? That's fine too. Just pay when you need a change.",
    ],
  },
  {
    q: "Do I need to buy a domain and hosting?",
    a: [
      `Yes, a domain (like yourshop.in) and hosting are needed to put any site online. Together they usually cost ${money(domainHosting.from)} to ${money(domainHosting.to)} a year, paid to the provider.`,
      "I'll set both up for you in your own name, so the site always belongs to you. Many small sites can be hosted for free, and I'll tell you if yours can.",
    ],
  },
  {
    q: "How do payments work?",
    a: [
      "Half to start, half when you've seen the finished site and are happy with it, just before it goes live. UPI, bank transfer, or PayPal for clients outside India.",
    ],
  },
  {
    q: "Can I ask for changes?",
    a: [
      "Of course. You see the design before I build it and the site before it goes live, with two rounds of changes at each step included in the price.",
      "If you change your mind about something big later (a whole new section, say), I'll tell you what it costs before doing it.",
    ],
  },
  {
    q: "Can I update the site myself?",
    a: [
      "If you want to, yes. I can add a simple admin panel where you change prices, photos, menus or products yourself, no coding needed. Or just send me a WhatsApp and I'll do it.",
    ],
  },
  {
    q: "Will my site show up on Google?",
    a: [
      "Every site I build is set up for Google from day one: fast pages, proper titles, a sitemap, and your Google Business Profile and Maps linked so people nearby can find you.",
      "Ranking at the top for busy searches takes time and regular posts, and I'll be honest with you about that. I can help with blogs too.",
    ],
  },
  {
    q: "Can the site be in Hindi or another language?",
    a: [
      "Yes. I can build your site in Hindi, English or both, with a simple switch between them.",
      "And you can write to me in any language you like. We'll figure it out together.",
    ],
    link: { label: "Talk to me", href: "/contact" },
  },
  {
    q: "Do you work with clients outside India?",
    a: [
      "Yes, happily. I already talk to clients on WhatsApp, email and video calls, so we can work together from anywhere, and I'll fit calls around your time zone.",
      "Message me on WhatsApp or email and I'll quote in your currency. You can pay by PayPal or bank transfer.",
    ],
  },
];
