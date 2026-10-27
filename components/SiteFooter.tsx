"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { useBasket } from "@/lib/basket";
import { useContact } from "@/lib/contact";
import { basketMessage } from "@/lib/message";

// The home page's footer, under Contact: who I am, the main pages, the legal
// pages and ways to reach me, then the copyright line.
export default function SiteFooter() {
  const { email, mailto, whatsapp } = useContact();
  const waText = basketMessage(useBasket());
  const year = new Date().getFullYear();
  return (
    <footer className="f-foot">
      <div className="h-wrap">
        <div className="f-foot-grid">
          <div className="f-foot-brand">
            <p className="f-foot-name">
              <span className="f-foot-mark" aria-hidden />
              {profile.hero.first} <em>{profile.hero.accent}</em>
            </p>
            <p className="f-foot-tag">Websites for shops, gyms, artists, restaurants &amp; more.</p>
            <p className="f-foot-note">Every site is designed and built by hand, by me.</p>
          </div>
          <nav aria-label="Explore">
            <h2>Explore</h2>
            <ul>
              <li>
                <Link href="/explore">Find your vibe</Link>
              </li>
              <li>
                <Link href="/work">My work</Link>
              </li>
              <li>
                <Link href="/templates">Templates</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Website">
            <h2>Website</h2>
            <ul>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </nav>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={whatsapp(waText)} target="_blank" rel="noopener noreferrer" className="f-foot-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.8 9.8 0 0 1-1.5-5.2c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.03 6.95 2.88a9.77 9.77 0 0 1 2.88 6.96c0 5.42-4.41 9.83-9.84 9.83zm8.37-18.2A11.76 11.76 0 0 0 12.05.13C5.5.13.17 5.46.17 12.01c0 2.1.55 4.14 1.59 5.94L.07 24l6.2-1.63a11.84 11.84 0 0 0 5.67 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.16-3.48-8.4z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={mailto} title={email} className="f-foot-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
                  </svg>
                  Email
                </a>
              </li>
              {profile.contact.links.map((l) => (
                <li key={l.label}>
                  {l.label === "Instagram" ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="f-foot-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                      </svg>
                      Instagram
                    </a>
                  ) : (
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="f-foot-bottom">
          <p>
            {profile.brand} © {year} · websites by {profile.hero.first} · {profile.location}
          </p>
          {/* Light theme's wallpaper photo is CC BY 2.0, which requires this credit. */}
          <p className="f-foot-credit">
            Paper photo by{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Free_crumpled_paper_texture_for_layers_(2978651767).jpg" target="_blank" rel="noopener noreferrer">
              Pink Sherbet Photography
            </a>{" "}
            (CC BY 2.0)
          </p>
        </div>
      </div>
    </footer>
  );
}
