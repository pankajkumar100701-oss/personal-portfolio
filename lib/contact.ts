"use client";

import { useSyncExternalStore } from "react";
import { contactCodes, profile } from "@/data/profile";

const decode = (code: string) => [...atob(code)].reverse().join("");
const subscribe = () => () => {};

// My email and WhatsApp, decoded only in the browser after the page loads, so
// they're never in the server-rendered HTML that spam bots scrape. Until then
// (and on the server) they're empty: leave the link's href off meanwhile.
export function useContact() {
  const loaded = useSyncExternalStore(subscribe, () => true, () => false);
  const email = loaded ? decode(contactCodes.email) : "";
  const phone = loaded ? decode(contactCodes.whatsapp) : "";
  // A WhatsApp chat with me, the message box pre-filled with `text`.
  const whatsapp = (text = profile.contact.whatsappText) => (phone ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : undefined);
  return { email, phone, whatsapp, mailto: email ? `mailto:${email}` : undefined };
}
