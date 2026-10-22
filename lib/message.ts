import { findType, profile } from "@/data/profile";
import type { Basket } from "@/lib/basket";

// The WhatsApp message built from what a visitor added around the site
// (types, my websites they liked, ideas). Used by the Contact page's message
// box and the WhatsApp buttons, so whatever they added always goes along.
// Nothing added: the short greeting (or `fallback`, if given).
export function basketMessage(basket: Basket, fallback?: string) {
  const types = basket.types.map(findType).filter((t) => t !== undefined);
  const sites = profile.projects.filter((p) => basket.sites.includes(p.title));
  const lines = ["Hi Pankaj! I saw your website and I'd like to talk about a website for me."];
  if (!types.length && !sites.length && !basket.ideas.length) return fallback ?? lines[0];
  lines.push("");
  if (types.length) lines.push(`Website type: ${types.map((t) => t.title).join(", ")}`);
  if (sites.length) lines.push(`I want one like: ${sites.map((p) => `${p.title} (${p.href})`).join(", ")}`);
  if (basket.ideas.length) lines.push(`I'd like it to have: ${basket.ideas.join(", ")}`);
  return lines.join("\n");
}
