import Image from "next/image";
import { profile } from "@/data/profile";

// Below the multitudes: who I am, with my photo. Contact follows right after.
export default function AboutSection() {
  return (
    <section id="about" className="h-sec" aria-labelledby="about-title">
      <div className="h-wrap h-about">
        <div>
          <div className="h-about-head">
            <Image
              src="/about/pankaj.webp"
              alt={`${profile.hero.first}, smiling, arms crossed`}
              width={440}
              height={440}
              unoptimized
              className="h-photo"
            />
            <div>
              <p className="h-kicker">About</p>
              <h2 id="about-title" className="h-title">
                Hi, I&apos;m {profile.hero.first}.
                <br />
                <em>I build websites.</em>
              </h2>
            </div>
          </div>
          {profile.about.map((p) => (
            <p key={p} className="h-text">
              {p}
            </p>
          ))}
        </div>
        <CodeWindow />
      </div>
    </section>
  );
}

// A little editor window, Mac style: three dots, a file tab, and me as code.
function CodeWindow() {
  const k = (t: string) => <span className="c-key">{t}</span>;
  const s = (t: string) => <span className="c-str">&quot;{t}&quot;</span>;
  return (
    <figure className="h-code" aria-label="About me, written as code">
      <figcaption className="h-code-bar">
        <i aria-hidden />
        <i aria-hidden />
        <i aria-hidden />
        <span>pankaj.ts</span>
      </figcaption>
      <pre>
        <code>
          <span className="c-kw">const</span> pankaj = {"{"}
          {"\n  "}
          {k("role")}: {s("UI Designer / Website Developer")},{"\n  "}
          {k("from")}: {s("India")},{"\n  "}
          {k("builds")}: [{s("stores")}, {s("portfolios")}, {s("landing pages")}],{"\n  "}
          {k("stack")}: [{s("Next.js")}, {s("React")}, {s("TypeScript")}],{"\n  "}
          {k("available")}: <span className="c-kw">true</span>,{"\n"}
          {"};"}
          {"\n\n"}
          pankaj.<span className="c-fn">build</span>(yourIdea);{" "}
          <span className="c-cmt">{"// → live on the web"}</span>
          <span className="h-code-caret" aria-hidden />
        </code>
      </pre>
    </figure>
  );
}
