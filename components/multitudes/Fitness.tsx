"use client";

import { useState } from "react";
import { fitness } from "@/data/multitudes";
import { profile, type Multitude } from "@/data/profile";
import { Heading } from "./ui";

// Gym / Fitness: a gym landing page with a plan picker, the week's classes,
// trainers and how to join. "Book a free trial" opens an email for now.
export default function Fitness({ m }: { m: Multitude }) {
  const [pick, setPick] = useState(fitness.plans[1].name);
  const [day, setDay] = useState(fitness.days[0]);
  const plan = fitness.plans.find((p) => p.name === pick)!;
  const save = Math.round((1 - plan.price / fitness.plans[0].price) * 100);
  const classes = fitness.classes.filter((c) => c.days.includes(day));
  const mail = `mailto:${profile.contact.email}?subject=${encodeURIComponent(`Free trial: ${pick} plan`)}`;

  return (
    <div className="space-y-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <header className="m-rise">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink">{m.sub}</p>
          <h1 className="mt-4 text-[clamp(2.75rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">{fitness.headline}</h1>
          <p className="mt-6 max-w-xl text-lg text-soft">{fitness.sub} {m.intro}</p>
        </header>

        <form className="m-card m-rise space-y-5 rounded-3xl p-6 sm:p-8" style={{ animationDelay: "0.1s" }} onSubmit={(e) => e.preventDefault()}>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted">Pick a plan</p>
          <div className="grid grid-cols-3 gap-2">
            {fitness.plans.map((p) => (
              <button key={p.name} type="button" aria-pressed={pick === p.name} onClick={() => setPick(p.name)} className="m-option">
                {p.name}
              </button>
            ))}
          </div>
          <ul className="space-y-2 text-soft">
            {plan.perks.map((perk) => (
              <li key={perk} className="flex gap-2"><span className="text-ink" aria-hidden>✓</span>{perk}</li>
            ))}
          </ul>
          <div className="flex items-end justify-between border-t border-line pt-5">
            <span className="text-sm text-muted">
              {save > 0 ? `Save ${save}%` : "No lock-in"}
              {plan.months > 1 && <><br />₹{(plan.price * plan.months).toLocaleString("en-IN")} total</>}
            </span>
            <span className="text-4xl font-bold">₹{plan.price.toLocaleString("en-IN")}<span className="text-base font-normal text-muted">/mo</span></span>
          </div>
          <a href={mail} className="m-cta w-full justify-center">Book a free trial →</a>
        </form>
      </div>

      <section>
        <Heading n="01">Classes this week</Heading>
        <div role="group" aria-label="Pick a day" className="mb-8 flex flex-wrap gap-2">
          {fitness.days.map((d) => (
            <button key={d} type="button" aria-pressed={day === d} onClick={() => setDay(d)} className="m-pill">
              {d}
            </button>
          ))}
        </div>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {classes.map((c) => (
            <li key={`${day}-${c.name}`} className="m-card m-lift m-pop flex items-center gap-5 rounded-2xl p-6">
              <span className="font-mono text-2xl text-ink">{c.time}</span>
              <div>
                <h3 className="text-xl font-semibold">{c.name}</h3>
                <p className="text-sm text-muted">with {c.trainer}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading n="02">The trainers</Heading>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {fitness.trainers.map((t) => (
            <li key={t.name} className="m-card m-lift rounded-2xl p-6">
              <span className="m-avatar">{t.name[0]}</span>
              <h3 className="mt-5 text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-muted">{t.role}</p>
              <p className="mt-3 text-sm text-soft">{t.years} yrs experience</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Heading n="03">How to join</Heading>
        <ol className="m-steps grid gap-6 md:grid-cols-3">
          {fitness.steps.map((s) => (
            <li key={s}><h3 className="text-2xl font-semibold">{s}</h3></li>
          ))}
        </ol>
      </section>
    </div>
  );
}
