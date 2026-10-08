import { profile, whatsappLink } from "@/data/profile";

const askReview = whatsappLink("Hi Pankaj! Here's my review of the website you built for me:\n\nName: \nBusiness / website: \nRating (1–5): \nReview: ");

// Between About and Contact: what clients say (profile.reviews). Until
// there are some, an invitation for clients to send theirs.
export default function ReviewsSection() {
  const { reviews, projects } = profile;
  return (
    <section id="reviews" className="h-sec" aria-labelledby="reviews-title">
      <div className="h-wrap">
        <p className="h-kicker">Reviews</p>
        <h2 id="reviews-title" className="h-title">
          Kind words,
          <br />
          <em>from real clients.</em>
        </h2>

        {reviews.length === 0 ? (
          <div className="h-review-empty">
            <p className="font-display text-2xl italic leading-snug sm:text-3xl">The first reviews are on their way.</p>
            <p className="h-text !mt-3">Did I build your website? I&apos;d love to put your words here.</p>
            <div className="h-cta !justify-start">
              <a href={askReview} target="_blank" rel="noopener noreferrer" className="u-cta-primary">
                Leave a review on WhatsApp <span aria-hidden>→</span>
              </a>
              <a href={`mailto:${profile.contact.email}?subject=${encodeURIComponent("My review")}`} className="u-cta-ghost">
                By email
              </a>
            </div>
          </div>
        ) : (
          <ul className="h-reviews">
            {reviews.map((r) => {
              const site = projects.find((p) => p.title === r.site);
              return (
                <li key={r.name + r.text.slice(0, 20)}>
                  {r.rating && (
                    <p className="h-stars" aria-label={`${r.rating} out of 5`}>
                      {"★".repeat(r.rating)}
                      <span>{"★".repeat(5 - r.rating)}</span>
                    </p>
                  )}
                  <blockquote>“{r.text}”</blockquote>
                  <p className="h-review-by">
                    <strong>{r.name}</strong> · {r.role}
                    {site && (
                      <>
                        {" · "}
                        <a href={site.href} target="_blank" rel="noopener noreferrer">
                          {site.title} ↗
                        </a>
                      </>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
