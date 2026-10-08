import Link from "next/link";
import { Heading } from "@/components/multitudes/ui";
import { AddToMessage, ShareLink } from "@/components/MessageActions";
import { profile, type WebsiteType } from "@/data/profile";

// On every type's page, before its websites: what a site like this can
// have, who it's for, and the ways to act on it — add it to the message,
// write the message now, or share this page's link with someone.
export default function TypeBrief({ t }: { t: WebsiteType }) {
  return (
    <section id="what-you-get" className="mt-24 scroll-mt-10">
      <Heading n="✦">What your {t.title} website can have</Heading>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {t.features.map((f, i) => (
          <li key={f} className="m-card flex items-baseline gap-4 rounded-2xl px-5 py-4">
            <span className="font-mono text-[0.625rem] tracking-[0.15em] text-ink">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-semibold">{f}</span>
          </li>
        ))}
      </ul>
      <div className="m-card mt-6 flex flex-col gap-5 rounded-2xl p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-xl text-soft">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink">Made for</span>
          <br />
          {t.idealFor}
        </p>
        <div className="x-type-actions !mt-0">
          <Link href={`/contact?type=${t.slug}`} className="m-cta m-cta-sm">
            Customise yours <span aria-hidden>→</span>
          </Link>
          <AddToMessage kind="types" id={t.slug} />
          <ShareLink path={`/multitudes/${t.slug}`} title={`${t.title} websites — ${profile.name}`} />
        </div>
      </div>
    </section>
  );
}
