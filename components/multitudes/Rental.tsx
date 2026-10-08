"use client";

import { useState } from "react";
import { rental } from "@/data/multitudes";
import { profile, type WebsiteType } from "@/data/profile";
import { Heading } from "./ui";

// Rental: a service landing page with fleet, steps and a quote calculator.
// "Request booking" opens an email for now — wire it to a real backend later.
export default function Rental({ m }: { m: WebsiteType }) {
  const [pick, setPick] = useState(rental.fleet[0].name);
  const [days, setDays] = useState(2);
  const vehicle = rental.fleet.find((f) => f.name === pick)!;
  const total = vehicle.price * days;
  const mail = `mailto:${profile.contact.email}?subject=${encodeURIComponent(`Rental: ${pick} for ${days} day(s)`)}`;

  return (
    <div className="space-y-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <header className="m-rise">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink">{m.sub}</p>
          <h1 className="mt-4 text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">{rental.headline}</h1>
          <p className="mt-6 max-w-xl text-lg text-soft">{rental.sub} {m.intro}</p>
        </header>

        <form className="m-card m-rise space-y-5 rounded-3xl p-6 sm:p-8" style={{ animationDelay: "0.1s" }} onSubmit={(e) => e.preventDefault()}>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted">Get a quote</p>
          <div className="grid grid-cols-3 gap-2">
            {rental.fleet.map((f) => (
              <button key={f.name} type="button" aria-pressed={pick === f.name} onClick={() => setPick(f.name)} className="m-option">
                {f.name}
              </button>
            ))}
          </div>
          <label className="block">
            <span className="flex justify-between text-sm"><span>Days</span><span className="font-mono">{days}</span></span>
            <input type="range" min={1} max={14} value={days} onChange={(e) => setDays(+e.target.value)} className="m-range mt-3 w-full" />
          </label>
          <div className="flex items-end justify-between border-t border-line pt-5">
            <span className="text-sm text-muted">₹{vehicle.price}/day × {days}</span>
            <span className="text-4xl font-bold">₹{total.toLocaleString("en-IN")}</span>
          </div>
          <a href={mail} className="m-cta w-full justify-center">Request booking →</a>
        </form>
      </div>

      <section>
        <Heading n="01">The fleet</Heading>
        <div className="grid gap-4 md:grid-cols-3">
          {rental.fleet.map((f, i) => (
            <button key={f.name} type="button" onClick={() => setPick(f.name)} aria-pressed={pick === f.name} className="m-card m-lift m-fleet rounded-2xl p-6 text-left">
              <Vehicle i={i} />
              <h3 className="mt-6 text-2xl font-bold">{f.name}</h3>
              <p className="text-sm text-muted">{f.detail}</p>
              <p className="mt-4 text-lg"><b>₹{f.price}</b> <span className="text-muted">/ day</span></p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <Heading n="02">How it works</Heading>
        <ol className="m-steps grid gap-6 md:grid-cols-3">
          {rental.steps.map((s) => (
            <li key={s}><h3 className="text-2xl font-semibold">{s}</h3></li>
          ))}
        </ol>
      </section>
    </div>
  );
}

// Simple line icons: scooter, bike, car.
function Vehicle({ i }: { i: number }) {
  const paths = [
    "M10 44h10m20 0h12M52 44a6 6 0 1 0 12 0 6 6 0 0 0-12 0ZM8 44a6 6 0 1 0 12 0 6 6 0 0 0-12 0Zm6 0 8-20h10l6 14h14M24 24h-6m40 20-4-18h6",
    "M14 44a8 8 0 1 0 16 0 8 8 0 0 0-16 0Zm36 0a8 8 0 1 0 16 0 8 8 0 0 0-16 0ZM22 44l12-16h14l10 16M34 28l-4-8h-6m24 8 4-8h6M40 44l8-16",
    "M8 42V32l8-12h32l10 12h6v10h-6M8 42h6m14 0h22M14 42a7 7 0 1 0 14 0 7 7 0 0 0-14 0Zm36 0a7 7 0 1 0 14 0 7 7 0 0 0-14 0ZM20 32h38M34 20v12",
  ];
  return (
    <svg viewBox="0 0 72 56" className="h-16 w-20 text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[i % paths.length]} />
    </svg>
  );
}
