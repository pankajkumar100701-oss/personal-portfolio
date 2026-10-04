import Cosmos from "@/components/Cosmos";
import MultitudesHero from "@/components/MultitudesHero";
import ScrollReveal from "@/components/ScrollReveal";
import SiteMenu from "@/components/SiteMenu";
import TiltCard from "@/components/TiltCard";
import { profile } from "@/data/profile";

const nav = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <Cosmos />
      <ScrollReveal />

      <header className="fixed inset-x-0 top-0 z-20">
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
          <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
            <TiltCard className="glass rounded-3xl p-8 sm:p-10" data-reveal>
              <SectionLabel n="01" text="About me" />
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                Hi, I&apos;m <span className="gradient-text">Pankaj.</span>
              </h2>
              <p className="mt-2 text-lg text-fg/80">{profile.role}</p>
              {profile.about.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-fg/70">{p}</p>
              ))}
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-fg/10 pt-6">
                {profile.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="gradient-text text-3xl font-bold sm:text-4xl">{s.value}</dd>
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
                    <li key={n.label} className="flex gap-4 text-sm">
                      <span className="w-20 shrink-0 font-mono text-xs uppercase tracking-widest text-fg/50">{n.label}</span>
                      <span className="text-fg/85">{n.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section">
          <div data-reveal>
            <SectionLabel n="02" text="Skills" />
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">My toolkit</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {profile.skills.map((g, i) => (
              <TiltCard key={g.group} className="glass rounded-2xl p-6" data-reveal style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                <h3 className="font-mono text-sm uppercase tracking-widest text-accent">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <div data-reveal>
            <SectionLabel n="03" text="Projects" />
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Things I&apos;ve built</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {profile.projects.map((p, i) => (
              <TiltCard key={p.title} className="glass group rounded-2xl p-6" data-reveal style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                <a href={p.href} className="flex h-full flex-col" style={{ ["--accent" as string]: p.color }}>
                  <div className="project-orb mb-5 h-12 w-12 rounded-xl" />
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg/70">{p.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="chip text-xs">{t}</li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-block pt-5 text-sm text-fg/85 transition group-hover:translate-x-1">View project →</span>
                </a>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Contact — the email and links come from data/profile.ts */}
        <section id="contact" className="section items-center text-center">
          <div className="glass mx-auto w-full max-w-3xl rounded-3xl p-8 sm:p-14" data-reveal>
            <SectionLabel n="04" text="Contact" />
            <h2 className="mt-3 text-4xl font-bold sm:text-6xl">
              Let&apos;s build something <span className="gradient-text">out of this world.</span>
            </h2>
            <p className="mt-5 text-fg/70">Have a project in mind or just want to say hi? My inbox is always open.</p>
            <a href={`mailto:${profile.contact.email}`} className="btn-primary mt-8 inline-block">{profile.contact.email}</a>
            <ul className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              {profile.contact.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="chip inline-block transition hover:text-fg">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="absolute bottom-6 left-0 right-0 text-xs text-fg/50">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
        </section>
      </main>
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
