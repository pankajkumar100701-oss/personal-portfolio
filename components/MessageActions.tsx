"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toggleInBasket, useBasket, writeBasket, type Basket } from "@/lib/basket";

// "Add to message": puts a website type (or one of my websites) into the
// visitor's message, which the Contact page turns into a WhatsApp / email.
export function AddToMessage({ kind, id, className = "", label = "Add to message" }: { kind: keyof Basket; id: string; className?: string; label?: string }) {
  const added = useBasket()[kind].includes(id);
  return (
    <button type="button" aria-pressed={added} onClick={() => toggleInBasket(kind, id)} className={`x-add ${className}`}>
      <span aria-hidden>{added ? "✓" : "+"}</span> {added ? "Added" : label}
    </button>
  );
}

// Shares a page of this site (the phone's share sheet, or copies the link),
// so a card can be sent straight to someone.
export function ShareLink({ path, title, className = "" }: { path: string; title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = new URL(path, location.origin).href;
    try {
      if (navigator.share && matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <button type="button" onClick={share} className={`x-share ${className}`} aria-live="polite">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      {copied ? "Link copied" : "Share link"}
    </button>
  );
}

// Floating reminder of what's in the message, on every page but Contact.
export function BasketPill() {
  const basket = useBasket();
  const pathname = usePathname();
  const count = basket.types.length + basket.sites.length;
  if (count === 0 || pathname === "/contact") return null;
  return (
    <div className="x-pill" role="status">
      <Link href="/contact">
        <b>{count}</b> in your message · Customise &amp; send <span aria-hidden>→</span>
      </Link>
      <button type="button" onClick={() => writeBasket({ types: [], sites: [] })} aria-label="Clear your message">
        ×
      </button>
    </div>
  );
}
