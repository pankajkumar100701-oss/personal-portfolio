"use client";

import Link from "next/link";

// If something on a page breaks in the browser, show a way back instead of
// Next's bare "Application error" screen.
export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-4xl">Something went wrong.</p>
      <p className="text-muted">Please try again, or head back home.</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <button type="button" className="x-share" onClick={() => retry()}>
          Try again
        </button>
        <Link href="/" className="m-cta m-cta-sm">
          Home <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
