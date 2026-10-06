import { profile } from "@/data/profile";

// Below the multitudes: who I am, then a big "let's talk" to close the page.
export default function HomeSections() {
  const { contact } = profile;
  return (
    <>
      <section id="about" className="h-sec" aria-labelledby="about-title">
        <div className="h-wrap h-about">
          <div>
            <p className="h-kicker">About</p>
            <h2 id="about-title" className="h-title">
              Hi, I&apos;m {profile.hero.first}.
              <br />
              <em>I build websites.</em>
            </h2>
            {profile.about.map((p) => (
              <p key={p} className="h-text">
                {p}
              </p>
            ))}
            <ul className="h-stats">
              {profile.stats.map((s) => (
                <li key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="h-kicker">What I build</p>
            <ul className="h-services">
              {profile.services.map((s, i) => (
                <li key={s.title}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="h-sec h-contact" aria-labelledby="contact-title">
        <div className="h-wrap">
          <p className="h-kicker">Contact</p>
          <h2 id="contact-title" className="h-title h-title-big">
            Want a website of your own?
            <br />
            <em>Let&apos;s talk.</em>
          </h2>
          <p className="h-text">
            Tell me about your business or idea — even a rough one is fine. I&apos;ll reply with a plan and a price, no strings attached.
          </p>
          <div className="h-cta">
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="u-cta-primary">
              Chat on WhatsApp <span aria-hidden>→</span>
            </a>
            <a href={`mailto:${contact.email}`} className="u-cta-ghost">
              {contact.email}
            </a>
          </div>
          {contact.links.length > 0 && (
            <ul className="h-links">
              {contact.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
