import { twitter } from "@/data/multitudes";
import { profile, type Multitude } from "@/data/profile";
import { Cta, Hero } from "./ui";

// Twitter / X: a profile card and a timeline of posts.
export default function Twitter({ m }: { m: Multitude }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Hero m={m} />
        <div className="m-card m-rise mt-10 rounded-2xl p-6" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-4">
            <span className="m-avatar">{profile.name[0]}</span>
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="text-sm text-muted">{twitter.handle}</p>
            </div>
          </div>
          <p className="mt-4 text-soft">{twitter.bio}</p>
          <div className="mt-6"><Cta m={m} /></div>
        </div>
      </div>
      <ul className="space-y-4">
        {twitter.posts.map((p, i) => (
          <li key={i} className="m-card m-lift m-rise rounded-2xl p-6" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
            {p.pinned && <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink">📌 Pinned</p>}
            <div className="flex gap-3">
              <span className="m-avatar m-avatar-sm">{profile.name[0]}</span>
              <div className="min-w-0">
                <p className="text-sm"><b>{profile.name}</b> <span className="text-muted">{twitter.handle}</span></p>
                <p className="mt-2 text-lg leading-relaxed">{p.text}</p>
                <p className="mt-4 flex gap-6 text-sm text-muted">
                  <span>💬 {p.replies}</span>
                  <span>♥ {p.likes}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
