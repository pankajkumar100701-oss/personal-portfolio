// The Privacy Policy (/privacy) and Terms & Conditions (/terms), in plain words, in the
// same block format as the blog. Update `updated` whenever either changes.
import type { Block } from "@/data/blog";

export type LegalDoc = { slug: "privacy" | "terms"; title: string; blurb: string; updated: string; body: Block[] };

export const legal: Record<LegalDoc["slug"], LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    blurb: "What this site keeps about you (almost nothing) and what happens to what you send me.",
    updated: "2026-10-22",
    body: [
      { p: "Short version: this site has no sign-ups, no forms that store your details and no ad trackers. I only get what you choose to send me." },
      { h: "What this site stores" },
      {
        list: [
          "Your theme and display choices, and anything you add to your message (website types, ideas), are saved in your own browser only. They never reach me unless you send them.",
          "The site is hosted on Vercel, which keeps basic server logs (like IP address and browser type) to keep the site running and safe.",
        ],
      },
      { h: "When you contact me" },
      { p: "If you message me on WhatsApp, call or email, I get your name, number or email and whatever you write. I use it only to reply, talk about your website and do the work. I don't sell it, share it for marketing, or add you to any mailing list." },
      { p: "WhatsApp and email have their own privacy policies, which apply to messages sent through them." },
      { h: "Your website's content" },
      { p: "While I build your site you may share logos, photos, text and logins (like your domain or hosting). I use them only for your project and keep logins private. Once the work is done you can ask me to delete anything you've sent." },
      { h: "Your choices" },
      { p: "You can ask me what I have about you, or ask me to delete it, at any time. Just message or email me." },
      { h: "Changes" },
      { p: "If this policy changes, the date at the top changes too." },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    blurb: "How working with me works: price, payments, changes and who owns the site.",
    updated: "2026-10-22",
    body: [
      { p: "These are the simple rules for any website I build for you. Before any work starts, I send you a plan with the pages, a fixed price and a date. That plan and these terms together are our agreement." },
      { h: "Price and payment" },
      {
        list: [
          "The price in the plan is fixed. If you ask for something new that wasn't in it, I tell you the extra cost before doing it.",
          "Half is paid to start, half when you've seen the finished site and are happy with it, before it goes live.",
          "Payment is by UPI or bank transfer, or PayPal for clients outside India.",
          "The first half covers the planning and design work, so it can't be refunded once the design has started.",
        ],
      },
      { h: "Changes" },
      { p: "You see the design before I build it and the site before it goes live, with two rounds of changes at each step included in the price." },
      { h: "Your part" },
      { p: "The date in the plan depends on getting your text, photos and logo on time. If they come late, the date moves with them. You confirm you have the right to use everything you send me (photos, logos, text)." },
      { h: "Who owns the site" },
      { p: "Once it's fully paid, the site and its content are yours. The domain and hosting are set up in your name. I may show the finished site in my portfolio unless you ask me not to." },
      { h: "After launch" },
      { p: "Small fixes in the first month are free. After that, changes are paid per change or through a monthly maintenance plan, as we agree." },
      { h: "Limits" },
      { p: "I build every site with care, but I can't promise a set number of visitors, sales or a top spot on Google. I'm not responsible for outages or changes at third-party services like hosting, domain providers, payment gateways or WhatsApp." },
      { h: "Questions" },
      { p: "If anything here is unclear, ask me before we start. These terms follow the laws of India." },
    ],
  },
};
