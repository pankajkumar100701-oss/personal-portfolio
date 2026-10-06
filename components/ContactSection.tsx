import { profile } from "@/data/profile";

// Below About: WhatsApp and email, reached from About's "Get in touch" and the menu.
export default function ContactSection() {
  const { contact } = profile;
  return (
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
  );
}
