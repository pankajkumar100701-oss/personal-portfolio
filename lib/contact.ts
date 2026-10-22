"use client";

import { useSyncExternalStore } from "react";
import { contactCodes } from "@/data/profile";
import { plainMessage } from "@/lib/message";

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
  const whatsapp = (text = plainMessage) => (phone ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : undefined);
  // My number takes calls on WhatsApp only (no regular calls): "Call" opens
  // a chat asking for one, and the call is one tap from there.
  const whatsappCall = () => whatsapp("Hi Pankaj! Can we do a quick WhatsApp call about a website?");
  return { email, phone, whatsapp, whatsappCall, mailto: email ? `mailto:${email}` : undefined };
}
