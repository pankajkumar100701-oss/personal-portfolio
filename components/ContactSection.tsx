"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { useBasket } from "@/lib/basket";
import { useContact } from "@/lib/contact";
import { basketMessage } from "@/lib/message";

// Instagram's logo, in its pink, for the Instagram button.
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="u-mail" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="#e1306c" />
  </svg>
);

// The home page's last screen: the way to the Contact page (quick ways to
// reach me), plus WhatsApp, email and Instagram.
export default function ContactSection() {
  const { contact } = profile;
  const { email, mailto, whatsapp } = useContact();
  const waText = basketMessage(useBasket());
  return (
    <section id="contact" className="h-sec h-contact" aria-labelledby="contact-title">
      <div className="h-wrap">
        <p className="h-kicker">Contact</p>
        <h2 id="contact-title" className="h-title h-title-big">
          Want a website of your own?
          <br />
          <em>Let&apos;s talk.</em>
        </h2>
        <p className="h-text">
          Tell me about your business or idea — even a rough one is fine. Message me on WhatsApp, we&apos;ll have a quick chat, and I&apos;ll send a plan and a price. No strings attached.
        </p>
        <div className="h-cta">
          <Link href="/contact" className="u-cta-primary">
            Talk to me <span aria-hidden>→</span>
          </Link>
          <a href={whatsapp(waText)} target="_blank" rel="noopener noreferrer" className="u-cta-ghost">
            Chat on WhatsApp <span aria-hidden>→</span>
          </a>
          <a href={mailto} className="u-cta-ghost">
            {email || "Email me"}
          </a>
          {contact.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="u-cta-ghost">
              {l.label === "Instagram" && <InstagramIcon />}
              {l.label} <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
