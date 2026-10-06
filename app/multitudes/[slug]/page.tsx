import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ComponentType } from "react";
import Art from "@/components/multitudes/Art";
import Business from "@/components/multitudes/Business";
import Clubbing from "@/components/multitudes/Clubbing";
import Education from "@/components/multitudes/Education";
import Fitness from "@/components/multitudes/Fitness";
import Parties from "@/components/multitudes/Parties";
import Recipes from "@/components/multitudes/Recipes";
import Rental from "@/components/multitudes/Rental";
import Store from "@/components/multitudes/Store";
import Restaurants from "@/components/multitudes/Restaurants";
import Websites from "@/components/multitudes/Websites";
import SiteMenu from "@/components/SiteMenu";
import { profile, type Multitude } from "@/data/profile";

const { multitudes } = profile;

// Each multitude gets its own layout. A new multitude without one here falls
// back to the simple Generic page below.
const layouts: Record<string, ComponentType<{ m: Multitude }>> = {
  store: Store,
  "painting-art": Art,
  fitness: Fitness,
  education: Education,
  clubbing: Clubbing,
  parties: Parties,
  restaurants: Restaurants,
  recipes: Recipes,
  rental: Rental,
  business: Business,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return multitudes.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/multitudes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = multitudes.find((x) => x.slug === slug);
  return m ? { title: `${m.title} — ${profile.name}`, description: m.intro } : {};
}

export default async function MultitudePage({ params }: PageProps<"/multitudes/[slug]">) {
  const { slug } = await params;
  const index = multitudes.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  const m = multitudes[index];
  const prev = multitudes[(index - 1 + multitudes.length) % multitudes.length];
  const next = multitudes[(index + 1) % multitudes.length];
  const Layout = layouts[m.slug] ?? Generic;

  return (
    <main className="u-detail" data-page={m.slug} style={{ "--c": m.color } as CSSProperties}>
      <div className="u-grain" aria-hidden />
      <div className="u-detail-glow" aria-hidden />

      <nav className="u-detail-top relative z-30">
        <SiteMenu />
        <span className="flex items-center gap-5">
          <Link href="/#top" className="whitespace-nowrap">
            ← <span className="hidden min-[400px]:inline">All </span>multitudes
          </Link>
          <span className="hidden sm:inline">
            {m.n} / {String(multitudes.length).padStart(2, "0")}
          </span>
        </span>
      </nav>

      <article className="u-detail-main">
        <Layout m={m} />
        <Websites m={m} />
      </article>

      <nav className="u-detail-pager" aria-label="Other multitudes">
        <Link href={`/multitudes/${prev.slug}`}>
          <small>← Previous</small>
          {prev.title}
        </Link>
        <Link href={`/multitudes/${next.slug}`}>
          <small>Next →</small>
          {next.title}
        </Link>
      </nav>
    </main>
  );
}

function Generic({ m }: { m: Multitude }) {
  return (
    <div>
      <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] italic leading-[0.95]">{m.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-soft">{m.intro}</p>
      <ul className="u-detail-points">
        {m.points.map((p, i) => (
          <li key={p}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
