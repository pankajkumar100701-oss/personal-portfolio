"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { useBasket } from "@/lib/basket";
import { useContact } from "@/lib/contact";
import { basketMessage } from "@/lib/message";

// WhatsApp's logo, in its green, for "Chat on WhatsApp".
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="#25d366" className="u-mail" aria-hidden>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.8 9.8 0 0 1-1.5-5.2c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.03 6.95 2.88a9.77 9.77 0 0 1 2.88 6.96c0 5.42-4.41 9.83-9.84 9.83zm8.37-18.2A11.76 11.76 0 0 0 12.05.13C5.5.13.17 5.46.17 12.01c0 2.1.55 4.14 1.59 5.94L.07 24l6.2-1.63a11.84 11.84 0 0 0 5.67 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.16-3.48-8.4z" />
  </svg>
);

// A speech bubble for "Talk to me" and an envelope for the email button.
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="u-mail" aria-hidden>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="u-mail" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
);

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
            <ChatIcon /> Talk to me <span aria-hidden>→</span>
          </Link>
          <a href={whatsapp(waText)} target="_blank" rel="noopener noreferrer" className="u-cta-ghost">
            <WhatsAppIcon /> Chat on WhatsApp <span aria-hidden>→</span>
          </a>
          <a href={mailto} className="u-cta-ghost">
            <MailIcon /> {email || "Email me"}
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
