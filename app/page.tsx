import Cosmos from "@/components/Cosmos";
import MultitudesHero from "@/components/MultitudesHero";
import ScrollReveal from "@/components/ScrollReveal";
import SiteMenu from "@/components/SiteMenu";
import TiltCard from "@/components/TiltCard";
import { profile } from "@/data/profile";

const nav = [
  { href: "#about", label: "About" },
];

export default function Home() {
  return (
    <>
      <Cosmos />
      <ScrollReveal />

      <header className="site-header fixed inset-x-0 top-0 z-20">
        <nav className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8 lg:px-12">
          <SiteMenu />
          <ul className="glass hidden rounded-full p-1 text-sm sm:flex sm:gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="block rounded-full px-4 py-1.5 text-fg/75 transition hover:bg-fg/10 hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="relative">
        <MultitudesHero />

        {/* About */}
        <section id="about" className="section">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
            <TiltCard className="glass rounded-3xl p-6 sm:p-10" data-reveal>
              <SectionLabel n="01" text="About me" />
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                Hi, I&apos;m <span className="gradient-text">Pankaj.</span>
              </h2>
              <p className="mt-2 text-lg text-fg/80">{profile.role}</p>
              {profile.about.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-fg/70">{p}</p>
              ))}
              <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-fg/10 pt-6">
                {profile.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="gradient-text text-2xl font-bold sm:text-4xl">{s.value}</dd>
                    <dd className="mt-1 text-xs text-fg/60">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </TiltCard>

            <div className="space-y-5">
              <CodeCard />
              <div className="glass rounded-2xl p-6" data-reveal style={{ "--d": "0.15s" } as React.CSSProperties}>
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-fg/60">
                  <i className="live-dot" aria-hidden /> Now
                </p>
                <ul className="mt-4 space-y-3">
                  {profile.now.map((n) => (
                    <li key={n.label} className="flex flex-col gap-1 text-sm sm:flex-row sm:gap-4">
                      <span className="w-20 shrink-0 font-mono text-xs uppercase tracking-widest text-fg/50">{n.label}</span>
                      <span className="text-fg/85">{n.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 pb-8 text-center text-xs text-fg/50">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
          {/* Light theme's wallpaper photo is CC BY 2.0, which requires this credit. */}
          <span className="hidden [[data-theme=light]_&]:inline">
            {" · "}Paper photo by{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Free_crumpled_paper_texture_for_layers_(2978651767).jpg" target="_blank" rel="noopener noreferrer" className="underline decoration-fg/30 underline-offset-2 hover:text-fg">
              Pink Sherbet Photography
            </a>{" "}
            (CC BY 2.0)
          </span>
        </p>
      </footer>
    </>
  );
}

// A little editor window that "declares" me — the unique bit beside About.
function CodeCard() {
  const { name, location, stats, skills } = profile;
  const stack = skills[0].items.slice(0, 3);
  const rows: [string, React.ReactNode][] = [
    ["role", <S key="r">&quot;Web Developer&quot;</S>],
    ["experience", <S key="e">&quot;{stats[1].value.replace("yr", "year")}&quot;</S>],
    ["projects", <S key="p">&quot;{stats[0].value}&quot;</S>],
    [
      "stack",
      <span key="s">
        [{stack.map((s, i) => (
          <span key={s}>
            <S>&quot;{s}&quot;</S>
            {i < stack.length - 1 && ", "}
          </span>
        ))}]
      </span>,
    ],
    ["location", <S key="l">&quot;{location}&quot;</S>],
    ["available", <span key="a" className="code-bool">true</span>],
  ];
  return (
    <TiltCard className="code-card rounded-2xl" data-reveal>
      <div className="code-bar">
        <i /> <i /> <i />
        <span>{name.split(" ")[0].toLowerCase()}.ts</span>
      </div>
      <pre className="code-body">
        <code>
          <span className="code-kw">const</span> <span className="code-var">pankaj</span> = {"{"}
          {"\n"}
          {rows.map(([k, v]) => (
            <span key={k}>
              {"  "}
              <span className="code-key">{k}</span>: {v},{"\n"}
            </span>
          ))}
          {"  "}
          <span className="code-comment">{"// chai-powered ☕"}</span>
          {"\n"}
          {"};"}
          <span className="code-cursor" aria-hidden />
        </code>
      </pre>
    </TiltCard>
  );
}

function S({ children }: { children: React.ReactNode }) {
  return <span className="code-str">{children}</span>;
}

function SectionLabel({ n, text }: { n: string; text: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg/60">
      <span className="text-accent-2">{n}</span> — {text}
    </p>
  );
}
