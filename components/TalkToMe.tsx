"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { findType } from "@/data/profile";
import { addToBasket, useBasket, writeBasket } from "@/lib/basket";
import { useContact } from "@/lib/contact";
import { basketMessage } from "@/lib/message";

// The Contact page: no form, just ways to talk to me. One short message box
// (pre-filled with anything they added around the site) that opens WhatsApp,
// plus my number and email. The old step-by-step plan builder is kept in
// ~/pankajstudio/talk-to-me for when there are enough enquiries to need it.
export default function TalkToMe() {
  const basket = useBasket();
  const { email, phone, mailto, whatsapp } = useContact();
  // Their own edits to the message; null while it's generated.
  const [edited, setEdited] = useState<string | null>(null);

  // /contact?type=salon (e.g. from a type's page) adds that type to the message.
  useEffect(() => {
    const slug = new URLSearchParams(location.search).get("type");
    if (slug && findType(slug)) addToBasket("types", slug);
  }, []);

  const message = edited ?? basketMessage(basket);
  const picked = basket.types.length + basket.sites.length + basket.ideas.length > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
      <section className="m-card rounded-2xl p-5 sm:p-6">
        <label htmlFor="talk-message" className="font-sans text-xs uppercase tracking-[0.2em] text-muted">
          Your message <span className="normal-case tracking-normal">(change it if you like)</span>
        </label>
        <textarea id="talk-message" rows={5} className="c-input mt-3" value={message} onChange={(e) => setEdited(e.target.value)} />
        <a href={whatsapp(message)} target="_blank" rel="noopener noreferrer" className="u-cta-primary x-btn mt-4 w-full justify-center">
          Message me on WhatsApp <span aria-hidden>→</span>
        </a>
        {picked && (
          <button
            type="button"
            className="mt-3 text-xs text-muted underline underline-offset-2"
            onClick={() => {
              writeBasket({ types: [], sites: [], ideas: [] });
              setEdited(null);
            }}
          >
            Clear what I added
          </button>
        )}
        <p className="mt-4 text-sm leading-relaxed text-muted">Any language is fine. A rough idea is enough. I usually reply within a few hours.</p>
      </section>

      <aside className="m-card rounded-2xl p-5 sm:p-6">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted">Or reach me directly</p>
        <ul className="mt-4 grid gap-3 text-base">
          <li>
            <span className="block text-xs text-muted">Call or WhatsApp</span>
            {phone ? (
              <a href={`tel:+${phone}`} className="font-display text-2xl text-fg">
                +{phone.slice(0, 2)} {phone.slice(2, 7)} {phone.slice(7)}
              </a>
            ) : (
              <span className="font-display text-2xl text-fg">…</span>
            )}
          </li>
          <li>
            <span className="block text-xs text-muted">Email</span>
            <a href={mailto} className="break-all text-fg underline underline-offset-2">
              {email || "…"}
            </a>
          </li>
        </ul>
        <ol className="mt-6 grid gap-2 border-t border-line pt-5 text-sm leading-relaxed text-muted">
          <li>
            <b className="text-fg">1.</b> You message me.
          </li>
          <li>
            <b className="text-fg">2.</b> We hop on a quick call: you tell me what you need, I show you what I&apos;ve built.
          </li>
          <li>
            <b className="text-fg">3.</b> I send a simple plan and a fixed price. No pressure.
          </li>
        </ol>
        <p className="mt-6 text-xs text-muted">
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/terms" className="underline underline-offset-2">
            Terms &amp; Conditions
          </Link>
        </p>
      </aside>
    </div>
  );
}
