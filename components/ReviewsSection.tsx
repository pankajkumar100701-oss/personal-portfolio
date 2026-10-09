import { profile } from "@/data/profile";

// Between About and Contact: what clients say (profile.reviews, plain text).
// Until there are some, a short "coming soon" note.
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
            <p className="h-text !mt-3">What my clients say about their websites will appear here soon.</p>
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
