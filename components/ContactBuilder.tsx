"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { ArtIcon, artIcon, artVars } from "@/components/MultitudeArt";
import { allTypes, findType, profile, whatsappLink } from "@/data/profile";
import { addToBasket, toggleInBasket, useBasket, writeBasket } from "@/lib/basket";

// Ideas that fit any kind of site, offered next to the chosen types' own.
const EXTRAS = ["WhatsApp chat button", "Google Maps & SEO", "Hindi + English", "Reviews section", "Blog / updates", "Admin panel to edit content", "Domain & hosting setup"];
const BUDGETS = ["Not sure yet", "Under ₹10k", "₹10k – ₹25k", "₹25k – ₹50k", "₹50k+"];
const TIMELINES = ["Flexible", "ASAP", "2–4 weeks", "1–2 months"];
// Ideas shown before "Show more" (chosen ones always show).
const IDEAS_SHOWN = 8;
const trending = new Set(profile.multitudes.map((m) => m.slug));

// The Contact page: the visitor builds their own message — who they are,
// the kinds of site they want, sites of mine they like, the ideas they want
// in it — sees it written out (and can edit it), then sends it to me on
// WhatsApp or by email.
export default function ContactBuilder() {
  const basket = useBasket();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const [notes, setNotes] = useState("");
  // Their own edits to the written-out message; null while it's generated.
  const [edited, setEdited] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // The long lists start short (the trending types, the first ideas): on a
  // phone the whole lot is several screens of chips.
  const [allTypesShown, setAllTypesShown] = useState(false);
  const [allIdeasShown, setAllIdeasShown] = useState(false);

  // /contact?type=salon (e.g. from a type's page) adds that type to the message.
  useEffect(() => {
    // Adds, never toggles (dev mode runs effects twice).
    const slug = new URLSearchParams(location.search).get("type");
    if (slug && findType(slug)) addToBasket("types", slug);
  }, []);

  const types = basket.types.map(findType).filter((t) => t !== undefined);
  const sites = profile.projects.filter((p) => basket.sites.includes(p.title));
  // The chosen types' ideas first, then the general ones, without repeats.
  const ideaOptions = [...new Set([...types.flatMap((t) => t.features), ...EXTRAS])];
  const toggleIdea = (f: string) => setIdeas((list) => (list.includes(f) ? list.filter((x) => x !== f) : [...list, f]));

  const generated = (() => {
    const lines = ["Hi Pankaj! I saw your portfolio and I'd like a website.", ""];
    if (name) lines.push(`Name: ${name}`);
    if (business) lines.push(`Business: ${business}${city ? `, ${city}` : ""}`);
    else if (city) lines.push(`City: ${city}`);
    if (phone) lines.push(`Phone / WhatsApp: ${phone}`);
    if (email) lines.push(`Email: ${email}`);
    lines.push("");
    if (types.length) lines.push(`Website type: ${types.map((t) => t.title).join(", ")}`);
    if (sites.length) lines.push(`I like these sites of yours: ${sites.map((p) => `${p.title} (${p.href})`).join(", ")}`);
    const chosen = ideas.filter((f) => ideaOptions.includes(f));
    if (chosen.length) lines.push(`I'd like it to have: ${chosen.join(", ")}`);
    lines.push(`Budget: ${budget}`, `Timeline: ${timeline}`);
    if (notes.trim()) lines.push("", "About my idea:", notes.trim());
    lines.push("", "Could you share a plan and a price? Thanks!");
    return lines.join("\n");
  })();

  const message = edited ?? generated;
  const ready = name.trim() !== "" && (phone.trim() !== "" || email.trim() !== "");
  const subject = `Website enquiry — ${name || "from your portfolio"}${business ? ` (${business})` : ""}`;

  const shownTypes = allTypes.filter((t) => allTypesShown || trending.has(t.slug) || basket.types.includes(t.slug));
  const shownIdeas = ideaOptions.filter((f, i) => allIdeasShown || i < IDEAS_SHOWN || ideas.includes(f));
  const waHref = whatsappLink(message);
  // Phones: the bar's "Send" before the form is filled takes them to the name.
  const toDetails = () => {
    const el = document.getElementById("c-name");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="c-layout">
      <div className="space-y-6">
        <Step n="01" title="About you">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field id="c-name" label="Your name *" value={name} onChange={setName} autoComplete="name" />
            <Field label="Business / brand" value={business} onChange={setBusiness} autoComplete="organization" />
            <Field label="Phone / WhatsApp" value={phone} onChange={setPhone} type="tel" autoComplete="tel" placeholder="+91 …" />
            <Field label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" />
            <Field label="City" value={city} onChange={setCity} autoComplete="address-level2" />
          </div>
          <p className="mt-3 text-xs text-muted">Add a phone number or an email (or both) so I can reply.</p>
        </Step>

        <Step n="02" title="What kind of website?">
          <ul className="flex flex-wrap gap-2">
            {shownTypes.map((t) => (
              <li key={t.slug} style={{ "--c": t.color, ...artVars(t.slug, t.color) } as CSSProperties}>
                <button type="button" className="c-type" aria-pressed={basket.types.includes(t.slug)} onClick={() => toggleInBasket("types", t.slug)}>
                  <ArtIcon icon={artIcon(t.slug)} />
                  {t.title}
                </button>
              </li>
            ))}
          </ul>
          {allTypes.length > trending.size && (
            <button type="button" className="c-more" onClick={() => setAllTypesShown((v) => !v)}>
              {allTypesShown ? "Show trending only" : `+ ${allTypes.length - shownTypes.length} more types`}
            </button>
          )}
          <p className="mt-3 text-xs text-muted">
            Not sure? <Link href="/explore" className="underline underline-offset-2">Explore every type</Link> with examples.
          </p>
        </Step>

        {profile.projects.length > 0 && (
          <Step n="03" title="Sites of mine you like (optional)">
            <ul className="flex flex-wrap gap-2">
              {profile.projects.map((p) => (
                <li key={p.title} style={{ "--c": p.color } as CSSProperties}>
                  <button type="button" className="c-type c-site" aria-pressed={basket.sites.includes(p.title)} onClick={() => toggleInBasket("sites", p.title)}>
                    <i aria-hidden />
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </Step>
        )}

        <Step n="04" title="Ideas to include">
          <ul className="flex flex-wrap gap-2">
            {shownIdeas.map((f) => (
              <li key={f}>
                <button type="button" className="m-pill" aria-pressed={ideas.includes(f)} onClick={() => toggleIdea(f)}>
                  {f}
                </button>
              </li>
            ))}
          </ul>
          {ideaOptions.length > IDEAS_SHOWN && (
            <button type="button" className="c-more" onClick={() => setAllIdeasShown((v) => !v)}>
              {allIdeasShown ? "Show fewer" : `+ ${ideaOptions.length - shownIdeas.length} more ideas`}
            </button>
          )}
          {types.length === 0 && <p className="mt-3 text-xs text-muted">Pick a type above for ideas made for it.</p>}
        </Step>

        <Step n="05" title="Budget & timeline">
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-muted">Budget</p>
          <Pills options={BUDGETS} value={budget} onChange={setBudget} />
          <p className="mb-2 mt-5 text-xs uppercase tracking-[0.15em] text-muted">When do you need it?</p>
          <Pills options={TIMELINES} value={timeline} onChange={setTimeline} />
        </Step>

        <Step n="06" title="Anything else?">
          <textarea
            className="c-input min-h-28"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What you do, who your customers are, sites you like, colours…"
            aria-label="Anything else"
          />
        </Step>
      </div>

      <aside id="your-message" className="c-preview scroll-mt-4">
        <div className="m-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink">Your message</p>
            {edited !== null && (
              <button type="button" className="text-xs text-muted underline underline-offset-2" onClick={() => setEdited(null)}>
                Undo my edits
              </button>
            )}
          </div>
          <textarea className="c-input c-message" value={message} onChange={(e) => setEdited(e.target.value)} aria-label="Your message (you can edit it)" />
          <p className="mt-2 text-xs text-muted">{edited === null ? "Written from your answers. Type in it to change anything." : "Edited by you. Changes above won't update it now."}</p>

          {!ready && <p className="c-need">Add your name and a phone or email to send.</p>}
          <div className="mt-4 grid gap-2">
            <a
              href={ready ? waHref : undefined}
              aria-disabled={!ready}
              target="_blank"
              rel="noopener noreferrer"
              className="u-cta-primary x-btn justify-center"
            >
              Send on WhatsApp <span aria-hidden>→</span>
            </a>
            <a
              href={ready ? `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}` : undefined}
              aria-disabled={!ready}
              className="u-cta-ghost x-btn justify-center"
            >
              Send by email
            </a>
            <button type="button" onClick={copy} className="x-share justify-center" aria-live="polite">
              {copied ? "Copied" : "Copy message"}
            </button>
          </div>
          {(basket.types.length > 0 || basket.sites.length > 0) && (
            <button type="button" className="mt-4 text-xs text-muted underline underline-offset-2" onClick={() => writeBasket({ types: [], sites: [] })}>
              Clear chosen types &amp; sites
            </button>
          )}
          <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted">
            Or reach me directly: <a href={`mailto:${profile.contact.email}`} className="underline underline-offset-2">{profile.contact.email}</a>
          </p>
        </div>
      </aside>

      {/* Phones: the form is long, so seeing the message and sending it stay one tap away. */}
      <div className="c-bar">
        <a href="#your-message" className="c-bar-peek">
          Your message <span aria-hidden>↓</span>
        </a>
        {ready ? (
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="u-cta-primary x-btn justify-center">
            Send on WhatsApp <span aria-hidden>→</span>
          </a>
        ) : (
          <button type="button" onClick={toDetails} className="u-cta-primary x-btn justify-center">
            Add your name &amp; phone
          </button>
        )}
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="m-card rounded-2xl p-5 sm:p-6">
      <h2 className="mb-4 flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-ink">{n}</span> {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, ...rest }: { label: string; value: string; onChange: (v: string) => void; id?: string; type?: string; autoComplete?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted">{label}</span>
      <input className="c-input" value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
    </label>
  );
}

function Pills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={value === o} className="m-pill" onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}
