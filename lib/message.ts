import { findType, profile } from "@/data/profile";
import type { Basket } from "@/lib/basket";

// The WhatsApp chat's pre-filled message when nothing was picked.
export const plainMessage = `${profile.contact.whatsappGreeting} ${profile.contact.whatsappClose}`;

// The WhatsApp message built from what a visitor added around the site
// (types, my websites they liked, ideas). Used by the Contact page's message
// box and the WhatsApp buttons, so whatever they added always goes along.
// Nothing added: just the greeting.
export function basketMessage(basket: Basket) {
  const types = basket.types.map(findType).filter((t) => t !== undefined);
  const sites = profile.projects.filter((p) => basket.sites.includes(p.title));
  if (!types.length && !sites.length && !basket.ideas.length) return plainMessage;
  const lines = [profile.contact.whatsappGreeting, ""];
  if (types.length) lines.push(`Website type: ${types.map((t) => t.title).join(", ")}`);
  if (sites.length) lines.push(`I want one like: ${sites.map((p) => `${p.title} (${p.href})`).join(", ")}`);
  if (basket.ideas.length) lines.push(`I'd like it to have: ${basket.ideas.join(", ")}`);
  lines.push("", profile.contact.whatsappClose);
  return lines.join("\n");
}
