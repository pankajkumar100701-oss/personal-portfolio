"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import { useBasket } from "@/lib/basket";
import { useContact } from "@/lib/contact";
import { basketMessage } from "@/lib/message";

// A small "Help" button on every page (bottom-left, clear of the message
// pill): ways to reach me, the FAQ, and a note that any language is fine.
// A round WhatsApp button sits just above it, so I'm always one tap away.
export default function HelpButton() {
  const { mailto, whatsapp, whatsappCall } = useContact();
  // WhatsApp opens with whatever they've added around the site already in it.
  const basket = useBasket();
  const waText = basketMessage(basket, profile.contact.whatsappText);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  // Which page we're on, for the CSS that lifts the button clear of the home
  // hero's bottom bar. (Was `body:has(...)`, which made
  // every text change on the page — like the hero's zoom readout each scroll
  // frame — recalc the whole page's styles.)
  const path = usePathname();
  const at = path === "/" ? "home" : undefined;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="f-help" data-at={at} data-pill={(path !== "/contact" && basket.types.length + basket.sites.length + basket.ideas.length > 0) || undefined}>
      <div id={panelId} className="f-help-panel" data-open={open || undefined} inert={!open} role="dialog" aria-label="Help">
        <p className="f-help-title">Need a hand?</p>
        <p className="f-help-sub">Ask me anything. I usually reply within a few hours.</p>
        <div className="f-help-grid">
          <a href={whatsapp(waText)} target="_blank" rel="noopener noreferrer" onClick={close}>
            <b>WhatsApp</b>
            <small>Chat with me</small>
          </a>
          <a href={whatsappCall()} target="_blank" rel="noopener noreferrer" onClick={close}>
            <b>Call</b>
            <small>On WhatsApp only</small>
          </a>
          <a href={mailto} onClick={close}>
            <b>Email</b>
            <small>Write to me</small>
          </a>
          <Link href="/#faq" onClick={close}>
            <b>FAQ</b>
            <small>Prices, time & more</small>
          </Link>
          <Link href="/explore" onClick={close}>
            <b>Explore types</b>
            <small>Find your kind of site</small>
          </Link>
          <Link href="/contact" onClick={close}>
            <b>Talk to me</b>
            <small>No forms, just a chat</small>
          </Link>
        </div>
        <Link href="/contact" className="f-help-lang" onClick={close}>
          <b>You can write in your own language.</b> Tamil, Bengali, Marathi, Arabic, any language. Your message gets translated into English for me, so we can still talk easily. <span aria-hidden>→</span>
        </Link>
      </div>
      <a href={whatsapp(waText)} target="_blank" rel="noopener noreferrer" className="f-wa" aria-label="Chat with me on WhatsApp" title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.8 9.8 0 0 1-1.5-5.2c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.03 6.95 2.88a9.77 9.77 0 0 1 2.88 6.96c0 5.42-4.41 9.83-9.84 9.83zm8.37-18.2A11.76 11.76 0 0 0 12.05.13C5.5.13.17 5.46.17 12.01c0 2.1.55 4.14 1.59 5.94L.07 24l6.2-1.63a11.84 11.84 0 0 0 5.67 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.16-3.48-8.4z" />
        </svg>
      </a>
      <button ref={buttonRef} type="button" className="f-help-btn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
        <span aria-hidden>{open ? "×" : "?"}</span>
        <em className="f-help-label">Help</em>
      </button>
    </div>
  );
}
